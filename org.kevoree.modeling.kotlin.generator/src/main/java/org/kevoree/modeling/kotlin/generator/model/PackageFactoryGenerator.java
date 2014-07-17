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
import org.eclipse.emf.ecore.EClassifier;
import org.eclipse.emf.ecore.EPackage;
import org.kevoree.modeling.VelocityLog;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 23/09/11
 * Time: 13:35
 */

public class PackageFactoryGenerator {

    public static void generatePackageFactory(GenerationContext ctx, String packageGenDir, EPackage packElement, String modelVersion) {
        if (packElement.getName() == null || packElement.getName() == "") {
            return;
        }
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

            ArrayList<EClassifier> retained = new ArrayList<EClassifier>();
            for(EClassifier cls : packElement.getEClassifiers()) {
                if(cls instanceof EClass && !((EClass)cls).isAbstract() && !((EClass)cls).isInterface()) {
                    retained.add(cls);
                }
            }
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

    public static void generateFlyweightFactory(GenerationContext ctx, String packageGenDir, EPackage packElement, String modelVersion) {

        if (packElement.getName() == null || packElement.getName().equals("")) {
            return;
        }
        String formatedFactoryName = packElement.getName().substring(0, 1).toUpperCase();
        formatedFactoryName += packElement.getName().substring(1);
        formatedFactoryName += "Factory";
        File localFile = new File(packageGenDir + "/impl/Flyweight" + formatedFactoryName + ".kt");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
            String packageName = ProcessorHelper.getInstance().fqn(ctx, packElement);
            VelocityEngine ve = new VelocityEngine();
            ve.setProperty(Velocity.RUNTIME_LOG_LOGSYSTEM, VelocityLog.INSTANCE);

            ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName());
            ve.init();
            Template template = ve.getTemplate("templates/FlyWeightFactory.vm");
            VelocityContext ctxV = new VelocityContext();
            ctxV.put("packageName", packageName);
            ctxV.put("formatedFactoryName", formatedFactoryName);

            ArrayList<EClass> retained = new ArrayList<EClass>();
            for(EClassifier cls : packElement.getEClassifiers()) {
                if(cls instanceof EClass) {
                    retained.add((EClass)cls);
                }
            }

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
    }

    public static void generatePackageFactoryDefaultImpl(GenerationContext ctx, String packageGenDir, EPackage packElement, String modelVersion) {
        if (packElement.getName() == null || packElement.getName().equals("")) {
            return;
        }
        String formatedFactoryName = packElement.getName().substring(0, 1).toUpperCase();
        formatedFactoryName += packElement.getName().substring(1);
        formatedFactoryName += "Factory";
        File localFile = new File(packageGenDir + "/impl/Default" + formatedFactoryName + ".kt");
        PrintWriter pr = null;
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
            ArrayList<EClassifier> retained = new ArrayList<EClassifier>();
            for(EClassifier cls : packElement.getEClassifiers()) {
                if(cls instanceof EClass && !((EClass)cls).isAbstract() && !((EClass)cls).isInterface()) {
                    retained.add(cls);
                }
            }
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
    }


}