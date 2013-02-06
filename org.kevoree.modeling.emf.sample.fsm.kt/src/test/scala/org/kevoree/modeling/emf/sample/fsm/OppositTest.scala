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
package org.kevoree.modeling.emf.sample.fsm

import org.fsmSample
import fsmSample.impl.DefaultFsmSampleFactory
import org.fsmSample.{FsmSampleFactory, FSM}
import org.junit.{Test, BeforeClass}


/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 04/04/12
 * Time: 09:20
 * To change this template use File | Settings | File Templates.
 */

class OppositTest {

  var localFsm : FSM = _


  def createModel() {
    val factory = new DefaultFsmSampleFactory()
    localFsm = factory.createFSM

    val initState = factory.createState
    localFsm.addOwnedState(initState)
    val middleState = factory.createState
    localFsm.addOwnedState(middleState)
    val finalState = factory.createState
    localFsm.addOwnedState(finalState)

    localFsm.setInitialState(initState)
    localFsm.setCurrentState(middleState)
    val list = new java.util.ArrayList[fsmSample.State]
    list.add(finalState)
    localFsm.setFinalState(list)

  }


  @Test
  def oppositTest() {

    createModel()

    val factory = new DefaultFsmSampleFactory()

    val t1 = factory.createTransition
    val t2 = factory.createTransition

    localFsm.getInitialState.addOutgoingTransition(t1)
    localFsm.getCurrentState.addIncomingTransition(t1)

    assert(t1.getTarget == localFsm.getCurrentState, "Opposite relation 'target' not properly set.")
    assert(t1.getSource == localFsm.getInitialState, "Opposite relation 'source' not properly set.")

    t2.setSource(localFsm.getCurrentState)
    t2.setTarget(localFsm.getFinalState.get(0))

    assert(localFsm.getCurrentState.getOutgoingTransition.contains(t2), "Opposite relation 'outgoingTransition' not properly set.")
    assert(localFsm.getFinalState.get(0).getIncomingTransition.contains(t2), "Opposite relation 'incomingTransition' not properly set.")

    localFsm.getInitialState.removeOutgoingTransition(t1)
    assert(!localFsm.getInitialState.getOutgoingTransition.contains(t1), "Removal of opposite relation 'outgoingTransition' not properly acting.")

    t2.setTarget(localFsm.getInitialState)
    assert(t2.getTarget == localFsm.getInitialState && localFsm.getInitialState.getIncomingTransition.contains(t2), "Moving of opposit did not go well.")
  }

}
