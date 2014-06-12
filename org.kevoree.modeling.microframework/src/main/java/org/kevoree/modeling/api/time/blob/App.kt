package org.kevoree.modeling.api.time.blob

import org.kevoree.modeling.api.time.TimePoint
import java.util.TreeSet
import java.util.Random

/**
 * Created by duke on 6/11/14.
 */


fun main(args: Array<String>) {
    println("Hello")

    val btree = RBTree()

    btree.insert(TimePoint.create("1"), "");
    btree.insert(TimePoint.create("2"), "");
    btree.insert(TimePoint.create("3"), "");
    btree.insert(TimePoint.create("4"), "X");
    btree.insert(TimePoint.create("5"), "");


    println(btree.serialize())

    println(btree.relativeMax(TimePoint.create("2"),"X")!!.key)
    println(btree.relativeMax(TimePoint.create("3"),"X")!!.key)
    println(btree.relativeMax(TimePoint.create("4"),"X"))
    println(btree.relativeMax(TimePoint.create("5"),"X")!!.key)



    /*
    println(btree.lower(TimePoint.create("3"))!!.key)
    println(btree.lower(TimePoint.create("10"))!!.key)

    println(">" + btree.upper(TimePoint.create("0"))!!.key.toString())
    println(">" + btree.upper(TimePoint.create("1"))!!.key.toString())
    println(">" + btree.upper(TimePoint.create("2"))!!.key.toString())
    println(">" + btree.upper(TimePoint.create("3"))!!.key.toString())
    println(">" + btree.upper(TimePoint.create("4"))!!.key.toString())
    println(">" + btree.upper(TimePoint.create("5")))

    println(btree.lowerOrEqual(TimePoint.create("3"))!!.key)
    println(btree.lowerOrEqual(TimePoint.create("5"))!!.key)

    println(btree.serialize())


    val btree2 = RBTree()
    val oracle = TreeSet<TimePoint>()

    for (i in 0...1000) {
        val rand = Random()
        val newVal = rand.nextInt()

        btree.insert(TimePoint.create(newVal.toString()), "")
        oracle.add(TimePoint.create(newVal.toString()))


        val toCheck = TimePoint.create(rand.nextInt().toString())

        val lower = btree.lower(toCheck)
        val upper = btree.upper(toCheck)

        val lower2 = oracle.lower(toCheck)
        val upper2 = oracle.ceiling(toCheck)

        assert(lower.equals(lower2))
        assert(upper.equals(upper2))


    } */

}