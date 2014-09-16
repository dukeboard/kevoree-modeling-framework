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
package org.kevoree.modeling.kotlin.generator;


import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.resource.ResourceSet;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 22/09/11
 * Time: 09:49
 */

public class ProcessorHelper {

    private static ProcessorHelper INSTANCE = new ProcessorHelper();

    public static ProcessorHelper getInstance() {
        return INSTANCE;
    }

    public Collection<EAttribute> noduplicate(EList<EAttribute> allAtt) {
        HashMap<String, EAttribute> eATTs = new HashMap<String, EAttribute>();
        for (EAttribute at : allAtt) {
            eATTs.put(at.getName(), at);
        }
        return eATTs.values();
    }

    public Collection<EReference> noduplicateRef(EList<EReference> allRefs) {
        HashMap<String, EReference> eRefs = new HashMap<String, EReference>();
        for (EReference ref : allRefs) {
            eRefs.put(ref.getName(), ref);
        }
        return eRefs.values();
    }


    public String getLastName(String name) {
        return name.substring(name.lastIndexOf(".") + 1);
    }


    public Collection<EClass> getEClassInEPackage(EPackage ePackage) {
        ArrayList<EClass> classes = new ArrayList<EClass>();
        for (EClassifier classif : ePackage.getEClassifiers()) {
            if (classif instanceof EClass) {
                classes.add((EClass) classif);
            }
        }
        return classes;
    }


    public void checkOrCreateFolder(String path) {
        File file = new File(path);
        if (!file.exists()) file.mkdirs();
    }


    public String convertType(EDataType aType, GenerationContext ctx) {
        if (aType instanceof EEnum) {
            return fqn(ctx, ((EEnum) aType).getEPackage()) + "." + ((EEnum) aType).getName();
        } else {

            if (aType.getInstanceClass() != null) {
                return convertType(aType.getInstanceClassName());
            } else {
                return convertType(aType.getName());
            }

        }
    }


    private static HashMap<String, String> typeConvertionTable = new HashMap<String, String>();

    static {
        typeConvertionTable.put("short", "Short");
        typeConvertionTable.put("java.lang.Short", "Short");
        typeConvertionTable.put("byte", "Byte");
        typeConvertionTable.put("EByte", "Byte");
        typeConvertionTable.put("java.lang.Byte", "Byte");
        typeConvertionTable.put("EBooleanObject", "Boolean");
        typeConvertionTable.put("EBoolean", "Boolean");
        typeConvertionTable.put("bool", "Boolean");
        typeConvertionTable.put("boolean", "Boolean");
        typeConvertionTable.put("java.lang.Boolean", "Boolean");
        typeConvertionTable.put("Boolean", "Boolean");
        typeConvertionTable.put("EString", "String");
        typeConvertionTable.put("java.lang.String", "String");
        typeConvertionTable.put("String", "String");
        typeConvertionTable.put("EIntegerObject", "Int");
        typeConvertionTable.put("int", "Int");
        typeConvertionTable.put("java.lang.Integer", "Int");
        typeConvertionTable.put("Integer", "Int");
        typeConvertionTable.put("EInt", "Int");
        typeConvertionTable.put("float", "Float");
        typeConvertionTable.put("java.lang.Float", "Float");
        typeConvertionTable.put("double", "Double");
        typeConvertionTable.put("java.lang.Double", "Double");
        typeConvertionTable.put("EDouble", "Double");
        typeConvertionTable.put("EDoubleObject", "Double");
        typeConvertionTable.put("ELongObject", "Long");
        typeConvertionTable.put("long", "Long");
        typeConvertionTable.put("java.lang.Long", "Long");
        typeConvertionTable.put("Long", "Long");
        typeConvertionTable.put("ELong", "Long");
        typeConvertionTable.put("java.lang.Object", "Any");
        typeConvertionTable.put("EResource", "Any");
        typeConvertionTable.put("EJavaObject", "Any");
        typeConvertionTable.put("java.util.Date", "java.util.Date");
        typeConvertionTable.put("ETreeIterator", "MutableIterator<*>");
        typeConvertionTable.put("org.eclipse.emf.common.util.Enumerator", "Any");
        typeConvertionTable.put("EEList", "List<Any?>");
        typeConvertionTable.put("org.eclipse.emf.common.util.EList", "List<Any>");
        typeConvertionTable.put("org.eclipse.emf.ecore.resource.Resource", "Any");
        typeConvertionTable.put("org.eclipse.emf.ecore.resource.ResourceSet", "Any");
        typeConvertionTable.put("org.eclipse.emf.common.util.TreeIterator", "Any");
        typeConvertionTable.put("byte[]", "Array<Byte>");
        typeConvertionTable.put("char", "Char");
        typeConvertionTable.put("Char", "Char");
        typeConvertionTable.put("java.lang.Character", "Char");
        typeConvertionTable.put("java.math.BigInteger", "java.math.BigInteger");
        typeConvertionTable.put("java.lang.Class", "Any");
        typeConvertionTable.put("EJavaClass", "Any");
        typeConvertionTable.put("java.util.Map", "Map<out Any,out Any>");
    }

    public String convertType(String theType) {
        String res = typeConvertionTable.get(theType);
        if (res == null) {
            return theType;
        } else {
            return res;
        }
    }


    public String getDefaultValue(GenerationContext ctx, EAttribute att) {

        String defaultLit = att.getDefaultValueLiteral();
        if (defaultLit != null && !defaultLit.equals("")) {
            return defaultLit;
        }

        String dataType = EDataTypes.dataTypes.get(att.getEAttributeType());
        if (dataType == null) {
            dataType = convertType(att.getEAttributeType(), ctx);
        }

        if (dataType != null) {

            if (dataType.equals("Boolean")) {
                return ctx.basePackageForUtilitiesGeneration + ".util.Constants.BOOLEAN_DEFAULTVAL";
            } else if (dataType.equals("Byte")) {
                return ctx.basePackageForUtilitiesGeneration + ".util.Constants.BYTE_DEFAULTVAL";
            } else if (dataType.equals("Char")) {
                return ctx.basePackageForUtilitiesGeneration + ".util.Constants.CHAR_DEFAULTVAL";
            } else if (dataType.equals("Double")) {
                return ctx.basePackageForUtilitiesGeneration + ".util.Constants.DOUBLE_DEFAULTVAL";
            } else if (dataType.equals("Float")) {
                return ctx.basePackageForUtilitiesGeneration + ".util.Constants.FLOAT_DEFAULTVAL";
            } else if (dataType.equals("Int")) {
                return ctx.basePackageForUtilitiesGeneration + ".util.Constants.INT_DEFAULTVAL";
            } else if (dataType.equals("Long")) {
                return ctx.basePackageForUtilitiesGeneration + ".util.Constants.LONG_DEFAULTVAL";
            } else if (dataType.equals("Short")) {
                return ctx.basePackageForUtilitiesGeneration + ".util.Constants.SHORT_DEFAULTVAL";
            } else if (dataType.equals("String")) {
                return ctx.basePackageForUtilitiesGeneration + ".util.Constants.STRING_DEFAULTVAL";
            } else {
                return "null";
            }

        } else {
            return att.getDefaultValueLiteral();
        }
    }


    public String protectReservedWords(String word) {

        if (word.equals("type")) {
            return "`type`";
        } else if (word.equals("object")) {
            return "`object`";
        } else if (word.equals("requires")) {
            return "`requires`";
        } else if (word.equals("interfaces")) {
            return "`interfaces`";
        } else if (word.equals("package")) {
            return "`package`";
        } else if (word.equals("val")) {
            return "`val`";
        } else if (word.equals("var")) {
            return "`var`";
        } else if (word.equals("class")) {
            return "`class`";
        } else if (word.equals("fun")) {
            return "`fun`";
        } else {
            return word;
        }

    }

    public String protectReservedJWords(String word) {

        if (word.equals("long")) {
            return "_long_";
        } else if (word.equals("int")) {
            return "_int_";
        } else if (word.equals("float")) {
            return "_float_";
        } else if (word.equals("double")) {
            return "_double_";
        } else if (word.equals("short")) {
            return "_short_";
        } else if (word.equals("char")) {
            return "_char_";
        } else if (word.equals("boolean")) {
            return "_boolean_";
        } else if (word.equals("byte")) {
            return "_byte_";
        } else if (word.equals("type")) {
            return "_type_";
        } else if (word.equals("object")) {
            return "_object_";
        } else if (word.equals("requires")) {
            return "_requires_";
        } else if (word.equals("transient")) {
            return "_transient_";
        } else if (word.equals("package")) {
            return "_package_";
        } else if (word.equals("default")) {
            return "_default_";
        } else if (word.equals("interface")) {
            return "_interface_";
        } else if (word.equals("enumeration")) {
            return "_enumeration_";
        } else if (word.equals("volatile")) {
            return "_volatile_";
        } else if (word.equals("abstract")) {
            return "_abstract_";
        } else if (word.equals("enum")) {
            return "_enum_";
        } else if (word.equals("class")) {
            return "_class_";
        } else {
            return word;
        }

    }

    public String generateHeader(EPackage packElement) {
        String header = "";
        SimpleDateFormat formateur = new SimpleDateFormat("'Date:' dd MMM yy 'Time:' HH:mm");
        header += "/**\n";
        header += " * Created by Kevoree Model Generator(KMF).\n";
        header += " * @developers: Gregory Nain, Fouquet Francois\n";
        header += " * " + formateur.format(new Date()) + "\n";
        header += " * Meta-Model:NS_URI=" + packElement.getNsURI() + "\n";
        header += " */";
        return header;
    }


    public String generateSuperTypes(GenerationContext ctx, EClass cls, EPackage packElement) {
        String superTypeList = "";

        if (ctx.timeAware) {
            superTypeList = " : org.kevoree.modeling.api.TimedContainer<"+cls.getName()+"> ";
        } else {
            superTypeList = " : " + ctx.kevoreeContainer;
        }

        for (EClass superType : cls.getESuperTypes()) {
            superTypeList = superTypeList + " , " + fqn(ctx, superType);
        }
        return superTypeList;
    }

    /*
    public String generateSuperTypesPlusSuperAPI(GenerationContext ctx, EClass cls, EPackage packElement) {
        String superTypeList;
        superTypeList = " : " + ctx.kevoreeContainerImplFQN + ", " + fqn(ctx, packElement) + "." + cls.getName();
        for (EClass superType : cls.getESuperTypes()) {
            String superName = fqn(ctx, superType.getEPackage()) + ".impl." + superType.getName() + "Internal";
            superTypeList = superTypeList + " , " + superName;
        }
        return superTypeList;
    }


    public List<EClass> getAllConcreteSubTypes(EClass iface) {
        LinkedList<EClass> res = new LinkedList<EClass>();

        for (EClassifier cl : iface.getEPackage().getEClassifiers()) {
            if (cl instanceof EClass) {
                EClass cls = (EClass) cl;
                if (!cls.isInterface() && !cls.isAbstract() && cls.getEAllSuperTypes().contains(iface)) {

                    boolean alreadyAdded = false;
                    for (EClass previousC : res) {
                        if (cls.getEAllSuperTypes().contains(previousC)) {
                            alreadyAdded = true;
                            break;
                        }
                    }
                    if (alreadyAdded) {
                        res.addLast(cls);
                    } else {
                        res.addFirst(cls);
                    }
                }
            }
        }
        return res;
    }

    public List<EClass> getDirectConcreteSubTypes(EClass iface) {
        ArrayList<EClass> res = new ArrayList<EClass>();

        for (EClassifier cl : iface.getEPackage().getEClassifiers()) {
            if (cl instanceof EClass) {
                EClass cls = (EClass) cl;
                if (!cls.isInterface() && !cls.isAbstract() && cls.getEAllSuperTypes().contains(iface)) {

                    boolean supertypeFound = false;
                    for (EClass previousC : res) {
                        if (cls.getEAllSuperTypes().contains(previousC)) {
                            supertypeFound = true;
                            break;
                        }
                    }
                    //adds an element only if the collection does not already contain one of its supertypes
                    if (!supertypeFound) {

                        //remove potential subtypes already inserted in the collection
                        ArrayList<EClass> toBeRemoved = new ArrayList<EClass>();
                        for (EClass c : res) {
                            if (c.getEAllSuperTypes().contains(cls)) {
                                toBeRemoved.add(c);
                            }
                        }
                        res.removeAll(toBeRemoved);
                        res.add(cls);
                    }
                }
            }
        }
        return res;
    } */

    /**
     * Returns the absolute path of the folder in which to generate classes of a package.
     *
     * @param ctx  The generation context
     * @param pack the package to be generated
     * @return The absolute path of the folder where to generate the content of the package.
     */
    public String getPackageGenDir(GenerationContext ctx, EPackage pack) {
        String modelGenBaseDir = ctx.rootGenerationDirectory.getAbsolutePath() + "/";
        modelGenBaseDir += fqn(pack).replace(".", "/") + "/";
        return modelGenBaseDir.toLowerCase();
    }

    /**
     * Returns the absolute path of the folder containing implementations made by users for the given package.
     *
     * @param ctx  The generation context
     * @param pack the package required
     * @return The absolute path of the folder where to find any implementation made by developers.
     */
    public String getPackageUserDir(GenerationContext ctx, EPackage pack) {
        if (ctx.rootUserDirectory != null) {
            String modelGenBaseDir = ctx.rootUserDirectory.getAbsolutePath() + "/";
            modelGenBaseDir += fqn(pack).replace(".", "/") + "/";
            return modelGenBaseDir;
        } else {
            return "";
        }
    }


    /**
     * Computes the Fully Qualified Name of the package in the context of the model.
     *
     * @param pack the package which FQN has to be computed
     * @return the Fully Qualified package name
     */
    public String fqn(EPackage pack) {
        if (pack == null) {
            try {
                throw new Exception("Null Package , stop generation");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        String locFqn = protectReservedWords(pack.getName().toLowerCase());
        EPackage parentPackage = pack.getESuperPackage();
        while (parentPackage != null) {
            locFqn = parentPackage.getName() + "." + locFqn;
            parentPackage = parentPackage.getESuperPackage();
        }
        return locFqn;
    }

    /**
     * Computes the Fully Qualified Name of the package in the context of the generation (i.e. including the package prefix if any).
     *
     * @param ctx  the generation context
     * @param pack the package which FQN has to be computed
     * @return the Fully Qualified package name
     */
    public String fqn(GenerationContext ctx, EPackage pack) {
        return fqn(pack);
    }


    /**
     * Computes the Fully Qualified Name of the class in the context of the model.
     *
     * @param cls the class which FQN has to be computed
     * @return the Fully Qualified Class name
     */
    public String fqn(EClassifier cls) {
        if (cls.getEPackage() == null) {
            return cls.getName();
        } else {
            return fqn(cls.getEPackage()) + "." + cls.getName();
        }
    }

    /**
     * Computes the Fully Qualified Name of the class in the context of the generation (i.e. including the package prefix if any).
     *
     * @param ctx the generation context
     * @param cls the class which FQN has to be computed
     * @return the Fully Qualified Class name
     */
    public String fqn(GenerationContext ctx, EClassifier cls) {
        if (cls.getEPackage() != null) {
            return fqn(ctx, cls.getEPackage()) + "." + cls.getName();
        } else {
            return cls.getName();
        }
    }

    public List<EClassifier> collectAllClassifiersInModel(ResourceSet model) {
        ArrayList<EClassifier> allClassifiers = new ArrayList<EClassifier>();

        Iterator<Notifier> iterator = model.getAllContents();
        while (iterator.hasNext()) {
            Notifier content = iterator.next();

            if (content instanceof EClass) {
                allClassifiers.add((EClass) content);
            } else if (content instanceof EEnum) {
                allClassifiers.add((EEnum) content);
            } else if (content instanceof EPackage) {
                allClassifiers.addAll(collectAllClassifiersInPackage((EPackage) content));
            }
        }
        return allClassifiers;
    }


    public ArrayList<EClassifier> collectAllClassifiersInPackage(EPackage pack) {
        ArrayList<EClassifier> allClassifiers = new ArrayList<EClassifier>();
        for (EClassifier classifier : pack.getEClassifiers()) {
            if (!(classifier instanceof EDataType) || classifier instanceof EEnum) {
                allClassifiers.add(classifier);
            }
        }
        for (EPackage subPackage : pack.getESubpackages()) {
            allClassifiers.addAll(collectAllClassifiersInPackage(subPackage));
        }
        return allClassifiers;
    }

    public class Partition {
        public ArrayList<EClassifier> containedClassifiers;
        public ArrayList<EClassifier> notContainedClassifiers;
    }


    /**
     * Separates contained classifiers from not contained classifiers; from a collection of classifiers.
     *
     * @param allClassifiers The classifier collection to sort
     * @return a Partition containing ContainedClassifiers and NotContainedClassifiers
     */
    public Partition getPartClassifiersByContainement(ArrayList<EClassifier> allClassifiers) {
        ArrayList<EClassifier> containedClassifiers = new ArrayList<EClassifier>();
        ArrayList<EClassifier> notContainedClassifiers = new ArrayList<EClassifier>();

        for (EClassifier classifier : allClassifiers) {
            if (classifier instanceof EClass) {
                for (EReference containedRef : ((EClass) classifier).getEAllContainments()) {
                    containedClassifiers.add(containedRef.getEType());
                }
            } else if (classifier instanceof EEnum) {
                containedClassifiers.add((EEnum) classifier);
            }
        }

        for (EClassifier classifier : allClassifiers) {
            if (!containedClassifiers.contains(classifier)) {
                notContainedClassifiers.add(classifier);
            }
        }

        Partition p = new Partition();
        p.containedClassifiers = containedClassifiers;
        p.notContainedClassifiers = notContainedClassifiers;
        return p;
    }

    public void copyFromStream(InputStream intputStream, String name, String target) {
        try {
            File targetFile = new File(new File(target.replace("/", File.separator)), name.replace("/", File.separator));
            targetFile.getParentFile().mkdirs();
            FileOutputStream out = null;
            out = new FileOutputStream(targetFile);
            InputStream src = intputStream;
            byte[] buffer = new byte[1024];
            int len = src.read(buffer);
            while (len != -1) {
                out.write(buffer, 0, len);
                len = src.read(buffer);
                if (Thread.interrupted()) {
                    throw new InterruptedException();
                }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Copies from a resource from the Jar
     *
     * @param name   the name of teh resource
     * @param target the location
     */
    public void copyFromStream(String name, String target) {
        copyFromStream(this.getClass().getClassLoader().getResourceAsStream(name), name, target);
    }


    public String toCamelCase(EReference ref) {
        return ref.getName().substring(0, 1).toUpperCase() + ref.getName().substring(1);
    }

    public String toCamelCase(EAttribute att) {
        return att.getName().substring(0, 1).toUpperCase() + att.getName().substring(1);
    }

    public String mkString(List array, String sepChar) {
        return mkString(array, "", sepChar, "");
    }


    public String mkString(List array, String beginChar, String sepChar, String endChar) {
        StringBuffer res = new StringBuffer();
        res.append(beginChar);
        if (array.size() == 1) {
            res.append(array.get(0));
        } else if (array.size() > 1) {
            res.append(array.get(0));
            for (int i = 1; i < array.size(); i++) {
                res.append(sepChar);
                res.append(array.get(i));
            }
        }
        res.append(endChar);
        return res.toString();
    }

}