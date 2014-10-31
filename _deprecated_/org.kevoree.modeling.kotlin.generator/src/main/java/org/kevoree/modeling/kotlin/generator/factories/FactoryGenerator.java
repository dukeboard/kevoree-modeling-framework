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
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.kevoree.modeling.VelocityLog;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 28/03/13
*/
public class FactoryGenerator {


    public static void generate(GenerationContext ctx, ResourceSet model, String modelVersion, String targetName) {
        String packageGenDir = ctx.getBaseLocationForUtilitiesGeneration().getAbsolutePath() + "/factory";
        ProcessorHelper.getInstance().checkOrCreateFolder(packageGenDir);
        String formatedFactoryName = ctx.formattedName;
        formatedFactoryName += "Factory";
        File localFile = new File(packageGenDir + "/Default" + formatedFactoryName + ".kt");
        PrintWriter pr = null;
        ArrayList<EClassifier> retained = new ArrayList<EClassifier>();
        Iterator<Notifier> iterator = model.getAllContents();
        while (iterator.hasNext()) {
            Notifier c = iterator.next();
            if (c instanceof EClassifier) {
                EClassifier cls = (EClassifier) c;
                if (cls instanceof EClass && !((EClass) cls).isAbstract() && !((EClass) cls).isInterface()) {
                    retained.add(cls);
                }
            }
        }

        String formatedName3 = ctx.formattedName;
        formatedName3 += "TimeView";

        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);
            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("DefaultFactory.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("packageName", ctx.basePackageForUtilitiesGeneration.toLowerCase());
            ctxV.put("formatedFactoryName", formatedFactoryName);
            ctxV.put("formatedTimeView", formatedName3);
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
            if (pr != null) {
                pr.flush();
                pr.close();
            }
        }

        if(ctx.persistence){
            try {
                String formatedFactoryNameImpl = ctx.formattedName;
                formatedFactoryNameImpl += "Factory";

                String formatedManagerName = ctx.formattedName;
                formatedManagerName += "TransactionManager";
                String formatedName2 = ctx.formattedName;
                formatedName2 += "Transaction";
                File localFileManager = new File(packageGenDir + "/Default" + formatedManagerName + ".kt");
                pr = new PrintWriter(localFileManager, "utf-8");
                VelocityEngine ve = new VelocityEngine();
                ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);
                ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
                ve.init();
                Template template = ve.getTemplate("DefaultTransactionManager.vm");
                VelocityContext ctxV = new VelocityContext();
                ctxV.put("packageName", ctx.basePackageForUtilitiesGeneration.toLowerCase());
                ctxV.put("formatedName", formatedManagerName);
                ctxV.put("formatedFactoryName", formatedFactoryName);
                ctxV.put("formatedName2", formatedName2);
                ctxV.put("formatedName3", formatedName3);
                ctxV.put("formatedFactoryNameImpl", formatedFactoryNameImpl);

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
                if (pr != null) {
                    pr.flush();
                    pr.close();
                }
            }
        }

        generateFactoryAPI(ctx, packageGenDir, modelVersion, retained);
    }


    private static void generateFactoryAPI(GenerationContext ctx, String packageGenDir, String modelVersion, List<EClassifier> retained) {
        ProcessorHelper.getInstance().checkOrCreateFolder(packageGenDir);
        String formatedFactoryName = ctx.formattedName;
        formatedFactoryName += "Factory";
        File localFile = new File(packageGenDir + "/" + formatedFactoryName + ".kt");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);
            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("FactoryAPI.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("packageName", ctx.basePackageForUtilitiesGeneration.toLowerCase());
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
            if (pr != null) {
                pr.flush();
                pr.close();
            }
        }
    }


}
