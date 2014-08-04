package org.kevoree.modeling.api.time.blob

import java.util.TreeSet

/**
 * Created by duke on 6/11/14.
 */


fun main(args: Array<String>) {
    val btree = RBTree()

    /*
    btree.insert(0, STATE.EXISTS);
    btree.insert(1, STATE.EXISTS);
    btree.insert(2, STATE.DELETED);
    btree.insert(3, STATE.EXISTS);
    btree.insert(4, STATE.EXISTS);
    btree.insert(5, STATE.EXISTS);
*/

    for(i in 0L..5L){
        btree.insert(i, STATE.EXISTS);
    }

    //println("size:"+btree.size())
    //println(btree.upper(1)?.key)

    /*
    btree.insert(TimePoint.create("3"), "");
    btree.insert(TimePoint.create("4"), "X");
    btree.insert(TimePoint.create("5"), "");
    btree.insert(TimePoint.create("6"), "");
      */

    var saved = btree.serialize()
    println(saved)


    val btree2 = RBTree()
    btree2.unserialize(saved)
    var saved2 = btree2.serialize()
    println(saved2)

    //println(btree.relativeMax(TimePoint.create("3"),"X"))
    /*

     */
    /*
    println(btree.upperUntil(0,STATE.DELETED)?.key)
    println(btree.upperUntil(1,STATE.DELETED)?.key)
    println(btree.upperUntil(2,STATE.DELETED)?.key)
    println(btree.upperUntil(3,STATE.DELETED)?.key)
    println(btree.upperUntil(4,STATE.DELETED)?.key)
    */

    println(">"+saved2.length)
    println("computed:"+btree.size()*7+btree.last()?.key.toString().size)
    println("#"+saved2.toByteArray("UTF-8").size)


    /*
    var bb = ByteBuffer.allocate(saved2.length*2)
    for(c in saved2){
        bb.putChar(c)
    }
    println("$"+bb.position())
     */



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