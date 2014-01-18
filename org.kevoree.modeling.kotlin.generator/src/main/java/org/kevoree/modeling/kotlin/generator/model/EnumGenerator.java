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

import org.eclipse.emf.ecore.EEnum;
import org.eclipse.emf.ecore.EEnumLiteral;
import org.eclipse.emf.ecore.EPackage;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 20/03/12
 * Time: 13:31
 * To change this template use File | Settings | File Templates.
 */

public class EnumGenerator {


    public static void generateEnum(GenerationContext ctx, String currentPackageDir, EPackage packElement, EEnum en) {
        String formattedEnumName = en.getName().substring(0, 1).toUpperCase();
        formattedEnumName += en.getName().substring(1);

        File localFile  = null;
        localFile = new File(currentPackageDir + "/" + formattedEnumName + ".kt");

        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");

            String packageName = ProcessorHelper.getInstance().fqn(ctx, packElement);

            //Header
            pr.println("package " + packageName + ";");
            pr.println();
            pr.println();

            pr.println(ProcessorHelper.getInstance().generateHeader(packElement));

            //Class core
            pr.println("enum class " + formattedEnumName + " {");

            for(EEnumLiteral enumLit : en.getELiterals() ) {
                pr.println(enumLit.getName().toUpperCase());
            }
            pr.println("}");

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
