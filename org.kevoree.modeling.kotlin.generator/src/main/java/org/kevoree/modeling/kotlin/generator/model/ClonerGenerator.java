
package org.kevoree.modeling.kotlin.generator.model;

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


import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

/**
 * Created by IntelliJ IDEA.
 * User: Francois Fouquet
 * Date: 02/10/11
 * Time: 20:55
 */

public class ClonerGenerator {


    public static void generateCloner(GenerationContext ctx, EPackage pack, ResourceSet model) {
        ProcessorHelper.getInstance().checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "cloner");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(new File(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "cloner" + File.separator + "DefaultModelCloner.kt"), "utf-8");
            String packageName = ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration);
            ctx.clonerPackage = packageName + ".cloner";
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("templates/ModelCloner.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("packageName", packageName);
            ctxV.put("potentialRoots", ProcessorHelper.getInstance().collectAllClassifiersInModel(model));
            ctxV.put("ctx", ctx);
            ctxV.put("helper", ProcessorHelper.getInstance());
            ctxV.put("packages", ctx.packageFactoryMap.values());
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

}