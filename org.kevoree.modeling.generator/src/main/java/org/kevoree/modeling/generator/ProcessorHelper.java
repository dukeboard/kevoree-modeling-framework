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

import org.kevoree.modeling.ast.MModelAttribute;
import org.kevoree.modeling.ast.MModelClass;
import org.kevoree.modeling.ast.MModelClassifier;
import org.kevoree.modeling.ast.MModelReference;
import org.kevoree.modeling.idea.psi.MetaModelTypeDeclaration;
import org.kevoree.modeling.util.PrimitiveTypes;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.FileAttribute;
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

    public void checkOrCreateFolder(Path path) {
        try {
            Files.createDirectories(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        //if (!file.exists()) file.mkdirs();
    }

    public boolean isPrimitive(MetaModelTypeDeclaration tDecl) {
        return PrimitiveTypes.isPrimitive(tDecl.getName());
    }


    public void consolidateEnumIndexes(HashMap<String, MModelClassifier> enumIndexes) {
        ArrayList<MModelClassifier> consolidated = new ArrayList<>();
        enumIndexes.forEach((clazz,decl)->{
            if(decl == null) {
                throw new NullPointerException("Classifier Null for FQN:" + clazz);
            }
            if(!consolidated.contains(decl)){
                consolidate(decl, consolidated);
            }
        });
    }

    private void consolidate(MModelClassifier classifierRelDecls, ArrayList<MModelClassifier> consolidated) {
        if(!consolidated.contains(classifierRelDecls)){
            if(classifierRelDecls instanceof MModelClass) {
                MModelClass classRelDecls = (MModelClass) classifierRelDecls;
                classRelDecls.sortAttributes();
                classRelDecls.sortReferences();

                ArrayList<MModelAttribute> parentsAttributes = new ArrayList<>();
                ArrayList<MModelReference> parentsReferences = new ArrayList<>();

                classRelDecls.getParents().forEach(parent -> {
                    if (!consolidated.contains(classRelDecls)) {
                        //TODO: Circularity check and cut
                        consolidate(parent, consolidated);
                    }
                    //TODO: Diamond inheritance check and merge
                    parent.getAttributes().forEach(parentAttribute-> {
                        if(!parentsAttributes.contains(parentAttribute)){
                            parentsAttributes.add(parentAttribute);
                        }
                    });

                    parent.getReferences().forEach(parentReference-> {
                        if(!parentsReferences.contains(parentReference)){
                            parentsReferences.add(parentReference);
                        }
                    });

                });
                classRelDecls.getAttributes().addAll(0, parentsAttributes);
                classRelDecls.getReferences().addAll(0, parentsReferences);
            } else {
                throw new UnsupportedOperationException("Enums not yet supported:" + classifierRelDecls.getClass());
            }
            consolidated.add(classifierRelDecls);
        }
    }


    public String toCamelCase(String ref) {
        return ref.substring(0, 1).toUpperCase() + ref.substring(1);
    }
}