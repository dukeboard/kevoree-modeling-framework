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
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.kevoree.ContainerNode;
import org.kevoree.ContainerRoot;
import org.kevoree.kompare.KevoreeKompareBean;
import org.kevoree.loader.JSONModelLoader;
import org.kevoree.loader.ModelLoader;
import org.kevoreeadaptation.AdaptationModel;
import org.kevoree.loader.XMIModelLoader;
import org.kevoree.serializer.JSONModelSerializer;
import org.kevoree.serializer.ModelSerializer;

import java.io.*;

public class JSONLoopTest {


    public void loopTest() throws IOException {

        ModelLoader loader = new XMIModelLoader();
        ContainerRoot model = loader.loadModelFromPath(new File(getClass().getResource("/bootKloudNode1.kev").getPath())).get(0);
        System.out.println("ModelLoaded");
        File fp = File.createTempFile("jsonXMI",".jsonXMI");
        System.out.println(fp.getAbsolutePath());
        FileOutputStream fop = new FileOutputStream(fp);
        ModelSerializer saver = new JSONModelSerializer();
        saver.serialize(model,fop);
        fop.flush();
        fop.close();
        ModelLoader jsonModelLoader = new JSONModelLoader();
        ContainerRoot model2 = jsonModelLoader.loadModelFromPath(fp).get(0);
        assert(model2!=null);

        File fp2 = File.createTempFile("jsonXMI2",".jsonXMI");
        System.out.println(fp2.getAbsolutePath());
        FileOutputStream fop2 = new FileOutputStream(fp2);
        ModelSerializer saver2 = new JSONModelSerializer();
        saver2.serialize(model2,fop2);
        fop2.flush();
        fop2.close();

        ContainerRoot model3 = jsonModelLoader.loadModelFromPath(fp2).get(0);
        assert(model3!=null);

        File fp3 = File.createTempFile("jsonXMI3",".jsonXMI");
        System.out.println(fp3.getAbsolutePath());
        FileOutputStream fop3 = new FileOutputStream(fp3);
        saver2.serialize(model3, fop3);
        fop3.flush();
        fop3.close();




        for(ContainerNode node : model.getNodes()){
            KevoreeKompareBean b = new KevoreeKompareBean();
            AdaptationModel adaptationModel = b.kompare(model,model2,node.getName());

            assert(adaptationModel.getAdaptations().size()==0);

        }


        ObjectMapper mapper = new ObjectMapper();
        JsonNode tree1 = mapper.readTree(new FileInputStream(fp));
        JsonNode tree2 = mapper.readTree(new FileInputStream(fp2));
        assert(tree1.equals(tree2));

         System.out.println(tree1.size()+"-"+tree2.size());


        JsonParser parser = new JsonParser();
        JsonElement o1 = parser.parse(new FileReader(fp));
        JsonElement o2 = parser.parse(new FileReader(fp2));
        assert(o1.equals(o2));


       // Gson gson = new GsonBuilder().setPrettyPrinting().create();
        //System.out.println(gson.toJson(o1));
      //  System.err.println(gson.toJson(o2));



    }

    public static void main(String[] args) throws IOException {
        JSONLoopTest test = new JSONLoopTest();
        test.loopTest();
    }

}
