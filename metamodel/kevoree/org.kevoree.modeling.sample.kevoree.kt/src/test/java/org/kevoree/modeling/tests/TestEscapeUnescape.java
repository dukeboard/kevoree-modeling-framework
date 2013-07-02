package org.kevoree.modeling.tests;

import kmf.kevoree.ContainerRoot;
import kmf.kevoree.Group;
import kmf.kevoree.KevoreeFactory;
import kmf.kevoree.impl.DefaultKevoreeFactory;
import kmf.kevoree.loader.JSONModelLoader;
import kmf.kevoree.serializer.JSONModelSerializer;
import org.junit.Test;

import java.io.File;
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
            String groupName = "aaa\n\r\tbbb";

            group.setName(groupName);
            root.addGroups(group);

            JSONModelSerializer serializer = new JSONModelSerializer();
            File jsonModel = new File("/tmp/all.json");
            serializer.serialize(root, new FileOutputStream(jsonModel));

            JSONModelLoader loader = new JSONModelLoader();
            ContainerRoot loadedModel = (ContainerRoot) loader.loadModelFromPath(jsonModel).get(0);
            Group grp = loadedModel.findGroupsByID(groupName);

            assertEquals(groupName, grp.getName());

        } catch (Exception e) {
            fail(e.getMessage());
        }
    }
}
