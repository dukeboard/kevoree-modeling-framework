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
import org.kevoree.serializer.ModelJSONSerializer;
import org.kevoreeadaptation.AdaptationModel;

import java.io.*;

public class JSONLoopTest {


    public void loopTest() throws IOException {

        ModelLoader loader = new ModelLoader();
        ContainerRoot model = loader.loadModelFromPath(new File(getClass().getResource("/bootKloudNode1.kev").getPath())).get(0);
        System.out.println("ModelLoaded");
        File fp = File.createTempFile("jsonXMI",".jsonXMI");
        System.out.println(fp.getAbsolutePath());
        FileOutputStream fop = new FileOutputStream(fp);
        ModelJSONSerializer saver = new ModelJSONSerializer();
        saver.serialize(model,fop);
        fop.flush();
        fop.close();
        JSONModelLoader jsonModelLoader = new JSONModelLoader();
        ContainerRoot model2 = jsonModelLoader.loadModelFromPath(fp).get(0);
        assert(model2!=null);

        File fp2 = File.createTempFile("jsonXMI2",".jsonXMI");
        System.out.println(fp2.getAbsolutePath());
        FileOutputStream fop2 = new FileOutputStream(fp2);
        ModelJSONSerializer saver2 = new ModelJSONSerializer();
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
