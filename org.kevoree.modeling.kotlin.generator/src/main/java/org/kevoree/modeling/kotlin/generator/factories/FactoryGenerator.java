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
package org.kevoree.modeling.kotlin.generator.factories;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EClassifier;
import org.eclipse.emf.ecore.EEnum;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.kevoree.modeling.VelocityLog;
import org.kevoree.modeling.aspect.NewMetaClassCreation;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;
import org.kevoree.modeling.kotlin.generator.model.PackageFactoryGenerator;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 28/03/13
*/
public class FactoryGenerator {


    public static void generateMainFactory(GenerationContext ctx, ResourceSet model, String modelVersion) {

        EPackage packElement = ctx.getBasePackageForUtilitiesGeneration();
        String packageGenDir = ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + "/factory";
        ProcessorHelper.getInstance().checkOrCreateFolder(packageGenDir);
        String formatedFactoryName = packElement.getName().substring(0, 1).toUpperCase();
        formatedFactoryName += packElement.getName().substring(1);
        formatedFactoryName += "Factory";
        File localFile = new File(packageGenDir + "/Default" + formatedFactoryName + ".kt");
        PrintWriter pr = null;

        ArrayList<EClassifier> retained = new ArrayList<EClassifier>();
        Iterator<Notifier> iterator = model.getAllContents();
        while (iterator.hasNext()) {
            Notifier c = iterator.next();
            if(c instanceof EClassifier) {
                EClassifier cls = (EClassifier)c;
                if (cls instanceof EClass && !((EClass) cls).isAbstract() && !((EClass) cls).isInterface()) {
                    retained.add(cls);
                }
            }

        }


        try {
            pr = new PrintWriter(localFile, "utf-8");
            String packageName = ProcessorHelper.getInstance().fqn(ctx, packElement);
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("DefaultFactory.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("packageName", packageName);
            ctxV.put("formatedFactoryName", formatedFactoryName);
            ctxV.put("js", ctx.js);
            ctxV.put("helper", ProcessorHelper.getInstance());
            ctxV.put("ctx", ctx);

            ctxV.put("classes", retained);
            ctxV.put("modelVersion", modelVersion);
            template.merge(ctxV, pr);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } finally {
            if(pr != null) {
                pr.flush();
                pr.close();
            }
        }


        generateFactoryAPI(ctx, packageGenDir, modelVersion, retained);


    }



    public static void generateFactoryAPI(GenerationContext ctx, String packageGenDir, String modelVersion, List<EClassifier> retained) {

        EPackage packElement = ctx.getBasePackageForUtilitiesGeneration();
        ProcessorHelper.getInstance().checkOrCreateFolder(packageGenDir);

        String formatedFactoryName  = packElement.getName().substring(0, 1).toUpperCase();
        formatedFactoryName += packElement.getName().substring(1);
        formatedFactoryName += "Factory";

        File localFile = new File(packageGenDir + "/" + formatedFactoryName + ".kt");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            String packageName = ProcessorHelper.getInstance().fqn(ctx, packElement);
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("FactoryAPI.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("packageName", packageName);
            ctxV.put("helper", ProcessorHelper.getInstance());
            ctxV.put("ctx", ctx);
            ctxV.put("formatedFactoryName", formatedFactoryName);
            ctxV.put("classes", retained);
            template.merge(ctxV, pr);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } finally {
            if(pr != null) {
                pr.flush();
                pr.close();
            }
        }

    }


    public static void generatePackageFactoryDefaultImpl(GenerationContext ctx, String packageGenDir, EPackage packElement, String modelVersion) {
        if (packElement.getName() == null || packElement.getName().equals("")) {
            return;
        }

    }



    /*
    public static void generateMainFactory(GenerationContext ctx) {
        try {
            ProcessorHelper.getInstance().checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "factory");
            //generatePackageEnum(ctx);
            File genFile = new File(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "factory" + File.separator + "MainFactory.kt");
            PrintWriter pr = null;
            pr = new PrintWriter(genFile, "utf-8");
            pr.println("package " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".factory");
            if (ctx.persistence && !ctx.timeAware) {
                pr.println("class MainFactory : org.kevoree.modeling.api.persistence.PersistenceKMFFactory {");
            } else {
                if (ctx.timeAware) {
                    pr.println("class MainFactory : org.kevoree.modeling.api.time.TimeAwareKMFFactory<MainFactory> {");
                } else {
                    pr.println("class MainFactory : org.kevoree.modeling.api.KMFFactory {");
                }
            }

            pr.println("override var sharedCache : org.kevoree.modeling.api.time.blob.SharedCache<MainFactory> = org.kevoree.modeling.api.time.blob.SharedCache<MainFactory>()\n");

            pr.println("override fun select(query: String): List<org.kevoree.modeling.api.KMFContainer> {\n" +
                    "        //TODO\n" +
                    "        return java.util.ArrayList<org.kevoree.modeling.api.KMFContainer>();\n" +
                    "    }");

            pr.println("override fun createJSONSerializer(): org.kevoree.modeling.api.json.JSONModelSerializer {\n" +
                    "    return " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".serializer.JSONModelSerializer()\n" +
                    "}\n" +
                    "override fun createJSONLoader(): org.kevoree.modeling.api.json.JSONModelLoader {\n" +
                    "    return " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".loader.JSONModelLoader()\n" +
                    "}\n" +
                    "override fun createXMISerializer(): org.kevoree.modeling.api.xmi.XMIModelSerializer {\n" +
                    "    return " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".serializer.XMIModelSerializer()\n" +
                    "}\n" +
                    "override fun createXMILoader(): org.kevoree.modeling.api.xmi.XMIModelLoader {\n" +
                    "    return " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".loader.XMIModelLoader()\n" +
                    "}\n" +
                    "override fun createModelCompare(): org.kevoree.modeling.api.compare.ModelCompare {\n" +
                    "    return " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".compare.DefaultModelCompare()\n" +
                    "}\n" +
                    "\n" +
                    "override fun createModelCloner() : org.kevoree.modeling.api.ModelCloner {\n" +
                    "    return " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".cloner.DefaultModelCloner()\n" +
                    "}");


            pr.println("override fun root(elem : org.kevoree.modeling.api.KMFContainer){\n" +
                    "    (elem as " + ctx.getKevoreeContainerImplFQN() + ").is_root = true\n" +
                    "    (elem as " + ctx.getKevoreeContainerImplFQN() + ").path_cache = \"/\"\n" +
                    "}");

            if (ctx.persistence) {
                pr.println("override var datastore: org.kevoree.modeling.api.persistence.DataStore? = org.kevoree.modeling.api.persistence.MemoryDataStore()");
                pr.println("override val elem_cache: java.util.HashMap<String, org.kevoree.modeling.api.KMFContainer> = java.util.HashMap<String, org.kevoree.modeling.api.KMFContainer>()");
                pr.println("override val modified_elements: java.util.HashMap<String, org.kevoree.modeling.api.KMFContainer> = java.util.HashMap<String, org.kevoree.modeling.api.KMFContainer>()\n");
                pr.println("override val elementsToBeRemoved : MutableSet<String> = java.util.HashSet<String>()\n");
                pr.println("override var compare: org.kevoree.modeling.api.compare.ModelCompare = " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".compare.DefaultModelCompare()");
            }
            if (ctx.timeAware) {
                pr.println("override var entitiesCache: org.kevoree.modeling.api.time.blob.EntitiesMeta? = null\n");
                pr.println("override var relativeTime: org.kevoree.modeling.api.time.TimePoint = org.kevoree.modeling.api.time.TimePoint.create(\"0:0\")");
                pr.println("override fun time(tp: org.kevoree.modeling.api.time.TimePoint): org.kevoree.modeling.api.time.TimeView<MainFactory> {\n");
                pr.println("    val newFactory = MainFactory();");
                pr.println("    newFactory.datastore = this.datastore;");
                pr.println("    newFactory.relativeTime = tp;");
                pr.println("    return newFactory;");
                pr.println("}");
            }
            /*
            pr.println("");
            pr.println("private var factories : Array<org.kevoree.modeling.api.KMFFactory?> = Array<org.kevoree.modeling.api.KMFFactory?>(" + ctx.packageFactoryMap.entrySet().size() + ", {i -> null});");
            pr.println("");
            pr.println("{");
            for (Map.Entry<String, String> entry : ctx.packageFactoryMap.entrySet()) {
                pr.println("factories.set(Package." + entry.getKey().toUpperCase().replace(".", "_") + ", " + entry.getKey() + ".impl.Default" + entry.getValue().substring(entry.getValue().lastIndexOf(".") + 1, entry.getValue().length()) + "())");
            }

            pr.println("}");
            pr.println("fun getFactoryForPackage( pack : Int) : org.kevoree.modeling.api.KMFFactory? {");
            pr.println("return factories.get(pack)");
            pr.println("}");

            for (Map.Entry<String, String> entry : ctx.packageFactoryMap.entrySet()) {
                pr.println("fun get" + entry.getValue().substring(entry.getValue().lastIndexOf(".") + 1, entry.getValue().length()) + "() : " + entry.getValue() + " {");
                pr.println("return factories.get(Package." + entry.getKey().toUpperCase().replace(".", "_") + ") as " + entry.getValue());
                pr.println("}");
                pr.println("");
                pr.println("fun set" + entry.getValue().substring(entry.getValue().lastIndexOf(".") + 1, entry.getValue().length()) + "( fct : " + entry.getValue() + ") {");
                pr.println("factories.set(Package." + entry.getKey().toUpperCase().replace(".", "_") + ",fct)");
                pr.println("}");
                pr.println("");
            }
            pr.println("");


            pr.print("override ");
            pr.println("fun create(metaClassName : String) : org.kevoree.modeling.api.KMFContainer? {");
            pr.println("val pack = Package.getPackageForName(metaClassName)");
            pr.println("    if(pack != -1) {");
            pr.println("        return getFactoryForPackage(pack)?.create(metaClassName)");
            pr.println("    } else {");
            pr.println("        for(i in factories.indices) {");
            pr.println("            val obj = factories[i]!!.create(metaClassName)");
            pr.println("            if(obj != null) {");
            pr.println("                return obj;");
            pr.println("            }");
            pr.println("        }");
            pr.println("        return null");
            pr.println("    }");
            pr.println("}");
            pr.println("}");

            pr.flush();
            pr.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

/*
    private static void generatePackageEnum(GenerationContext ctx) throws FileNotFoundException, UnsupportedEncodingException {
        File genFile = new File(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "factory" + File.separator + "Package.kt");
        PrintWriter pr = new PrintWriter(genFile, "utf-8");
        pr.println("package " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".factory");

        pr.println("object Package {");
        int i = 0;

        for (String key : ctx.packageFactoryMap.keySet()) {
            pr.println(" public val " + key.toUpperCase().replace(".", "_") + " : Int = " + i);
            i = i + 1;
        }

        pr.println("fun getPackageForName(metaClassName : String) : Int {");
        i = 0;

        for (String key : ctx.packageFactoryMap.keySet()) {
            pr.println(" if(metaClassName.startsWith(\"" + key + "\")){return " + i + "}");
            i = i + 1;
        }

        pr.println("return -1");
        pr.println("}");
        pr.println("}");
        pr.flush();
        pr.close();
    }
    */


}
