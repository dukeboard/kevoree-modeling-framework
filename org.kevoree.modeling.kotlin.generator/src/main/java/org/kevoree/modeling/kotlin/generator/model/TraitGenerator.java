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
import org.kevoree.modeling.VelocityLog;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 23/09/11
 * Time: 13:35
 */

public class TraitGenerator {

    private static final String KObjectName = "KObject";

    public static void generateContainerTrait(GenerationContext ctx) {
        PrintWriter pr = null;
        try {
            ProcessorHelper.getInstance().checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "container");
            File localFile = new File(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "container" + File.separator + KObjectName + "Impl.kt");
            pr = new PrintWriter(localFile, "utf-8");

            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("templates/ContainerTrait.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("formatedFactoryName", KObjectName);
            ctxV.put("packElem", ctx.basePackageForUtilitiesGeneration + ".container");
            ctxV.put("FQNHelper", ProcessorHelper.getInstance());
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

        ctx.kevoreeContainer = "org.kevoree.modeling.api.KObject";
        ctx.kevoreeContainerImplFQN = ctx.basePackageForUtilitiesGeneration + ".container." + KObjectName + "Impl";
    }

    public static void generateContainerPersistenceTrait(GenerationContext ctx) {
        ProcessorHelper.getInstance().checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "container");
        File localFile = new File(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "container" + File.separator + KObjectName + "PersistenceImpl.kt");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");

            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("templates/ContainerPersistenceTrait.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("formatedFactoryName", KObjectName);
            ctxV.put("packElem", ctx.basePackageForUtilitiesGeneration + ".container");
            ctxV.put("FQNHelper", ProcessorHelper.getInstance());
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
        ctx.kevoreeContainer = "org.kevoree.modeling.api.KObject";
        ctx.kevoreeContainerImplFQN = ctx.basePackageForUtilitiesGeneration + ".container." + KObjectName + "PersistenceImpl";
    }

    public static void generateRemoveFromContainerCommand(GenerationContext ctx) {
        ProcessorHelper.getInstance().checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "container");
        File localFile = new File(ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + File.separator + "container" + File.separator + "RemoveFromContainerCommand.kt");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("templates/commands/RemoveFromContainerCommand.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("ctx", ctx);
            ctxV.put("helper", ProcessorHelper.getInstance());
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