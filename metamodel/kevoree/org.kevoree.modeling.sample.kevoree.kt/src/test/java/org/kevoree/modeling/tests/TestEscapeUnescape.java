package org.kevoree.modeling.tests;

import org.kevoree.ContainerRoot;
import org.kevoree.Group;
import org.kevoree.KevoreeFactory;
import org.kevoree.impl.DefaultKevoreeFactory;
import org.kevoree.loader.JSONModelLoader;
import org.kevoree.serializer.JSONModelSerializer;
import org.junit.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

/**
 * Created with IntelliJ IDEA.
 * User: leiko
 * Date: 7/2/13
 * Time: 3:53 PM
 * To change this template use File | Settings | File Templates.
 */

public class TestEscapeUnescape {

    @Test
    public void testUnescapeEscapeSaveLoad() {
        try {
            KevoreeFactory factory = new DefaultKevoreeFactory();
            ContainerRoot root = factory.createContainerRoot();
            Group group = factory.createGroup();
            String groupName = "aaa\\r\\n\\tbbb";

            group.setName(groupName);
            root.addGroups(group);

            JSONModelSerializer serializer = new JSONModelSerializer();
            File jsonModel = File.createTempFile("all", ".json");
			jsonModel.deleteOnExit();
            serializer.serialize(root, new FileOutputStream(jsonModel));

            JSONModelLoader loader = new JSONModelLoader();
            ContainerRoot loadedModel = (ContainerRoot) loader.loadModelFromStream(new FileInputStream(jsonModel)).get(0);
            Group grp = loadedModel.findGroupsByID(groupName);

            assertEquals(groupName, grp.getName());

        } catch (Exception e) {
            fail(e.getMessage());
        }
    }
}
