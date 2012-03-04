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


package org.kevoree.extra.ecore.gencode;

import org.junit.Test;
import org.kevoree.tools.ecore.gencode.Generator;
import org.kevoree.tools.ecore.gencode.serializer.SerializerGenerator;

import java.io.File;

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 21/09/11
 * Time: 23:04
 */
public class GenerateCodeTest {

    File rootDir = new File("target/generated-sources/kevoree");

    @Test
    public void generate() {
        File rootDir = new File("target/generated-sources/kevoree");
        //File rootDir = new File("../org.kevoree.extra.ecore.loader.test/src/main/scala/");

        String rootPackage = "org";
        File ecoreFile = new File(getClass().getResource("/kevoree.ecore").getPath());
        Generator gen = new Generator(rootDir, rootPackage);
        gen.generateModel(ecoreFile,"1.4.0");

    }

    @Test
    public void generateLoader() {
       // File rootDir = new File("../org.kevoree.extra.ecore.loader.test/src/main/scala/");

        String rootPackage = "org";
        File ecoreFile = new File(getClass().getResource("/kevoree.ecore").getPath());
        Generator gen = new Generator(rootDir, rootPackage);
        gen.generateLoader(ecoreFile);

    }

    @Test
    public void generateSerializer() {
        //File rootDir = new File("../org.kevoree.extra.ecore.loader.test/src/main/scala/");
        String rootPackage = "org";
        File ecoreFile = new File(getClass().getResource("/kevoree.ecore").getPath());
        Generator gen = new Generator(rootDir, rootPackage);
        gen.generateSerializer(ecoreFile);

    }
/*
    @Test
    public void generateCloner() {
        File rootDir = new File("../org.kevoree.extra.ecore.loader.test/src/main/scala/");
        String rootPackage = "org";
        File ecoreFile = new File(getClass().getResource("/kevoree.ecore").getPath());
        Generator gen = new Generator(rootDir, rootPackage);
        gen.generateCloner(ecoreFile);

    }*/

}
