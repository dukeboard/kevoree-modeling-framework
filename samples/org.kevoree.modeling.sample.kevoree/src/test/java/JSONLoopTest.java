import org.kevoree.ContainerRoot;
import org.kevoree.loader.JSONModelLoader;
import org.kevoree.loader.ModelLoader;
import org.kevoree.loader.XMIModelLoader;
import org.kevoree.serializer.JSONModelSerializer;
import org.kevoree.serializer.ModelSerializer;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

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

    }

    public static void main(String[] args) throws IOException {
        JSONLoopTest test = new JSONLoopTest();
        test.loopTest();
    }

}
