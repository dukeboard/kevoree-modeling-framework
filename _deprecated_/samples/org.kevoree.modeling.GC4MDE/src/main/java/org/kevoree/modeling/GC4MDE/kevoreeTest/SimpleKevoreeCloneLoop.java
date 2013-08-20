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
package org.kevoree.modeling.GC4MDE.kevoreeTest;

import org.kevoree.ContainerNode;
import org.kevoree.ContainerRoot;
import org.kevoree.KevoreeFactory;
import org.kevoree.cloner.ModelCloner;
import org.kevoree.impl.DefaultKevoreeFactory;
import org.kevoree.loader.XMIModelLoader;
import org.kevoree.modeling.GC4MDE.SimpleLoopApp;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 15/04/13
 * Time: 23:29
 */
public class SimpleKevoreeCloneLoop {

    public static void main(String[] args) {
        new SimpleKevoreeCloneLoop().doTest();
    }

    public void doTest() {
        KevoreeFactory factory = createFactory();
        ModelCloner cloner = new ModelCloner();

        XMIModelLoader loader = new XMIModelLoader();
        loader.setKevoreeFactory(factory);
        ContainerRoot originModel = loader.loadModelFromStream(SimpleLoopApp.class.getClassLoader().getResourceAsStream("bootKloudNode1.kev")).get(0);
        //fill some model elements
        for (int i = 0; i < 1000; i++) {
            ContainerNode node = factory.createContainerNode();
            node.setName("node_" + i);
            originModel.addNodes(node);
            for (int j = 0; j < 1; j++) {
                ContainerNode subnode = factory.createContainerNode();
                subnode.setName(node.getName()+"_"+j);
                node.addHosts(subnode);
                originModel.addNodes(subnode);
            }
        }

        long before = System.currentTimeMillis();
        for (int i = 0; i < 50000; i++) {
            ContainerRoot cloned = cloner.clone(originModel);
            //Do nothing
            cleanupModel(cloned);
            cloned = null;
        }
        long after = System.currentTimeMillis();
        System.out.println("Time spent : " + (after - before) + " ms ");
        System.out.println("Time spent per model (avg) : " + ((after - before) / 50000) + " ms ");
    }


    public KevoreeFactory createFactory(){
       return new DefaultKevoreeFactory();
    }

    public void cleanupModel(ContainerRoot model){
           //NOOP
    }

}
