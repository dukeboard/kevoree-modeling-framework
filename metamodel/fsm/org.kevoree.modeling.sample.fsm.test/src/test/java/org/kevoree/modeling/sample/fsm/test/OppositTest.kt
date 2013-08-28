/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * Fouquet Francois
 * Nain Gregory
 */
package org.kevoree.test

import org.junit.Test
import org.fsmsample.FSM
import org.fsmsample.impl.DefaultFsmSampleFactory
import org.fsmsample.State


/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 04/04/12
 * Time: 09:20
 * To change this template use File | Settings | File Templates.
 */

public class OppositTest {

    val factory = DefaultFsmSampleFactory()
  var localFsm : FSM = factory.createFSM()


  fun createModel() {
    val factory = DefaultFsmSampleFactory()
    localFsm = factory.createFSM()

    val initState = factory.createState()
    localFsm.addOwnedState(initState)
    val middleState = factory.createState()
    localFsm.addOwnedState(middleState)
    val finalState = factory.createState()
    localFsm.addOwnedState(finalState)

    localFsm.initialState = initState
    localFsm.currentState = middleState
    val list = java.util.ArrayList<State>()
    list.add(finalState)
    localFsm.finalState = list

  }


  Test fun oppositTest() {

    createModel()

    val factory = DefaultFsmSampleFactory()

    val t1 = factory.createTransition()
    val t2 = factory.createTransition()

    localFsm.initialState?.addOutgoingTransition(t1)
    localFsm.currentState?.addIncomingTransition(t1)

    assert(t1.target == localFsm.currentState, "Opposite relation 'target' not properly set.")
    assert(t1.source == localFsm.initialState, "Opposite relation 'source' not properly set.")

    t2.source = localFsm.currentState
    t2.target = localFsm.finalState.get(0)

    assert(localFsm.currentState?.outgoingTransition?.contains(t2)!!, "Opposite relation 'outgoingTransition' not properly set.")
    assert(localFsm.finalState.get(0).incomingTransition.contains(t2), "Opposite relation 'incomingTransition' not properly set.")

    localFsm.initialState?.removeOutgoingTransition(t1)
    assert(!localFsm.initialState?.outgoingTransition?.contains(t1)!!, "Removal of opposite relation 'outgoingTransition' not properly acting.")

    t2.target = localFsm.initialState
    assert(t2.target == localFsm.initialState && localFsm.initialState?.incomingTransition?.contains(t2)!!, "Moving of opposit did not go well.")
  }

}
