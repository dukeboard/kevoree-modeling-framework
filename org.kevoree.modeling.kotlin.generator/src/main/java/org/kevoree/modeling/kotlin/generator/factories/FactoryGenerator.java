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

import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Map;

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 28/03/13
*/
public class FactoryGenerator {

    public static void generateMainFactory(GenerationContext ctx) {
        try {
            ProcessorHelper.getInstance().checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "factory");
            generatePackageEnum(ctx);
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
            if (ctx.persistence) {
                pr.println("override var datastore: org.kevoree.modeling.api.persistence.DataStore? = null");
                pr.println("override val elem_cache: java.util.HashMap<String, org.kevoree.modeling.api.KMFContainer> = java.util.HashMap<String, org.kevoree.modeling.api.KMFContainer>()");
                pr.println("override val modified_elements: java.util.HashMap<String, org.kevoree.modeling.api.KMFContainer> = java.util.HashMap<String, org.kevoree.modeling.api.KMFContainer>()\n");
                pr.println("override var compare: org.kevoree.modeling.api.compare.ModelCompare = " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".compare.DefaultModelCompare()");
            }
            if (ctx.timeAware) {
                pr.println("override var timeCache: java.util.HashMap<String, org.kevoree.modeling.api.time.blob.TimeMeta> = java.util.HashMap<String, org.kevoree.modeling.api.time.blob.TimeMeta>()\n");
                pr.println("override var relativeTime: org.kevoree.modeling.api.time.TimePoint = org.kevoree.modeling.api.time.TimePoint.create(\"0:0\")");
                pr.println("override var queryMap: MutableMap<String, org.kevoree.modeling.api.time.TimePoint> = java.util.HashMap<String, org.kevoree.modeling.api.time.TimePoint>()");
                pr.println("override fun time(tp: org.kevoree.modeling.api.time.TimePoint): org.kevoree.modeling.api.time.TimeView<MainFactory> {\n");
                pr.println("    val newFactory = MainFactory();");
                pr.println("    newFactory.datastore = this.datastore;");
                pr.println("    newFactory.relativeTime = tp;");
                pr.println("    return newFactory;");
                pr.println("}");
            }
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


}
