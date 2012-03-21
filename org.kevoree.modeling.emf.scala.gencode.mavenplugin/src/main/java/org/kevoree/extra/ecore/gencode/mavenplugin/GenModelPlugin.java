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
package org.kevoree.extra.ecore.gencode.mavenplugin;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;

import java.io.File;

/**
 * Generates files based on grammar files with Antlr tool.
 *
 * @author <a href="mailto:ffouquet@irisa.fr">Fouquet François</a>
 * @version $Id$
 * @goal generate
 * @phase generate-sources
 * @requiresDependencyResolution compile
 */
public class GenModelPlugin extends AbstractMojo {

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
     * code root package
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
     * Only generate model structure
     *
     * @parameter
     */
    private Boolean modelOnly = false;


    /**
     * The maven project.
     *
     * @parameter expression="${project}"
     * @required
     * @readonly
     */
    private MavenProject project;

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

    @Override
    public void execute() throws MojoExecutionException {
        if (clearOutput) {
            deleteDirectory(output);
        }
        org.kevoree.tools.ecore.gencode.Generator gen = new org.kevoree.tools.ecore.gencode.Generator(output, scala.Option.apply(packagePrefix));//, getLog());
        gen.generateModel(ecore, project.getVersion());
        if (!modelOnly) {
            gen.generateLoader(ecore);
            gen.generateSerializer(ecore);
        }
        this.project.addCompileSourceRoot(output.getAbsolutePath());
    }
}
