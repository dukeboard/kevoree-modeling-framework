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
/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * 	Fouquet Francois
 * 	Nain Gregory
 */


/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.kevoree.modeling.cpp.generator.mavenplugin;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;
import org.kevoree.modeling.cpp.generator.GenerationContext;
import org.kevoree.modeling.cpp.generator.Generator;

import java.io.*;

import java.util.*;


/**
 * @author <a href="mailto:ffouquet@irisa.fr">Fouquet François</a>
 * @version $Id$
 * @goal generate
 * @phase generate-sources
 * @requiresDependencyResolution compile
 */
public class GenModelPlugin extends AbstractMojo {

    /**
     * Generate JS for ECMA5
     *
     * @parameter
     */
    private Boolean ecma5 = false;

    /**
     * Ecore file
     *
     * @parameter
     */
    private File ecore;
    /**
     * Source base directory
     *
     * @parameter default-value="${project.build.directory}/generated-sources/kmf"
     */
    private File output;


    /**
     * version microframework
     *
     * @parameter
     */
    private String versionmicroframework;
    /**
    /**
     * Source base directory
     *
     * @parameter default-value="${project.build.directory}/generated-sources/kmf-util"
     */
    private File outputUtil;

    /**
     * code containerRoot package
     *
     * @parameter
     */
    private String packagePrefix;

    /**
     * Clear output dir
     *
     * @parameter
     */
    private Boolean clearOutput = true;

    /**
     * Generate also selector
     *
     * @parameter
     */
    private Boolean selector = false;


    /**
     * Generate JS version
     *
     * @parameter
     */
    private Boolean js = false;

    /**
     * Generate NoAPI version
     *
     * @parameter
     */
    private Boolean noapi = false;

    /**
     * Generate JS version
     *
     * @parameter
     */
    private Boolean flyweightFactory = false;


    /**
     * Generate Events
     *
     * @parameter
     */
    private Boolean events = false;


    /**
     * The maven project.
     *
     * @parameter expression="${project}"
     * @required
     * @readonly
     */
    private MavenProject project;


    /**
     * @parameter default-value="${project.build.directory}/classes"
     */
    private File outputClasses;


    /**
     * The output JS file name
     *
     * @required
     * @parameter default-value="${project.build.directory}/js/${project.artifactId}.js"
     */
    private String outputJS;


    /**
     * The output Kotlin JS file
     *
     * @required
     * @parameter default-value="${project.build.directory}/js"
     * @parameter expression="${outputKotlinJSDir}"
     */
    private File outputKotlinJSDir;


    /**
     * The output Kotlin JS file
     *
     * @required
     * @parameter default-value="${basedir}/src/main/java"
     */
    private File sourceFile;

    /**
     * The output Kotlin JS file
     *
     * @required
     * @parameter default-value="${basedir}/target/generated-source/java"
     * @parameter expression="${sourceCleanedFile}"
     */
    private File sourceCleanedFile;


    private boolean deleteDirectory(File path) {
        if (path.exists()) {
            File[] files = path.listFiles();
            for (int i = 0; i < files.length; i++) {
                if (files[i].isDirectory()) {
                    deleteDirectory(files[i]);
                } else {
                    files[i].delete();
                }
            }
        }
        return (path.delete());
    }


    public void collectFiles(File directoryPath, List<File> sourceFileList, String extension) {
        for (String contents : directoryPath.list()) {
            File current = new File(directoryPath + File.separator + contents);
            if (contents.endsWith(extension)) {
                sourceFileList.add(current);
            } else {
                if (current.isDirectory()) {
                    collectFiles(current, sourceFileList, extension);
                }
            }
        }
    }


    @Override
    public void execute() throws MojoExecutionException {
        if (clearOutput) {
            deleteDirectory(output);
        }
        GenerationContext context = new GenerationContext();
        context.setRootGenerationDirectory(output.getAbsolutePath());
        context.setEcore(ecore.getAbsoluteFile());
        context.setDebug_model(false);

        context.setVersion(project.getVersion());
        context.setVersionmicroframework(versionmicroframework);

        Generator gen = new Generator(context);
        try
        {
            gen.generateModel();
             gen.generateEnvironnement();
        } catch (IOException e) {
            e.printStackTrace();


    }


    }


}
