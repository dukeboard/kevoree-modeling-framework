package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.*;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


/*
* Author : Gregory Nain
* Date : 30/08/13
*/

class LoadingContext {

    public XmlParser xmiReader;

    /*
    public XmiLoaderAttributeVisitor attributeVisitor;
    public XmiLoaderReferenceVisitor referenceVisitor;
    public HashMap<String, HashMap<String, Boolean>> attributesHashmap = new HashMap<String, HashMap<String, Boolean>>();
    public HashMap<String, HashMap<String, String>> referencesHashmap = new HashMap<String, HashMap<String, String>>();
    */

    public KObject loadedRoots = null;
    public ArrayList<XMIResolveCommand> resolvers = new ArrayList<XMIResolveCommand>();

    public HashMap<String, KObject> map = new HashMap<String, KObject>();

    public HashMap<String, Integer> elementsCount = new HashMap<String, Integer>();
    public HashMap<String, Integer> stats = new HashMap<String, Integer>();
    public HashMap<String, Boolean> oppositesAlreadySet = new HashMap<String, Boolean>();


    public Callback<KObject> successCallback;
    public Callback<Throwable> errorCallback;

    public Boolean isOppositeAlreadySet(String localRef, String oppositeRef) {
        return (oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null));
    }

    public void storeOppositeRelation(String localRef, String oppositeRef) {
        oppositesAlreadySet.put(localRef + "_" + oppositeRef, true);
    }
}

public class XMIModelLoader implements ModelLoader {

    private KView factory;

    public static final String LOADER_XMI_LOCAL_NAME = "type";
    public static final String LOADER_XMI_XSI = "xsi";
    public static final String LOADER_XMI_NS_URI = "nsURI";


    public XMIModelLoader(KView factory) {
        this.factory = factory;
    }

    private boolean namedElementSupportActivated = false;

    public void activateSupportForNamedElements(boolean activate) {
        namedElementSupportActivated = activate;
    }

    private String unescapeXml(String src) {
        StringBuilder builder = null;
        int i = 0;
        while (i < src.length()) {
            char c = src.charAt(i);
            if (c == '&') {
                if (builder == null) {
                    builder = new StringBuilder();
                    builder.append(src.substring(0, i));
                }
                if (src.charAt(i + 1) == 'a') {
                    if (src.charAt(i + 2) == 'm') {
                        builder.append("&");
                        i = i + 5;
                    } else if (src.charAt(i + 2) == 'p') {
                        builder.append("'");
                        i = i + 6;
                    } else {
                        System.err.println("Could not unescaped chain:" + src.charAt(i) + src.charAt(i + 1) + src.charAt(i + 2));
                    }
                } else if (src.charAt(i + 1) == 'q') {
                    builder.append("\"");
                    i = i + 6;
                } else if (src.charAt(i + 1) == 'l') {
                    builder.append("<");
                    i = i + 4;
                } else if (src.charAt(i + 1) == 'g') {
                    builder.append(">");
                    i = i + 4;
                } else {
                    System.err.println("Could not unescaped chain:" + src.charAt(i) + src.charAt(i + 1));
                }
            } else {
                if (builder != null) {
                    builder.append(c);
                }
                i++;
            }
        }
        if (builder != null) {
            return builder.toString();
        } else {
            return src;
        }
    }


    @Override
    public void loadModelFromString(String str, Callback<KObject> callback) {
        loadModelFromStream(new ByteArrayInputStream(str.getBytes(StandardCharsets.UTF_8)), callback);
    }

    @Override
    public void loadModelFromStream(InputStream inputStream, Callback<KObject> callback) {
        XmlParser parser = new XmlParser(inputStream);
        if (!parser.hasNext()) {
            callback.on(null);
        } else {
            LoadingContext context = new LoadingContext();
            context.successCallback = callback;
            context.xmiReader = parser;
                /*
                context.attributeVisitor = new XmiLoaderAttributeVisitor(context);
                context.referenceVisitor = new XmiLoaderReferenceVisitor(context);
                */
            deserialize(context);
        }
    }


    private void deserialize(LoadingContext context) {
        try {
            String nsURI;
            XmlParser reader = context.xmiReader;
            while (reader.hasNext()) {
                XmlParser.Token nextTag = reader.next();
                switch (nextTag) {
                    case START_TAG: {
                        String localName = reader.getLocalName();
                        if (localName != null) {
                            //int loadedRootsSize = context.loadedRoots.size();

                            HashMap<String, String> ns = new HashMap<String, String>();

                            for (int i = 0; i < reader.getAttributeCount() - 1; i++) {
                                String attrLocalName = reader.getAttributeLocalName(i);
                                String attrLocalValue = reader.getAttributeValue(i);
                                if (attrLocalName.equals(LOADER_XMI_NS_URI)) {
                                    nsURI = attrLocalValue;
                                }
                                ns.put(attrLocalName, attrLocalValue);
                            }

                            String xsiType = reader.getTagPrefix();
                            String realTypeName = ns.get(xsiType);
                            if (realTypeName == null) {
                                realTypeName = xsiType;
                            }
                            context.loadedRoots = loadObject(context, "/", xsiType + "." + localName);

                        } else {
                            System.err.println("Tried to read a tag with null tag_name.");
                        }
                    }
                    case END_TAG: {
                        break;
                    }
                    case END_DOCUMENT: {
                        break;
                    }
                    default: {
                    /*println("Default case :" + nextTag.toString())*/
                    }
                }
            }
            for (XMIResolveCommand res : context.resolvers) {
                res.run();
            }
        /*
        if (context.resourceSet != null && nsURI != null) {
            resourceSet!!.registerXmiAddrMappedObjects(nsURI!!, context.map)
        }*/
            context.successCallback.on(context.loadedRoots);
        } catch (Exception e) {
            context.errorCallback.on(e);
        }
    }

    private KObject callFactory(LoadingContext ctx, String objectType) {
        KObject modelElem = null;
        if (objectType != null) {
            modelElem = factory.createFQN(objectType);
            if (modelElem == null) {
                String xsiType = null;
                for (int i = 0; i < (ctx.xmiReader.getAttributeCount() - 1); i++) {
                    String localName = ctx.xmiReader.getAttributeLocalName(i);
                    String xsi = ctx.xmiReader.getAttributePrefix(i);
                    if (localName.equals(LOADER_XMI_LOCAL_NAME) && xsi.equals(LOADER_XMI_XSI)) {
                        xsiType = ctx.xmiReader.getAttributeValue(i);
                        break;
                    }
                }
                if (xsiType != null) {
                    String realTypeName = xsiType.substring(0, xsiType.lastIndexOf(":"));
                    String realName = xsiType.substring(xsiType.lastIndexOf(":") + 1, xsiType.length());
                    modelElem = factory.createFQN(realTypeName + "." + realName);
                }
            }

        } else {
            modelElem = factory.createFQN(ctx.xmiReader.getLocalName());
        }
        return modelElem;
    }


    private KObject loadObject(LoadingContext ctx, String xmiAddress, String objectType) throws Exception {
        String elementTagName = ctx.xmiReader.getLocalName();

        KObject modelElem = callFactory(ctx, objectType);

        if (modelElem == null) {
            throw new Exception("Could not create an object for local name " + elementTagName);
        }
        ctx.map.put(xmiAddress, modelElem);
        //ctx.map.put(xmiAddress.replace(".0",""), modelElem!!)
        //println("Registering " + xmiAddress)



        /* Preparation of maps
        if (!ctx.attributesHashmap.containsKey(modelElem.metaClass().metaName())) {
            ctx.attributeVisitor.setParent(modelElem);
            modelElem.visitAttributes(ctx.attributeVisitor);
        }
        HashMap elemAttributesMap = ctx.attributesHashmap.get(modelElem.metaClass().metaName());

        if (!ctx.referencesHashmap.containsKey(modelElem.metaClass().metaName())) {
            modelElem.visitAll(ctx.referenceVisitor,null);  //TODO check if not a dangerous synchronous call
        }
        * */
        //HashMap<String, String> elemReferencesMap = ctx.referencesHashmap.get(modelElem.metaClass().metaName());


        /* Read attributes and References */
        for (int i = 0; i < (ctx.xmiReader.getAttributeCount() - 1); i++) {
            String prefix = ctx.xmiReader.getAttributePrefix(i);
            if (prefix == null || prefix.equals("")) {
                String attrName = ctx.xmiReader.getAttributeLocalName(i).trim();
                String valueAtt = ctx.xmiReader.getAttributeValue(i).trim();
                if (valueAtt != null) {
                    String[] referenceArray = valueAtt.split(" ");
                    if (referenceArray.length > 1) {
                        String xmiRef = referenceArray[0];
                        for (int j = 0; j < referenceArray.length; j++) {
                            String adjustedRef = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);

                            adjustedRef = (adjustedRef.startsWith("//") ? "/0" + adjustedRef.substring(1) : adjustedRef);
                            adjustedRef = adjustedRef.replace(".0", "");
                            KObject ref = ctx.map.get(adjustedRef);
                            if (ref != null) {
                                modelElem.mutate(KActionType.ADD, modelElem.metaReference(attrName), ref, true, false, null);
                            } else {
                                ctx.resolvers.add(new XMIResolveCommand(ctx, modelElem, KActionType.ADD, attrName, adjustedRef));
                            }
                        }
                    } else {
                        //reference, can be remote
                        if (!valueAtt.startsWith("#") && !valueAtt.startsWith("/")) {
                            throw new UnsupportedOperationException("ResourceSet not supported " + valueAtt);
                        } else {
                            modelElem.set(modelElem.metaAttribute(attrName), unescapeXml(valueAtt), false);
                            if (namedElementSupportActivated && attrName.equals("name")) {
                                KObject parent = ctx.map.get(xmiAddress.substring(0, xmiAddress.lastIndexOf("/")));
                                ctx.map.entrySet().forEach(entry -> {
                                    if (entry.getValue() == parent) {
                                        String refT = entry.getKey() + "/" + unescapeXml(valueAtt);
                                        ctx.map.put(refT, modelElem);
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }

        boolean done = false;
        while (!done) {
            switch (ctx.xmiReader.next()) {
                case START_TAG: {
                    String subElemName = ctx.xmiReader.getLocalName();
                    int i = ctx.elementsCount.computeIfAbsent(xmiAddress + "/@" + subElemName, (s) -> 0);
                    String subElementId = xmiAddress + "/@" + subElemName + (i != 0 ? "." + i : "");
                    KObject containedElement = loadObject(ctx, subElementId, subElemName);
                    modelElem.mutate(KActionType.ADD, modelElem.metaReference(subElemName), containedElement, true, false, null);
                    ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1);
                }
                case END_TAG: {
                    if (ctx.xmiReader.getLocalName().equals(elementTagName)) {
                        done = true;
                    }
                }
                default: {
                }
            }
        }
        return modelElem;

    }

}

/*
class XmiLoaderReferenceVisitor extends ModelVisitor {

    public List<MetaReference refMap;
    private LoadingContext context;

    public XmiLoaderReferenceVisitor(LoadingContext context) {
        this.context = context;
    }

    public void beginVisitElem(KObject elem ) {
        refMap = context.referencesHashmap.computeIfAbsent(elem.metaClass().metaName(), s -> new HashMap<>());
    }
    public void endVisitElem(KObject elem) {
        refMap = null;
    }
    public boolean beginVisitRef(String refName, String refType) {
        refMap.put(refName, refType);
        return true;
    }

    @Override
    public void visit(KObject elem, MetaReference currentReference, KObject parent, Callback<Throwable> continueVisit) {

    }
}


class XmiLoaderAttributeVisitor implements ModelAttributeVisitor {

    private LoadingContext context;
    private KObject parent;

    public XmiLoaderAttributeVisitor(LoadingContext context) {
        this.context = context;
    }

    public void setParent(KObject parent) {
        this.parent = parent;
        context.attributesHashmap.computeIfAbsent(parent.metaClass().metaName(), s -> new HashMap<>());
    }

    public void visit(String name, Object value) {
        context.attributesHashmap.get(parent.metaClass().metaName()).put(name, true);
    }
}
*/


