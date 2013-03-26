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
package org.kevoree.modeling.scala.generator

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/12/12
 * Time: 14:51
 */
object QueryTester extends App {

  val query = "nodes[node0]"
  val querys = "nodes[node0]/hosts[subNode3]/components[fake]"


  def parseBlind(q : String){
    val relationName = q.substring(0,q.indexOf('['))
    val queryID = q.substring(q.indexOf('[')+1,q.indexOf(']'))
    val subQuery = q.substring(q.indexOf(']')+1,q.size)

    //SwitchByrelationName
    parseR(queryID+"/"+subQuery)

  }

  def parseR(qs : String){

    var localQuery = qs
    var subquery : String = null
    if (qs.indexOf('/') != -1){
      localQuery = qs.substring(0,qs.indexOf('/'))
      subquery = qs.substring(qs.indexOf('/')+1,qs.size)
    }

    println(localQuery + ",sub="+subquery)

    if (subquery != null && subquery != ""){
      parseBlind(subquery)
    }

  }


 // parse(query)
  parseBlind(querys)

}
