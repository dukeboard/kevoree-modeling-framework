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
package org.kevoree.modeling.generator;

import org.kevoree.modeling.ast.MModelClass;
import org.kevoree.modeling.idea.psi.MetaModelTypeDeclaration;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 22/09/11
 * Time: 09:49
 */

public class ProcessorHelper {

    private static ProcessorHelper INSTANCE = new ProcessorHelper();

    public static ProcessorHelper getInstance() {
        return INSTANCE;
    }

    public void checkOrCreateFolder(String path) {
        File file = new File(path);
        if (!file.exists()) file.mkdirs();
    }

    public boolean isPrimitive(MetaModelTypeDeclaration tDecl) {
        switch(tDecl.getName()) {
            case "String":case "Int":return true;
            default:return false;
        }
    }


    public void consolidateEnumIndexes(HashMap<String, MModelClass> enumIndexes) {
        ArrayList<MModelClass> consolidated = new ArrayList<>();
        enumIndexes.forEach((clazz,decl)->{if(!consolidated.contains(decl)){consolidate(decl,enumIndexes, consolidated);}});
    }

    private void consolidate(MModelClass classRelDecls, HashMap<String, MModelClass> enumIndexes, ArrayList<MModelClass> consolidated) {
        if(!consolidated.contains(classRelDecls)){
            classRelDecls.sortAttributes();
            classRelDecls.sortReferences();
            classRelDecls.getParents().forEach(parent->{
                MModelClass parentDecl = enumIndexes.get(parent);
                if(!consolidated.contains(classRelDecls)) {
                    //TODO: Circularity check and cut
                    consolidate(parentDecl, enumIndexes, consolidated);
                }
                //TODO: Diamond inheritance check and merge
                classRelDecls.getAttributes().addAll(0, parentDecl.getAttributes());
                classRelDecls.getReferences().addAll(0, parentDecl.getReferences());
            });
        }
    }


    public String toCamelCase(String ref) {
        return ref.substring(0, 1).toUpperCase() + ref.substring(1);
    }
}