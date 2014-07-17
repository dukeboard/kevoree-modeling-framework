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
package org.kevoree.modeling.kotlin.generator.mavenplugin;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.apache.maven.plugins.annotations.ResolutionScope;
import org.apache.maven.project.MavenProject;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.RootGenerator;

import java.io.File;


@Mojo(name = "generate", defaultPhase = LifecyclePhase.COMPILE, requiresDependencyResolution = ResolutionScope.COMPILE)
public class GenModelPlugin extends AbstractMojo {

    /**
     * Generate Persistence Layer for Model
     */
    @Parameter
    private Boolean persistence = false;

    /**
     * Generate Timed-Aware persistence Layer for Model
     */
    @Parameter
    private Boolean timeAware = false;

    @Parameter
    private String autoBasePackage = "kmf";

    /**
     * Ecore file
     */
    @Parameter
    private File ecore;

    /**
     * Source base directory
     */
    @Parameter(defaultValue = "${project.build.directory}/generated-sources/kmf")
    private File output;

    /**
     * code containerRoot package
     */
    @Parameter
    private String packagePrefix;

    /**
     * Generate also selector
     */
    @Parameter
    private Boolean selector = false;


    /**
     * Generate JS version
     */
    @Parameter
    private Boolean js = false;

    /**
     * Generate JS version
     */
    @Parameter
    private Boolean flyweightFactory = false;
    /**
     * Generate Events
     */
    @Parameter
    private Boolean events = false;

    @Parameter
    private Boolean ecma3compat = false;

    /**
     * The maven project.
     */
    @Parameter(defaultValue = "${project}", required = true, readonly = true)
    private MavenProject project;

    @Parameter(defaultValue = "${project.build.directory}/classes")
    private File outputClasses;

    /**
     * The output JS file name
     */
    @Parameter(defaultValue = "${project.build.directory}/js/${project.artifactId}.js", required = true)
    private String outputJS;


    /**
     * The output Kotlin JS file
     */
    @Parameter(defaultValue = "${project.build.directory}/js", required = true)
    private File outputKotlinJSDir;


    /**
     * The output Kotlin JS file
     */
    @Parameter(defaultValue = "${basedir}/src/main/java", required = true)
    private File sourceFile;

    /**
     * The output Kotlin JS file
     */
    @Parameter(defaultValue = "${basedir}/target/generated-source/java", required = true)
    private File sourceCleanedFile;

    @Override
    public void execute() throws MojoExecutionException {
        GenerationContext ctx = new GenerationContext();
        ctx.rootSrcDirectory = sourceFile;
        if (timeAware) {
            persistence = true;
        }
        ctx.packagePrefix = packagePrefix;
        ctx.rootGenerationDirectory = output;
        ctx.rootCompilationDirectory = outputClasses;
        ctx.rootUserDirectory = sourceFile;
        ctx.genSelector = selector;
        ctx.js = js;
        ctx.generateEvents = events;
        ctx.flyweightFactory = flyweightFactory;
        ctx.autoBasePackage = autoBasePackage;
        ctx.ecma3compat = ecma3compat;
        ctx.persistence = persistence;
        ctx.timeAware = timeAware;
        if (persistence) {
            ctx.generateEvents = true;
        }
        try {
            RootGenerator generator = new RootGenerator();
            generator.execute(ctx, ecore, project.getVersion(), project.getArtifactId(), project.getCompileClasspathElements());
        } catch (Exception e) {
            getLog().error(e);
        }
    }

}
