/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * 	Fouquet Francois
 * 	Nain Gregory
 */
package org.kevoree.modeling.emf.sample.opposite.test

import org.junit.Test
import kmf.test.TestFactory

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 28/11/12
* (c) 2012 University of Luxembourg – Interdisciplinary Centre for Security Reliability and Trust (SnT)
* All rights reserved
*/

class OppositeTest {

  @Test
  def optionalSingleA_optionalSingleB_Test() {
    //val container = TestFactory.createContainer
    val b = TestFactory.createB
    val a = TestFactory.createA

    //Set a in B
    b.setOptionalSingleA_optionalSingleB(Some(a))
    assert(a.getOptionalSingleA_optionalSingleB.isDefined && a.getOptionalSingleA_optionalSingleB.get == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)

    b.setOptionalSingleA_optionalSingleB(Some(a))
    assert(a.getOptionalSingleA_optionalSingleB.isDefined && a.getOptionalSingleA_optionalSingleB.get == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)


    //Remove A from B
    b.setOptionalSingleA_optionalSingleB(None)
    assert(a.getOptionalSingleA_optionalSingleB == None)
    assert(a.eContainer == null, "eContainer:" + a.eContainer.toString)

    //Set B in A
    a.setOptionalSingleA_optionalSingleB(Some(b))
    assert(b.getOptionalSingleA_optionalSingleB.isDefined && b.getOptionalSingleA_optionalSingleB.get == a)
    assert(a.eContainer == b)

    //Set B in A
    a.setOptionalSingleA_optionalSingleB(Some(b))
    assert(b.getOptionalSingleA_optionalSingleB.isDefined && b.getOptionalSingleA_optionalSingleB.get == a)
    assert(a.eContainer == b)

    //Remove B from A
    a.setOptionalSingleA_optionalSingleB(None)
    assert(b.getOptionalSingleA_optionalSingleB == None)
    assert(a.eContainer == null)

  }


  @Test
  def mandatorySingleA_mandatorySingleB_Test() {
    //val container = TestFactory.createContainer
    val b = TestFactory.createB
    val a = TestFactory.createA

    //Set a in B
    b.setMandatorySingleA_mandatorySingleB(a)
    assert(a.getMandatorySingleA_mandatorySingleB == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)

    b.setMandatorySingleA_mandatorySingleB(a)
    assert(a.getMandatorySingleA_mandatorySingleB == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)


    //Remove A from B
    b.setMandatorySingleA_mandatorySingleB(null)
    assert(a.getMandatorySingleA_mandatorySingleB == null)
    assert(a.eContainer == null, "eContainer:" + a.eContainer.toString)

    b.setMandatorySingleA_mandatorySingleB(null)
    assert(a.getMandatorySingleA_mandatorySingleB == null)
    assert(a.eContainer == null, "eContainer:" + a.eContainer.toString)

    //Set B in A
    a.setMandatorySingleA_mandatorySingleB(b)
    assert(b.getMandatorySingleA_mandatorySingleB == a)
    assert(a.eContainer == b)

    //Set B in A
    a.setMandatorySingleA_mandatorySingleB(b)
    assert(b.getMandatorySingleA_mandatorySingleB == a)
    assert(a.eContainer == b)

    //Remove B from A
    a.setMandatorySingleA_mandatorySingleB(null)
    assert(b.getMandatorySingleA_mandatorySingleB == null)
    assert(a.eContainer == null)

  }




  @Test
  def optionalSingleA_MandatorySingleB_Test() {
    //val container = TestFactory.createContainer
    val b = TestFactory.createB
    val a = TestFactory.createA

    //Set a in B
    b.setOptionalSingleA_MandatorySingleB(a)
    assert(a.getOptionalSingleA_MandatorySingleB.isDefined && a.getOptionalSingleA_MandatorySingleB.get == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)

    //Set a in B
    b.setOptionalSingleA_MandatorySingleB(a)
    assert(a.getOptionalSingleA_MandatorySingleB.isDefined && a.getOptionalSingleA_MandatorySingleB.get == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)


    //Remove A from B
    b.setOptionalSingleA_MandatorySingleB(null)
    assert(a.getOptionalSingleA_MandatorySingleB == None)
    assert(a.eContainer == null, "eContainer:" + a.eContainer.toString)

    //Remove A from B
    b.setOptionalSingleA_MandatorySingleB(_)
    assert(a.getOptionalSingleA_MandatorySingleB == None)
    assert(a.eContainer == null, "eContainer:" + a.eContainer.toString)

    //Set B in A
    a.setOptionalSingleA_MandatorySingleB(Some(b))
    assert(b.getOptionalSingleA_MandatorySingleB == a)
    assert(a.eContainer == b)

    //Set B in A
    a.setOptionalSingleA_MandatorySingleB(Some(b))
    assert(b.getOptionalSingleA_MandatorySingleB == a)
    assert(a.eContainer == b)

    //Remove B from A
    a.setOptionalSingleA_MandatorySingleB(None)
    assert(b.getOptionalSingleA_MandatorySingleB == null, b.getOptionalSingleA_MandatorySingleB.getClass)
    assert(a.eContainer == null)

  }


  @Test
  def optionalSingleA_StarListB_Test() {
    //val container = TestFactory.createContainer
    val b = TestFactory.createB
    val a = TestFactory.createA
    val a2 = TestFactory.createA

    //add a in B
    b.addOptionalSingleA_StarListB(a)
    assert(b.getOptionalSingleA_StarListB.size == 1)
    assert(a.getOptionalSingleA_StarListB.isDefined && a.getOptionalSingleA_StarListB.get == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)

    //add a2 in B
    b.addOptionalSingleA_StarListB(a2)
    assert(b.getOptionalSingleA_StarListB.size == 2)
    assert(a2.getOptionalSingleA_StarListB.isDefined && a2.getOptionalSingleA_StarListB.get == b)
    assert(a2.eContainer == b, "eContainer:" + a2.eContainer.getClass)
    b.addOptionalSingleA_StarListB(a2)
    assert(b.getOptionalSingleA_StarListB.size == 2)

    //Remove A from B
    b.removeOptionalSingleA_StarListB(a)
    assert(b.getOptionalSingleA_StarListB.size == 1)
    assert(a.getOptionalSingleA_StarListB == None)
    assert(a.eContainer == null, "eContainer:" + a.eContainer.toString)

    b.removeOptionalSingleA_StarListB(a)
    assert(b.getOptionalSingleA_StarListB.size == 1)

    b.removeOptionalSingleA_StarListB(a2)
    assert(b.getOptionalSingleA_StarListB.size == 0)
    assert(a2.getOptionalSingleA_StarListB == None)
    assert(a2.eContainer == null, "eContainer:" + a2.eContainer.toString)

    val aList = List(a,a2)
    b.setOptionalSingleA_StarListB(aList)
    assert(b.getOptionalSingleA_StarListB.size == 2)
    assert(a.getOptionalSingleA_StarListB.isDefined && a.getOptionalSingleA_StarListB.get == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)
    assert(a2.getOptionalSingleA_StarListB.isDefined && a2.getOptionalSingleA_StarListB.get == b)
    assert(a2.eContainer == b, "eContainer:" + a2.eContainer.getClass)

    var e : Exception = null
    try{
      b.setOptionalSingleA_StarListB(null)
    } catch {
      case exp:Exception => e = exp
    }
    assert(e != null && e.isInstanceOf[IllegalArgumentException])

    b.removeAllOptionalSingleA_StarListB()
    assert(b.getOptionalSingleA_StarListB.size == 0)
    assert(a.getOptionalSingleA_StarListB == None)
    assert(a.eContainer == null, "eContainer:" + a.eContainer.toString)
    assert(a2.getOptionalSingleA_StarListB == None)
    assert(a2.eContainer == null, "eContainer:" + a2.eContainer.toString)

    b.addAllOptionalSingleA_StarListB(aList)
    assert(b.getOptionalSingleA_StarListB.size == 2)
    assert(a.getOptionalSingleA_StarListB.isDefined && a.getOptionalSingleA_StarListB.get == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)
    assert(a2.getOptionalSingleA_StarListB.isDefined && a2.getOptionalSingleA_StarListB.get == b)
    assert(a2.eContainer == b, "eContainer:" + a2.eContainer.getClass)

    b.removeAllOptionalSingleA_StarListB()
    assert(b.getOptionalSingleA_StarListB.size == 0)
    assert(a.getOptionalSingleA_StarListB == None)
    assert(a.eContainer == null, "eContainer:" + a.eContainer.toString)
    assert(a2.getOptionalSingleA_StarListB == None)
    assert(a2.eContainer == null, "eContainer:" + a2.eContainer.toString)


    a.setOptionalSingleA_StarListB(Some(b))
    assert(b.getOptionalSingleA_StarListB.size == 1)
    assert(a.getOptionalSingleA_StarListB.isDefined && a.getOptionalSingleA_StarListB.get == b)
    assert(a.eContainer == b)

    //Remove B from A
    a.setOptionalSingleA_StarListB(None)
    assert(b.getOptionalSingleA_StarListB.size == 0)
    assert(a.getOptionalSingleA_StarListB == None)
    assert(a.eContainer == null)

  }



  @Test
  def mandatorySingleA_StarListB_Test() {
    //val container = TestFactory.createContainer
    val b = TestFactory.createB
    val a = TestFactory.createA
    val a2 = TestFactory.createA

    //add a in B
    b.addMandatorySingleA_StarListB(a)
    assert(b.getMandatorySingleA_StarListB.size == 1)
    assert(a.getMandatorySingleA_StartListB == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)

    //add a2 in B
    b.addMandatorySingleA_StarListB(a2)
    assert(b.getMandatorySingleA_StarListB.size == 2)
    assert(a2.getMandatorySingleA_StartListB == b)
    assert(a2.eContainer == b, "eContainer:" + a2.eContainer.getClass)
    b.addMandatorySingleA_StarListB(a2)
    assert(b.getMandatorySingleA_StarListB.size == 2)

    //Remove A from B
    b.removeMandatorySingleA_StarListB(a)
    assert(b.getMandatorySingleA_StarListB.size == 1)
    assert(a.getMandatorySingleA_StartListB == null)
    assert(a.eContainer == null, "eContainer:" + a.eContainer.toString)

    b.removeMandatorySingleA_StarListB(a)
    assert(b.getMandatorySingleA_StarListB.size == 1)

    b.removeMandatorySingleA_StarListB(a2)
    assert(b.getMandatorySingleA_StarListB.size == 0)
    assert(a2.getMandatorySingleA_StartListB == null)
    assert(a2.eContainer == null, "eContainer:" + a2.eContainer.toString)

    val aList = List(a,a2)
    b.setMandatorySingleA_StarListB(aList)
    assert(b.getMandatorySingleA_StarListB.size == 2)
    assert(a.getMandatorySingleA_StartListB == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)
    assert(a2.getMandatorySingleA_StartListB == b)
    assert(a2.eContainer == b, "eContainer:" + a2.eContainer.getClass)

    var e : Exception = null
    try{
      b.setMandatorySingleA_StarListB(null)
    } catch {
      case exp:Exception => e = exp
    }
    assert(e != null && e.isInstanceOf[IllegalArgumentException])

    b.removeAllMandatorySingleA_StarListB()
    assert(b.getMandatorySingleA_StarListB.size == 0)
    assert(a.getMandatorySingleA_StartListB == null)
    assert(a.eContainer == null, "eContainer:" + a.eContainer.toString)
    assert(a2.getMandatorySingleA_StartListB == null)
    assert(a2.eContainer == null, "eContainer:" + a2.eContainer.toString)

    b.addAllMandatorySingleA_StarListB(aList)
    assert(b.getMandatorySingleA_StarListB.size == 2)
    assert(a.getMandatorySingleA_StartListB == b)
    assert(a.eContainer == b, "eContainer:" + a.eContainer.getClass)
    assert(a2.getMandatorySingleA_StartListB == b)
    assert(a2.eContainer == b, "eContainer:" + a2.eContainer.getClass)

    b.removeAllMandatorySingleA_StarListB()
    assert(b.getMandatorySingleA_StarListB.size == 0)
    assert(a.getMandatorySingleA_StartListB == null)
    assert(a.eContainer == null, "eContainer:" + a.eContainer.toString)
    assert(a2.getMandatorySingleA_StartListB == null)
    assert(a2.eContainer == null, "eContainer:" + a2.eContainer.toString)


    a.setMandatorySingleA_StartListB(b)
    assert(b.getMandatorySingleA_StarListB.size == 1)
    assert(a.getMandatorySingleA_StartListB == b)
    assert(a.eContainer == b)

    //Remove B from A
    a.setMandatorySingleA_StartListB(null)
    assert(b.getMandatorySingleA_StarListB.size == 0)
    assert(a.getMandatorySingleA_StartListB == null)
    assert(a.eContainer == null)

  }

  @Test
  def starListA_StarListB_Test() {

    val b = TestFactory.createB
    val b2 = TestFactory.createB
    val a = TestFactory.createA
    val a2 = TestFactory.createA
    val listA = List(a,a2)
    val listB = List(b,b2)


    a.addStarListA_StarListB(b)
    assert(b.getStarListA_StarListB.size == 1)
    assert(a.getStarListA_StarListB.size == 1)
    assert(a.eContainer == b)

    a.addStarListA_StarListB(b2)
    assert(b2.getStarListA_StarListB.size == 1)
    assert(b.getStarListA_StarListB.size == 0)
    assert(a.getStarListA_StarListB.size == 1)
    assert(a.eContainer == b2)

    b.addStarListA_StarListB(a)
    assert(b.getStarListA_StarListB.size == 1)
    assert(b2.getStarListA_StarListB.size == 0)
    assert(a.getStarListA_StarListB.size == 1)
    assert(a.eContainer == b)

    b.addStarListA_StarListB(a2)
    assert(b.getStarListA_StarListB.size == 2)
    assert(b2.getStarListA_StarListB.size == 0)
    assert(a.getStarListA_StarListB.size == 1)
    assert(a2.getStarListA_StarListB.size == 1)
    assert(a.eContainer == b)
    assert(a2.eContainer == b)

    b2.addStarListA_StarListB(a2)
    assert(b.getStarListA_StarListB.size == 1)
    assert(b2.getStarListA_StarListB.size == 1)
    assert(a.getStarListA_StarListB.size == 1)
    assert(a2.getStarListA_StarListB.size == 1)
    assert(a.eContainer == b)
    assert(a2.eContainer == b2)

    b2.addStarListA_StarListB(a2)
    assert(b.getStarListA_StarListB.size == 1)
    assert(b2.getStarListA_StarListB.size == 1)
    assert(a.getStarListA_StarListB.size == 1)
    assert(a2.getStarListA_StarListB.size == 1)
    assert(a.eContainer == b)
    assert(a2.eContainer == b2)


    b.removeStarListA_StarListB(a)
    assert(b.getStarListA_StarListB.size == 0)
    assert(b2.getStarListA_StarListB.size == 1)
    assert(a.getStarListA_StarListB.size == 0)
    assert(a2.getStarListA_StarListB.size == 1)
    assert(a.eContainer == null)
    assert(a2.eContainer == b2)

    b.addAllStarListA_StarListB(listA)
    assert(b.getStarListA_StarListB.size == 2)
    assert(b2.getStarListA_StarListB.size == 0)
    assert(a.getStarListA_StarListB.size == 1)
    assert(a2.getStarListA_StarListB.size == 1)
    assert(a.eContainer == b)
    assert(a2.eContainer == b)

    b2.addAllStarListA_StarListB(listA)
    assert(b.getStarListA_StarListB.size == 0)
    assert(b2.getStarListA_StarListB.size == 2)
    assert(a.getStarListA_StarListB.size == 1)
    assert(a2.getStarListA_StarListB.size == 1)
    assert(a.eContainer == b2)
    assert(a2.eContainer == b2)

    b2.removeAllStarListA_StarListB()
    assert(b.getStarListA_StarListB.size == 0)
    assert(b2.getStarListA_StarListB.size == 0)
    assert(a.getStarListA_StarListB.size == 0)
    assert(a2.getStarListA_StarListB.size == 0)
    assert(a.eContainer == null)
    assert(a2.eContainer == null)

    a.addAllStarListA_StarListB(listB)
    assert(b.getStarListA_StarListB.size == 0)
    assert(b2.getStarListA_StarListB.size == 1)
    assert(a.getStarListA_StarListB.size == 1)
    assert(a.eContainer == b2)


    a2.addAllStarListA_StarListB(listB)
    assert(b.getStarListA_StarListB.size == 0)
    assert(b2.getStarListA_StarListB.size == 2)
    assert(a.getStarListA_StarListB.size == 1)
    assert(a2.getStarListA_StarListB.size == 1)
    assert(a.eContainer == b2)
    assert(a2.eContainer == b2)

  }


  @Test
  def A_optionalSingleRef() {

    val a = TestFactory.createA
    val b = TestFactory.createB
    val b2 = TestFactory.createB

    a.setOptionalSingleRef(Some(b))
    assert(a.getOptionalSingleRef.isDefined && a.getOptionalSingleRef.get == b)

    a.setOptionalSingleRef(Some(b))
    assert(a.getOptionalSingleRef.isDefined && a.getOptionalSingleRef.get == b)

    a.setOptionalSingleRef(Some(b2))
    assert(a.getOptionalSingleRef.isDefined && a.getOptionalSingleRef.get == b2)

    a.setOptionalSingleRef(None)
    assert(a.getOptionalSingleRef == None)

  }

  @Test
  def A_mendatorySingleRef() {
    val a = TestFactory.createA
    val b = TestFactory.createB
    val b2 = TestFactory.createB

    a.setMandatorySingleRef(b)
    assert(a.getMandatorySingleRef == b)

    a.setMandatorySingleRef(b)
    assert(a.getMandatorySingleRef == b)

    a.setMandatorySingleRef(b2)
    assert(a.getMandatorySingleRef == b2)

    a.setMandatorySingleRef(null)
    assert(a.getMandatorySingleRef == null)

    a.setMandatorySingleRef(null)
    assert(a.getMandatorySingleRef == null)
  }

  @Test
  def A_StarList() {
    val a = TestFactory.createA
    val b = TestFactory.createB
    val b2 = TestFactory.createB
    val listB = List(b,b2)

    a.addStarList(b)
    assert(a.getStarList.size == 1, "Size:" + a.getStarList.size)

    a.addStarList(b2)
    assert(a.getStarList.size == 2, "Size:" + a.getStarList.size)

    a.addStarList(b2)
    assert(a.getStarList.size == 2, "Size:" + a.getStarList.size)

    a.removeStarList(b)
    assert(a.getStarList.size == 1, "Size:" + a.getStarList.size)

    a.removeStarList(b2)
    assert(a.getStarList.size == 0, "Size:" + a.getStarList.size)

    a.removeStarList(b2)
    assert(a.getStarList.size == 0, "Size:" + a.getStarList.size)

    a.addAllStarList(listB)
    assert(a.getStarList.size == 2, "Size:" + a.getStarList.size)

    a.addAllStarList(listB)
    assert(a.getStarList.size == 2, "Size:" + a.getStarList.size)

    a.removeAllStarList()
    assert(a.getStarList.size == 0, "Size:" + a.getStarList.size)

    a.removeAllStarList()
    assert(a.getStarList.size == 0, "Size:" + a.getStarList.size)
  }


  @Test
  def B_optionalSingleRef() {
    val b = TestFactory.createB
    val a = TestFactory.createA
    val a2 = TestFactory.createA

    b.setOptionalSingleRef(Some(a))
    assert(a.eContainer == b)
    assert(b.getOptionalSingleRef.isDefined && b.getOptionalSingleRef.get == a)

    b.setOptionalSingleRef(Some(a))
    assert(a.eContainer == b)
    assert(b.getOptionalSingleRef.isDefined && b.getOptionalSingleRef.get == a)

    b.setOptionalSingleRef(Some(a2))
    assert(a.eContainer == null)
    assert(a2.eContainer == b)
    assert(b.getOptionalSingleRef.isDefined && b.getOptionalSingleRef.get == a2)

    b.setOptionalSingleRef(None)
    assert(a.eContainer == null)
    assert(a2.eContainer == null)
    assert(b.getOptionalSingleRef == None)
  }

  @Test
  def B_mendatorySingleRef() {
    val b = TestFactory.createB
    val a = TestFactory.createA
    val a2 = TestFactory.createA

    b.setMandatorySingleRef(a)
    assert(a.eContainer == b)
    assert(b.getMandatorySingleRef == a)

    b.setMandatorySingleRef(a)
    assert(a.eContainer == b)
    assert(b.getMandatorySingleRef == a)

    b.setMandatorySingleRef(a2)
    assert(a.eContainer == null)
    assert(a2.eContainer == b)
    assert(b.getMandatorySingleRef == a2)

    b.setMandatorySingleRef(null)
    assert(a2.eContainer == null)
    assert(b.getMandatorySingleRef == null)

    b.setMandatorySingleRef(null)
    assert(b.getMandatorySingleRef == null)
  }

  @Test
  def B_StarList() {
    val b = TestFactory.createB
    val a = TestFactory.createA
    val a2 = TestFactory.createA
    val listA = List(a,a2)

    b.addStarList(a)
    assert(a.eContainer == b)
    assert(b.getStarList.size == 1, "Size:" + a.getStarList.size)

    b.addStarList(a2)
    assert(a.eContainer == b)
    assert(a2.eContainer == b)
    assert(b.getStarList.size == 2, "Size:" + a.getStarList.size)

    b.addStarList(a2)
    assert(a.eContainer == b)
    assert(a2.eContainer == b)
    assert(b.getStarList.size == 2, "Size:" + a.getStarList.size)

    b.removeStarList(a)
    assert(a.eContainer == null)
    assert(a2.eContainer == b)
    assert(b.getStarList.size == 1, "Size:" + a.getStarList.size)

    b.removeStarList(a2)
    assert(a.eContainer == null)
    assert(a2.eContainer == null)
    assert(b.getStarList.size == 0, "Size:" + a.getStarList.size)

    b.removeStarList(a2)
    assert(b.getStarList.size == 0, "Size:" + a.getStarList.size)

    b.addAllStarList(listA)
    assert(a.eContainer == b)
    assert(a2.eContainer == b)
    assert(b.getStarList.size == 2, "Size:" + a.getStarList.size)

    b.addAllStarList(listA)
    assert(b.getStarList.size == 2, "Size:" + a.getStarList.size)

    b.removeAllStarList()
    assert(a.eContainer == null)
    assert(a2.eContainer == null)
    assert(b.getStarList.size == 0, "Size:" + a.getStarList.size)

    b.removeAllStarList()
    assert(b.getStarList.size == 0, "Size:" + a.getStarList.size)
  }

}
