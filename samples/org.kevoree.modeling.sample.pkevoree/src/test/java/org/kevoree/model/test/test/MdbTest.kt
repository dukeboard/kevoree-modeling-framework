package org.kevoree.model.test

import org.kevoree.persistency.mdb.PersistentKevoreeFactory
import java.io.File
import org.kevoree.loader.ModelLoader
import java.net.URISyntaxException
import kotlin.test.*
import org.junit.Test as test
import org.kevoree.NodeType
import org.kevoree.GroupType
import org.kevoree.ChannelType


/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 26/02/13
* (c) 2013 University of Luxembourg – Interdisciplinary Centre for Security Reliability and Trust (SnT)
* All rights reserved
*/




class MdbTest() {



    test public fun _00_baseTest() {

        val factory = PersistentKevoreeFactory(File("/tmp/myModelDb"))

        System.out.println("Creation of ContainerRoot")
        val modelRoot = factory.createContainerRoot()

        for(i in 0..9) {
            System.out.println("Creation of DeployUnit #" + i)
            val du = factory.createDeployUnit()
            System.out.println("SetID")
            du.setName("du"+ i)
            System.out.println("addToRoot")
            modelRoot.addDeployUnits(du)

            System.out.println("Creation of TypeDefinition #" + i)
            val td = factory.createTypeDefinition()
            System.out.println("SetID")
            td.setName("td"+ i)
            System.out.println("SetDU")
            td.addDeployUnits(du)
            System.out.println("addToRoot")
            modelRoot.addTypeDefinitions(td)
        }

        assertTrue(modelRoot.getTypeDefinitions().size()==10, "Type definition list is not of expected size:" + modelRoot.getTypeDefinitions().size());
        assertTrue(modelRoot.getDeployUnits().size()==10, "Deploy Unit list is not of expected size: " + modelRoot.getDeployUnits().size());
        assertTrue(modelRoot.getTypeDefinitions().get(5).getDeployUnits().get(0).getName().equals("du5"), "TypeDefinition do not have the good deploy unit: " +  modelRoot.getTypeDefinitions().get(5).getDeployUnits().get(0).getName());

    }

    test public fun _10_loadTest() {

        try {
            val loader = ModelLoader()
            val modelFile = File(this.javaClass.getResource("/unomas.kev")!!.toURI())

            //Usual load
            val m = loader.loadModelFromPath(modelFile)!!.get(0);
            assertNotNull(m);

            //New load
            loader.setKevoreeFactory(PersistentKevoreeFactory(File("/tmp/myModelDb" + System.currentTimeMillis())));
            val root = loader.loadModelFromPath(modelFile)!!.get(0);
            assertNotNull(root);


            assertTrue(m.getAdaptationPrimitiveTypes().size == root.getAdaptationPrimitiveTypes().size)
            assertTrue(m.getDataTypes().size == root.getDataTypes().size)
            assertTrue(m.getDeployUnits().size == root.getDeployUnits().size)
            assertTrue(m.getGroups().size == root.getGroups().size)
            assertTrue(m.getHubs().size == root.getHubs().size)
            assertTrue(m.getLibraries().size == root.getLibraries().size)
            assertTrue(m.getMBindings().size == root.getMBindings().size)
            assertTrue(m.getNodeNetworks().size == root.getNodeNetworks().size)
            assertTrue(m.getNodes().size == root.getNodes().size)
            assertTrue(m.getRepositories().size == root.getRepositories().size)
            assertTrue(m.getTypeDefinitions().size == root.getTypeDefinitions().size)

            val javaSENode = root.getTypeDefinitions().find { td -> td.getName().equals("JavaSENode")}
            assertTrue(javaSENode != null && javaSENode is NodeType)

            val statefulJavaSENode = root.getTypeDefinitions().find { td -> td.getName().equals("StatefulJavaSENode")}
            assertTrue(statefulJavaSENode != null && statefulJavaSENode is NodeType)

            val nanoRestGroup = root.getTypeDefinitions().find { td -> td.getName().equals("NanoRestGroup")}
            assertTrue(nanoRestGroup != null && nanoRestGroup is GroupType)

            val basicGossiperChannel = root.getTypeDefinitions().find { td -> td.getName().equals("BasicGossiperChannel")}
            assertTrue(basicGossiperChannel != null && basicGossiperChannel is ChannelType)

        } catch ( e : URISyntaxException) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }


    test public fun _20_oppositeTest() {

        val loader = ModelLoader()
        val modelFile = File(this.javaClass.getResource("/unomas.kev")!!.toURI())

        //Usual load
        val m = loader.loadModelFromPath(modelFile)!!.get(0);
        assertNotNull(m);

        //New load
        loader.setKevoreeFactory(PersistentKevoreeFactory(File("/tmp/myModelDb" + System.currentTimeMillis())));
        val root = loader.loadModelFromPath(modelFile)!!.get(0);
        assertNotNull(root);


        m.getMBindings().forEach { mb ->
            println("---------->")
            val p = mb.getPort()
            assert(mb.getPort() != null)
            assert(mb.getPort() == p)


            println(">>"+mb.getPort())

            assert(mb.getPort()!!.getBindings().size == 1)
            assert(mb.getPort()!!.getBindings().contains(mb))

            mb.setPort(null)
            assert(mb.getPort() == null)
            assert(p!!.getBindings().size == 0)
            assert(!p.getBindings().contains(mb))

            mb.setPort(p)
            assert(mb.getPort() == p)
            assert(mb.getPort()!!.getBindings().size == 1)
            assert(mb.getPort()!!.getBindings().contains(mb))

            p.removeBindings(mb)
            assert(mb.getPort() == null)
            assert(p.getBindings().size == 0)
            assert(!p.getBindings().contains(mb))

            p.addBindings(mb)
            assert(mb.getPort() == p)
            assert(mb.getPort()!!.getBindings().size == 1)
            assert(mb.getPort()!!.getBindings().contains(mb))

        }




        root.getMBindings().forEach { mb ->
            println("---------->")
            val p = mb.getPort()
            assert(mb.getPort() != null)
            assert(mb.getPort().equals(p))


            println(">>"+mb.getPort())

            assert(mb.getPort()!!.getBindings().size == 1)
            assert(mb.getPort()!!.getBindings().contains(mb))

            mb.setPort(null)
            assert(mb.getPort() == null)
            assert(p!!.getBindings().size == 0)
            assert(!p.getBindings().contains(mb))

            mb.setPort(p)
            assert(mb.getPort().equals(p))
            assert(mb.getPort()!!.getBindings().size == 1)
            assert(mb.getPort()!!.getBindings().contains(mb))

            p.removeBindings(mb)
            assert(mb.getPort() == null)
            assert(p.getBindings().size == 0)
            assert(!p.getBindings().contains(mb))

            p.addBindings(mb)
            assert(mb.getPort().equals(p))
            assert(mb.getPort()!!.getBindings().size == 1)
            assert(mb.getPort()!!.getBindings().contains(mb))

        }

    }


   fun main(args : Array<String>) {

        val test = MdbTest()
        test._00_baseTest()
        test._10_loadTest()
        test._20_oppositeTest()

    }





}