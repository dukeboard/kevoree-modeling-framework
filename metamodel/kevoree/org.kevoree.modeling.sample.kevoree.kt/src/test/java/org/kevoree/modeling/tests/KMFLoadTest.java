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
 */
package org.kevoree.modeling.tests;

import org.junit.Test;
import org.kevoree.ContainerRoot;
import org.kevoree.cloner.DefaultModelCloner;
import org.kevoree.modeling.api.KMFContainer;
import org.kevoree.modeling.api.ModelLoader;
import org.kevoree.loader.XMIModelLoader;

import java.io.*;
import java.lang.management.GarbageCollectorMXBean;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.net.URISyntaxException;
import java.util.List;

import org.kevoree.modeling.api.ModelCloner;
import org.kevoree.modeling.api.ModelSerializer;
import org.kevoree.serializer.XMIModelSerializer;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 21/03/13
 * Time: 11:29
 */
public class KMFLoadTest {

    @Test
    public void testLoad() throws URISyntaxException,FileNotFoundException {

        ModelLoader loader = new XMIModelLoader();
        ModelCloner cloner = new DefaultModelCloner();
        ContainerRoot model = (ContainerRoot)loader.loadModelFromStream(new FileInputStream(new File(KMFLoadTest.class.getResource("/node0.kev").toURI()))).get(0);

        long before = System.currentTimeMillis();
        for(int i=0;i<10000;i++){
            ContainerRoot model2 = cloner.clone(model);
            model2.delete();
        }

        long after = System.currentTimeMillis();

        System.out.println("Time : "+(after-before)+" ms");
        MemoryMXBean mbs = ManagementFactory.getMemoryMXBean();
        System.out.println(mbs.getObjectPendingFinalizationCount());
        List<GarbageCollectorMXBean> mbs2 = ManagementFactory.getGarbageCollectorMXBeans();
        System.out.println(mbs2.get(0).getCollectionTime());

    }


    @Test
    public void testSaveXmi() {
        try {
            ModelLoader loader = new XMIModelLoader();
            ContainerRoot localModel = (ContainerRoot)loader.loadModelFromStream(new FileInputStream(new File(getClass().getResource("/bootstrapModel0.kev").toURI()))).get(0);
            assert(localModel != null);

            File tempFile = File.createTempFile("kmfTest_" + System.currentTimeMillis(), "kev");
            System.out.println(tempFile.getAbsolutePath());
            FileOutputStream pr = new FileOutputStream(tempFile);
            ModelSerializer ms = new XMIModelSerializer();

            ms.serializeToStream(localModel,pr);
            pr.close();
            System.out.println("Model Saved to: " + tempFile.getAbsolutePath());
            tempFile.deleteOnExit();
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (URISyntaxException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Test
    public void testSaveAndLoad() {
        //System.out.print("Saving model from memory to tempFile =>")
        try {

            ModelLoader loader = new XMIModelLoader();
            ContainerRoot localModel = (ContainerRoot)loader.loadModelFromStream(new FileInputStream(new File(getClass().getResource("/bootstrapModel0.kev").toURI()))).get(0);
            assert(localModel != null);

            File tempFile = File.createTempFile("kmfTest_" + System.currentTimeMillis(), "kev");
            System.out.println(tempFile.getAbsolutePath());
            FileOutputStream pr = new FileOutputStream(tempFile);
            ModelSerializer ms = new XMIModelSerializer();


            ms.serializeToStream(localModel,pr);
            pr.close();
            System.out.println("Loading saved model " + tempFile.getAbsolutePath());
            ModelLoader loader2 = new XMIModelLoader();
            KMFContainer localModel2 = (KMFContainer)loader2.loadModelFromStream(new FileInputStream(tempFile)).get(0);
            assert(localModel2 != null);
            System.out.println("Loading OK.");
            tempFile.deleteOnExit();
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (URISyntaxException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

    }


}
