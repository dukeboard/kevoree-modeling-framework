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
package org.kevoree.modeling.GC4MDE;

import org.kermeta.language.loader.ModelLoader;
import org.kermeta.language.loader.XMIModelLoader;
import org.kermeta.language.structure.Metamodel;

import java.util.List;
import java.util.Scanner;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 15/04/13
 * Time: 11:00
 */
public class SimpleLoopApp {

    public int nbModel = 500;

    public static void main(String[] args) {
        SimpleLoopApp app = new SimpleLoopApp();
        app.test();
    }

    public void test() {
        System.out.println("Load and lost "+nbModel+" Kermeta Model");
        ModelLoader loader = new XMIModelLoader();
        String content = buildTestRes();

        long before = System.currentTimeMillis();
        for (int i = 0; i < nbModel; i++) {
            List<Metamodel> models = loader.loadModelFromString(content);
            if (i % 100 == 0) {
                System.out.println("i=" + i);
            }
            cleanupModel(models);
        }

        long after = System.currentTimeMillis();
        System.out.println("Time spent : " + (after - before) + " ms ");
        System.out.println("Time spent per model (avg) : " + ((after - before) / nbModel) + " ms ");
        //ModelSerializer saver = new JSONModelSerializer();
        //saver.serialize(loader.loadModelFromStream(SimpleLoopApp.class.getClassLoader().getResourceAsStream("test_hello_beforeCheckingforScopeRESOLVED.km")).get(0), System.out);
    }

    public void cleanupModel(List<Metamodel> models) {
        //NOOP
    }

    public String buildTestRes(){
        return new Scanner(SimpleLoopApp.class.getClassLoader().getResourceAsStream("kompren_beforeCheckingforScopeRESOLVED.km"),"UTF-8").useDelimiter("\\A").next();
    }

}
