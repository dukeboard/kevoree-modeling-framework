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
package org.kevoree.modeling.kotlin.generator.model;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.eclipse.emf.ecore.EClass;
import org.kevoree.modeling.VelocityLog;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 24/04/13
 * Time: 15:54
 */
public class DiffGenerator {


    public static void generateModelTraceCompare(GenerationContext ctx, String packageGenDir) {

        String packageName = ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration);
        ProcessorHelper.getInstance().checkOrCreateFolder(packageGenDir + File.separator + "compare"+ File.separator );
        File localFile = new File(packageGenDir + File.separator + "compare"+File.separator+"DefaultModelCompare.kt");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("templates/DefaultModelCompare.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("helper", ProcessorHelper.getInstance());
            ctxV.put("ctx", ctx);
            ctxV.put("packageName", packageName);
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


    public static void generateModelTraceAPI( GenerationContext ctx, String packageGenDir) {
        ProcessorHelper.getInstance().checkOrCreateFolder(packageGenDir + File.separator + "trace" + File.separator);
        File localFile = new File(packageGenDir + File.separator + "trace"+File.separator+"DefaultTraceSequence.kt");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("templates/trace/DefaultTraceSequence.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("helper", ProcessorHelper.getInstance());
            ctxV.put("ctx", ctx);
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

    /*
    public static void generateDiffMethod(PrintWriter pr, EClass cls, GenerationContext ctx) {
        VelocityEngine ve = new VelocityEngine();
        ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

        ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();
        Template template = ve.getTemplate("templates/trace/TraceCompareMethod.vm");
        VelocityContext ctxV = new VelocityContext();
        ctxV.put("ctx", ctx);
        ctxV.put("currentClass", cls);
        ctxV.put("FQNHelper", ProcessorHelper.getInstance());
        template.merge(ctxV, pr);
    }*/

}
