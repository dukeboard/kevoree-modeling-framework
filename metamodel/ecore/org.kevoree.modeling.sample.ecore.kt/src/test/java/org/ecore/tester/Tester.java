package org.ecore.tester;


import ecore.loader.XMIModelLoader;
import ecore.serializer.XMIModelSerializer;
import org.kevoree.modeling.api.KMFContainer;
import org.kevoree.modeling.api.xmi.ResourceSet;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 17/06/13
 * Time: 18:38
 */
public class Tester {

    public static void main(String[] args) {

        XMIModelLoader loader = new XMIModelLoader();
        loader.activateSupportForNamedElements(true);
        loader.setResourceSet(new ResourceSet());

        loader.loadModelFromStream(Tester.class.getClassLoader().getResourceAsStream("ecore.ecore"));

        System.out.println(loader.getResourceSet().resolveObject("ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EString").metaClassName());

        List<KMFContainer> model = loader.loadModelFromStream(Tester.class.getClassLoader().getResourceAsStream("kevoree.ecore"));

        XMIModelSerializer saver = new XMIModelSerializer();
        saver.setIgnoreGeneratedID(true);
        saver.setResourceSet(loader.getResourceSet());
        saver.serializeToStream(model.get(0), System.out);

    }

}
