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
package org.kevoree.modeling.kotlin.generator.test;/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 28/03/13
* (c) 2013 University of Luxembourg – Interdisciplinary Centre for Security Reliability and Trust (SnT)
* All rights reserved
*/

import org.junit.Test;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import scala.Option;

import java.io.File;

import static org.junit.Assert.assertTrue;

public class GenerationContextTest {

   @Test
    public void getBaseLocationForUtilitiesGenerationTest() {

        GenerationContext ctx = new GenerationContext();
        ctx.setRootGenerationDirectory(new File("/tmp/testGenDir"));
       ctx.setPackagePrefix(Option.apply("org"));
        String kevoreeUtilitiesGenDir = ctx.getBaseLocationForUtilitiesGeneration(new File("/Users/gregory.nain/Sources/kevoree/kevoree-core/org.kevoree.model/metamodel/kevoree.ecore")).getAbsolutePath();
        assertTrue("KevoreeUtilitiesGenDir: " + kevoreeUtilitiesGenDir, kevoreeUtilitiesGenDir.equals("/tmp/testGenDir/org/kevoree"));
        String kevoreeUtilitiesGenDir2 = ctx.getBaseLocationForUtilitiesGeneration(new File("/Users/gregory.nain/Sources/kevoree/kevoree-core/org.kevoree.model/metamodel/kevoree.ecore")).getAbsolutePath();
        assertTrue("KevoreeUtilitiesGenDir2: " + kevoreeUtilitiesGenDir2, kevoreeUtilitiesGenDir.equals(kevoreeUtilitiesGenDir2));

        GenerationContext ctx2 = new GenerationContext();
        ctx2.setRootGenerationDirectory(new File("/tmp/testGenDir"));
        String kermetaUtilitiesGenDir = ctx2.getBaseLocationForUtilitiesGeneration(new File("/Users/gregory.nain/Sources/kevoree-modeling-framework/samples/org.kevoree.modeling.sample.kermeta/metamodel/kermeta.ecore")).getAbsolutePath();
        assertTrue("KevoreeUtilitiesGenDir: " + kermetaUtilitiesGenDir, kermetaUtilitiesGenDir.equals("/tmp/testGenDir/org/kermeta/language"));
        String kermetaUtilitiesGenDir2 = ctx2.getBaseLocationForUtilitiesGeneration(new File("/Users/gregory.nain/Sources/kevoree-modeling-framework/samples/org.kevoree.modeling.sample.kermeta/metamodel/kermeta.ecore")).getAbsolutePath();
        assertTrue("KevoreeUtilitiesGenDir2: " + kermetaUtilitiesGenDir2, kermetaUtilitiesGenDir.equals(kermetaUtilitiesGenDir2));

        GenerationContext ctx3 = new GenerationContext();
        ctx3.setRootGenerationDirectory(new File("/tmp/testGenDir"));
       ctx3.setPackagePrefix(Option.apply("org.kevoree.modeling.sample.grabats"));
        String grabatsUtilitiesGenDir = ctx3.getBaseLocationForUtilitiesGeneration(new File("/Users/gregory.nain/Sources/kevoree-modeling-framework/samples/org.kevoree.modeling.sample.grabats/metamodel/jdtast.ecore")).getAbsolutePath();
        assertTrue("KevoreeUtilitiesGenDir: " + grabatsUtilitiesGenDir, grabatsUtilitiesGenDir.equals("/tmp/testGenDir/org/kevoree/modeling/sample/grabats"));
        String grabatsUtilitiesGenDir2 = ctx3.getBaseLocationForUtilitiesGeneration(new File("/Users/gregory.nain/Sources/kevoree-modeling-framework/samples/org.kevoree.modeling.sample.grabats/metamodel/jdtast.ecore")).getAbsolutePath();
        assertTrue("KevoreeUtilitiesGenDir2: " + grabatsUtilitiesGenDir2, grabatsUtilitiesGenDir.equals(grabatsUtilitiesGenDir2));


    }



}
