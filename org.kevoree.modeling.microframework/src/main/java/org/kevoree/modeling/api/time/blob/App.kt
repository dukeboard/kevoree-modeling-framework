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


    btree.insert(TimePoint.create("0"), "");
    btree.insert(TimePoint.create("1"), "");
    btree.insert(TimePoint.create("2"), "X");
    btree.insert(TimePoint.create("3"), "");
    btree.insert(TimePoint.create("4"), "");

    /*
    btree.insert(TimePoint.create("3"), "");
    btree.insert(TimePoint.create("4"), "X");
    btree.insert(TimePoint.create("5"), "");
    btree.insert(TimePoint.create("6"), "");
      */

    println(btree.serialize())


    //println(btree.relativeMax(TimePoint.create("3"),"X"))
    /*

     */
    println(btree.upperUntil(TimePoint.create("0"),"X")?.key)
    println(btree.upperUntil(TimePoint.create("1"),"X")?.key)
    println(btree.upperUntil(TimePoint.create("2"),"X")?.key)
    println(btree.upperUntil(TimePoint.create("3"),"X")?.key)
    println(btree.upperUntil(TimePoint.create("4"),"X")?.key)





    /*
    println(btree.relativeMax(TimePoint.create("2"),"X")!!.key)
    println(btree.relativeMax(TimePoint.create("3"),"X")!!.key)
    println(btree.relativeMax(TimePoint.create("4"),"X"))
    println(btree.relativeMax(TimePoint.create("5"),"X")!!.key)


     */
    /*
    println(btree.upperUntil(TimePoint.create("6"),"X"))
    println(btree.upperUntil(TimePoint.create("5"),"X")!!.key)
    */
    //println(btree.upperUntil(TimePoint.create("4"),"X"))
    //println(btree.upper(TimePoint.create("4"))!!.key)

    /*
    println(btree.upperUntil(TimePoint.create("3"),"X"))
    println(btree.upperUntil(TimePoint.create("2"),"X")!!.key)
    println(btree.upperUntil(TimePoint.create("1"),"X")!!.key)
    println(btree.upperUntil(TimePoint.create("0"),"X"))


    println("Lower")

    println(btree.lowerUntil(TimePoint.create("6"),"X")!!.key)
    println(btree.lowerUntil(TimePoint.create("5"),"X"))
    println(btree.lowerUntil(TimePoint.create("4"),"X"))
    println(btree.lowerUntil(TimePoint.create("3"),"X")!!.key)
    println(btree.lowerUntil(TimePoint.create("2"),"X")!!.key)
    println(btree.lowerUntil(TimePoint.create("1"),"X"))
    println(btree.lowerUntil(TimePoint.create("0"),"X"))
     */

    /*
println(btree.lowerUntil(TimePoint.create("4"),"X"))
println(btree.lowerUntil(TimePoint.create("3"),"X"))
println(btree.lowerUntil(TimePoint.create("2"),"X")!!.key)
println(btree.lowerUntil(TimePoint.create("1"),"X")!!.key)
*/

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

     */

    /*
    val btree2 = RBTree()
    val oracle = TreeSet<TimePoint>()

    for (i in 0...10000) {
        val rand = Random()
        val newVal = rand.nextInt(10000)

        btree2.insert(TimePoint.create(newVal.toString()), "")
        oracle.add(TimePoint.create(newVal.toString()))


        val toCheck = TimePoint.create(rand.nextInt(10000).toString())

        val lower = btree2.lower(toCheck)
        val upper = btree2.upper(toCheck)

        val lowerBis = btree2.lowerUntil(toCheck,"X")
        val upperBis = btree2.upperUntil(toCheck,"X")

        val lower2 = oracle.lower(toCheck)
        val upper2 = oracle.ceiling(toCheck)

        assert(lower.equals(lower2))
        assert(lower.equals(lowerBis))
        assert(upper.equals(upper2))
        assert(upper.equals(upperBis))

    }  */

}