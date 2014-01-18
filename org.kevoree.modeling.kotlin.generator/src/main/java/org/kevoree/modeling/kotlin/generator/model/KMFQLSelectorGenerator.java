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
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EPackage;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/02/13
 * Time: 18:39
 */
public class KMFQLSelectorGenerator {

    public static void generateSelectorCache(GenerationContext ctx, String packageGenDir, EPackage packElement) {
        String formatedCacheName = packElement.getName().substring(0, 1).toUpperCase();
        formatedCacheName += packElement.getName().substring(1);
        formatedCacheName += "ResolverCacheInternal";
        ProcessorHelper.getInstance().checkOrCreateFolder(packageGenDir + File.separator + "impl" + File.separator);
        File localFile = new File(packageGenDir + File.separator + "impl" + File.separator + formatedCacheName + ".kt");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");

            VelocityEngine ve = new VelocityEngine();
            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("templates/KMFQLSelectorCache.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("formatedCacheName", formatedCacheName);
            ctxV.put("packElem", ProcessorHelper.getInstance().fqn(ctx, packElement));
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
        ctx.kevoreeCacheResolver = ProcessorHelper.getInstance().fqn(ctx, packElement)+".impl."+formatedCacheName;
    }

    public static void generateSelectorMethods(PrintWriter pr, EClass cls, GenerationContext ctx) {

        VelocityEngine ve = new VelocityEngine();
        ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.init();
        Template template = ve.getTemplate("templates/KMFQLSelectorByQuery.vm");
        VelocityContext ctxV = new VelocityContext();
        ctxV.put("ctx", ctx);
        ctxV.put("FQNHelper", ProcessorHelper.getInstance());
        boolean optionalRelationShipNameGen = cls.getEAllReferences().size() == 1;
        ctxV.put("optionalRelationShipNameGen", optionalRelationShipNameGen);
        if (optionalRelationShipNameGen) {
            ctxV.put("relationShipOptionalName", cls.getEAllReferences().get(0).getName());
        }
        ctxV.put("eRefs",cls.getEAllReferences());
        ctxV.put("eSub",cls.getEAllContainments());
        ctxV.put("formatedFactoryName",ctx.kevoreeContainer);
        template.merge(ctxV, pr);
    }

}
