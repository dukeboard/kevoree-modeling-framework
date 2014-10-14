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


import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.kevoree.modeling.generator.misc.OrderedClassDeclarationLists;
import org.kevoree.modeling.idea.psi.MetaModelClassDeclaration;
import org.kevoree.modeling.idea.psi.MetaModelRelationDeclaration;
import org.kevoree.modeling.idea.psi.MetaModelTypeDeclaration;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

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


    public void consolidateEnumIndexes(HashMap<String, OrderedClassDeclarationLists> enumIndexes) {
        enumIndexes.forEach((clazz,decl)->{if(!decl.consolidated){consolidate(decl,enumIndexes);}});
    }

    private void consolidate(OrderedClassDeclarationLists classRelDecls, HashMap<String, OrderedClassDeclarationLists> enumIndexes) {
        if(!classRelDecls.consolidated){
            classRelDecls.sort();
            classRelDecls.parents.forEach(parent->{
                OrderedClassDeclarationLists parentDecl = enumIndexes.get(parent);
                if(!parentDecl.consolidated) {
                    //TODO: Circularity check and cut
                    consolidate(parentDecl, enumIndexes);
                }
                //TODO: Diamond inheritance check and merge
                classRelDecls.attributes.addAll(0, parentDecl.attributes);
                classRelDecls.relations.addAll(0, parentDecl.relations);
            });
        }
    }


    public String toCamelCase(String ref) {
        return ref.substring(0, 1).toUpperCase() + ref.substring(1);
    }
}