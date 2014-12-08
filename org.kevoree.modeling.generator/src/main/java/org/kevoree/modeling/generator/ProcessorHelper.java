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

import org.kevoree.modeling.ast.*;
import org.kevoree.modeling.idea.psi.MetaModelTypeDeclaration;
import org.kevoree.modeling.util.PrimitiveTypes;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 22/09/11
 * Time: 09:49
 */

public class ProcessorHelper {

    public boolean isNull(Object o) {
        return o == null;
    }

    private static ProcessorHelper INSTANCE = null;

    public static ProcessorHelper getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new ProcessorHelper();
        }
        return INSTANCE;
    }

    public void checkOrCreateFolder(Path path) {
        try {
            Files.createDirectories(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public boolean isPrimitive(MetaModelTypeDeclaration tDecl) {
        return PrimitiveTypes.isPrimitive(tDecl.getName());
    }

    public String convertToJavaType(String t) {
        return PrimitiveTypes.toEcoreType(t);
    }

    public void consolidate(MModel model) {
        ArrayList<MModelClassifier> consolidated = new ArrayList<>();
        for (MModelClassifier decl : model.getClassifiers()) {
            if (!consolidated.contains(decl)) {
                internal_consolidate(decl, consolidated);
            }
        }
    }

    private void internal_consolidate(MModelClassifier classifierRelDecls, ArrayList<MModelClassifier> consolidated) {
        if (!consolidated.contains(classifierRelDecls)) {
            if (classifierRelDecls instanceof MModelClass) {
                MModelClass classRelDecls = (MModelClass) classifierRelDecls;
                classifierRelDecls.setIndex(consolidated.size());
                ArrayList<MModelAttribute> parentsAttributes = new ArrayList<>();
                ArrayList<MModelReference> parentsReferences = new ArrayList<>();
                ArrayList<MModelOperation> parentsOperations = new ArrayList<>();
                classRelDecls.getParents().forEach(parent -> {
                    parent.getAttributes().forEach(parentAttribute -> {
                        if (!parentsAttributes.contains(parentAttribute)) {
                            parentsAttributes.add(parentAttribute);
                        }
                    });
                    parent.getReferences().forEach(parentReference -> {
                        if (!parentsReferences.contains(parentReference)) {
                            parentsReferences.add(parentReference);
                        }
                    });
                    parent.getOperations().forEach(parentOperation -> {
                        if (!parentsOperations.contains(parentOperation)) {
                            parentsOperations.add(parentOperation);
                        }
                    });
                });
                classRelDecls.getAttributes().addAll(0, parentsAttributes);
                classRelDecls.getReferences().addAll(0, parentsReferences);
                classRelDecls.getOperations().addAll(0, parentsOperations);
                int globalIndex = 0;
                for (int i = 0; i < classRelDecls.getAttributes().size(); i++) {
                    classRelDecls.getAttributes().get(i).setIndex(globalIndex);
                    classRelDecls.getAttributes().get(i).setAttIndex(i);
                    globalIndex++;
                }
                for (int i = 0; i < classRelDecls.getReferences().size(); i++) {
                    classRelDecls.getReferences().get(i).setIndex(globalIndex);
                    classRelDecls.getReferences().get(i).setRefIndex(i);
                    globalIndex++;
                }
                for (int i = 0; i < classRelDecls.getOperations().size(); i++) {
                    classRelDecls.getOperations().get(i).setIndex(globalIndex);
                    classRelDecls.getOperations().get(i).setOpIndex(i);
                    globalIndex++;
                }
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