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
///**
// * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
// * you may not use this file except in compliance with the License.
// * You may obtain a copy of the License at
// *
// * 	http://www.gnu.org/licenses/lgpl-3.0.txt
// *
// * Unless required by applicable law or agreed to in writing, software
// * distributed under the License is distributed on an "AS IS" BASIS,
// * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// * See the License for the specific language governing permissions and
// * limitations under the License.
// *
// * Authors:
// * 	Fouquet Francois
// * 	Nain Gregory
// */
//
//
///*
// * To change this template, choose Tools | Templates
// * and open the template in the editor.
// */
//package org.kevoree.extra.ecore.gencode.mavenplugin;
//
//import org.apache.maven.plugin.AbstractMojo;
//import org.apache.maven.plugin.MojoExecutionException;
//
//import java.io.File;
//
///**
// *
// * @goal loader
// * @phase generate-sources
// * @requiresDependencyResolution compile
// * @author <a href="mailto:ffouquet@irisa.fr">Fouquet François</a>
// * @version $Id$
// */
//public class GenLoaderPlugin extends AbstractMojo {
//
//    /**
//     * Ecore file
//     *
//     * @parameter
//     */
//    private File ecore;
//    /**
//     * Source base directory
//     *
//     * @parameter default-value="${project.build.directory}/generated-sources/kmf"
//     */
//    private File output;
//
//  /**
//     * code containerRoot package
//     *
//     * @parameter
//     */
//    private String rootPackage;
//
//
//    /**
//     * Clear output dir
//     *
//     * @parameter
//     */
//    private Boolean clearOutput=true;
//
//   private boolean deleteDirectory(File path) {
//        if (path.exists()) {
//            File[] files = path.listFiles();
//            for (int i = 0; i < files.length; i++) {
//                if (files[i].isDirectory()) {
//                    deleteDirectory(files[i]);
//                } else {
//                    files[i].delete();
//                }
//            }
//        }
//        return (path.delete());
//    }
//
//    @Override
//    public void execute() throws MojoExecutionException {
//        //File ecoreFile = new File(getClass().getResource("/kevoree.ecore").getPath());
//
//
//        if(clearOutput) {
//            deleteDirectory(output);
//        }
//
//        org.kevoree.tools.ecore.gencode.Generator gen = new org.kevoree.tools.ecore.gencode.Generator(output,rootPackage);//, getLog());
//        gen.generateLoader(ecore);
//
//        //Util.createGenModel(ecore, genmodel, output, getLog(),clearOutput);
//    }
//}
