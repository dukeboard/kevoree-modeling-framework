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

import org.eclipse.emf.ecore.*;
import org.kevoree.modeling.kotlin.generator.GenerationContext;
import org.kevoree.modeling.kotlin.generator.ProcessorHelper;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.SortedSet;
import java.util.TreeSet;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 14/02/13
 * Time: 10:37
 */
public class APIGenerator {


    private static boolean isAttributeAlreadyInParents(EClass cls, EAttribute currentAtt) {
        for (EAttribute att : cls.getEAllAttributes()) {
            if (att.getName().equals(currentAtt.getName()) && att.getEContainingClass() != cls) {
                return true;
            }
        }
        return false;
    }

    private static boolean isReferenceAlreadyInParents(EClass cls, EReference currentRef) {
        for (EReference ref : cls.getEAllReferences()) {
            if (ref.getName().equals(currentRef.getName()) && ref.getEContainingClass() != cls) {
                return true;
            }
        }
        return false;
    }

    public static void generateAPI(GenerationContext ctx, String currentPackageDir, EPackage packElement, EClass cls, String srcCurrentDir) {

        File localFile = new File(currentPackageDir + File.separator + "api.kt");
        boolean first = !localFile.exists();
        FileOutputStream localFileS = null;
        try {
            localFileS = new FileOutputStream(localFile, true);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        PrintWriter pr = new PrintWriter(localFileS);
        String pack = ProcessorHelper.getInstance().fqn(ctx, packElement);
        if (first) {
            pr.println("package " + pack + "");
            pr.println();
        }
        pr.print("trait " + cls.getName());
        pr.println(ProcessorHelper.getInstance().generateSuperTypes(ctx, cls, packElement) + " {");
        for (EAttribute att : cls.getEAttributes()) {
            if (!isAttributeAlreadyInParents(cls, att)) {
                if (att.isMany()) {
                    pr.println("public open var " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">?");
                    pr.print("public fun with");
                    pr.print(ProcessorHelper.getInstance().protectReservedWords(ProcessorHelper.getInstance().toCamelCase(att)));
                    pr.print("(p : ");
                    pr.println("List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">) : "+cls.getName());
                } else {
                    pr.println("public open var " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + "?");
                    pr.print("public fun with");
                    pr.print(ProcessorHelper.getInstance().protectReservedWords(ProcessorHelper.getInstance().toCamelCase(att)));
                    pr.print("(p : ");
                    pr.println(ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ") : "+cls.getName());
                }
            }
        }
        //Kotlin workaround // Why prop are not generated properly ?
        if (ctx.js && ctx.ecma3compat) {
            for (EAttribute att : ProcessorHelper.getInstance().noduplicate(cls.getEAttributes())) {
                if (!isAttributeAlreadyInParents(cls, att)) {
                    if (att.isMany()) {
                        pr.println("public fun get" + ProcessorHelper.getInstance().toCamelCase(att) + "()" + " : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">");
                        pr.println("public fun set" + ProcessorHelper.getInstance().toCamelCase(att) + "(p" + " : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">)");
                    } else {
                        pr.println("public fun get" + ProcessorHelper.getInstance().toCamelCase(att) + "() : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + "?");
                        pr.println("public fun set" + ProcessorHelper.getInstance().toCamelCase(att) + "(p : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + "?)");
                    }
                }
            }

            for (EReference ref : cls.getEReferences()) {
                if (!isReferenceAlreadyInParents(cls, ref)) {
                    String typeRefName = ProcessorHelper.getInstance().fqn(ctx, ref.getEType());
                    if (ref.isMany()) {
                        pr.println("public fun get" + ProcessorHelper.getInstance().toCamelCase(ref) + "()" + " : List<" + typeRefName + ">");
                        pr.println("public fun set" + ProcessorHelper.getInstance().toCamelCase(ref) + "(p" + " : List<" + typeRefName + ">)");
                    } else {
                        pr.println("public fun get" + ProcessorHelper.getInstance().toCamelCase(ref) + "() : " + typeRefName + "?");
                        pr.println("public fun set" + ProcessorHelper.getInstance().toCamelCase(ref) + "(p : " + typeRefName + "?)");
                    }
                }
            }
        }
        //end kotlin workaround
        for (EReference ref : cls.getEReferences()) {
            if (!isReferenceAlreadyInParents(cls, ref)) {
                String typeRefName = ProcessorHelper.getInstance().fqn(ctx, ref.getEType());
                if (ref.isMany()) {
                    pr.println("open var " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " : List<" + typeRefName + ">");
                    generateAddMethod(pr, cls, ref, typeRefName);
                    generateAddAllMethod(pr, cls, ref, typeRefName);
                    generateRemoveMethod(pr, cls, ref, typeRefName);
                    generateRemoveAllMethod(pr, cls, ref, typeRefName);
                    pr.println("fun find" + ProcessorHelper.getInstance().toCamelCase(ref) + "ByID(key : String) : " + ProcessorHelper.getInstance().protectReservedWords(ProcessorHelper.getInstance().fqn(ctx, ref.getEType())) + "?");


                    SortedSet<String> idRefAttributes = new TreeSet<String>();
                    for (EAttribute att : ref.getEReferenceType().getEAllAttributes()) {
                        if (att.isID() && !att.getName().equals("generated_KMF_ID")) {
                            idRefAttributes.add(att.getName());
                        }
                    }
                    if (idRefAttributes.size() > 1) {
                        boolean first2 = true;
                        StringBuilder builder = new StringBuilder();
                        StringBuilder builder3 = new StringBuilder();
                        for (String att : idRefAttributes) {
                            if (!first2) {
                                builder.append(",");
                            }
                            builder.append(ProcessorHelper.getInstance().protectReservedWords(att) + ":String");
                            String name = att.substring(0,1).toUpperCase()+att.substring(1).toLowerCase();
                            builder3.append(name);
                            first2 = false;
                        }
                        pr.println("fun find" + ProcessorHelper.getInstance().protectReservedWords(ref.getName().substring(0, 1).toUpperCase() + ref.getName().substring(1)) + "By"+builder3+"("+builder+") : " + ProcessorHelper.getInstance().fqn(ctx, ref.getEType()) + "?;");
                    }


                } else {
                    pr.println("open var " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " : " + typeRefName + "?");
                    pr.print("public fun with");
                    pr.print(ProcessorHelper.getInstance().protectReservedWords(ProcessorHelper.getInstance().toCamelCase(ref)));
                    pr.print("(ref : "+typeRefName+")");
                    pr.println(" : "+cls.getName());
                }
            }
        }
    /* Then generated user method */
    /* next we generated custom method */


        ArrayList<EOperation> alreadyGenerated = new ArrayList<EOperation>();

        for (EOperation op : cls.getEAllOperations()) {
            if (!op.getName().equals("eContainer")) {

                boolean alGen = false;
                for (EOperation preOp : alreadyGenerated) {
                    if (matchEOperation(preOp, op)) {
                        alGen = true;
                        break;
                    }
                }

                if (!alGen) {
                    alreadyGenerated.add(op);

                    if (op.getEContainingClass() != cls) {
                        pr.print("override ");
                    }
                    pr.print("fun " + op.getName() + "(");
                    boolean isFirst = true;
                    for (EParameter p : op.getEParameters()) {
                        if (!isFirst) {
                            pr.println(",");
                        }
                        String returnTypeP = ((p.getEType() instanceof EDataType) ?
                                ProcessorHelper.getInstance().convertType(p.getEType().getName()) :
                                ProcessorHelper.getInstance().fqn(ctx, p.getEType()));
                        pr.print(p.getName() + "P :" + returnTypeP);
                        isFirst = false;
                    }
                    if (op.getEType() != null) {

                        String returnTypeOP = ((op.getEType() instanceof EDataType) ?
                                ProcessorHelper.getInstance().convertType(op.getEType().getName()) :
                                ProcessorHelper.getInstance().fqn(ctx, op.getEType()));
                        if (returnTypeOP == null || returnTypeOP.equals("null")) {
                            returnTypeOP = "Unit";
                        }
                        if (op.getLowerBound() == 0) {
                            returnTypeOP = returnTypeOP + "?";
                        }
                        pr.println("):" + returnTypeOP + ";");
                    } else {
                        pr.println("):Unit;");
                    }
                }
            }

        }
        pr.println("}");
        pr.flush();
        pr.close();
    }

    private static boolean matchEOperation(EOperation op1, EOperation op2) {
        if (!op1.getName().equals(op2.getName())) {
            return false;
        }

        //Checks if all parameters of OP1 are included in OP2
        for (EParameter opP : op1.getEParameters()) {
            boolean exists = false;
            for (EParameter op2P : op2.getEParameters()) {
                if (opP.getName().equals(op2P.getName()) && ProcessorHelper.getInstance().fqn(opP.getEType()).equals(ProcessorHelper.getInstance().fqn(op2P.getEType()))) {
                    exists = true;
                }
            }
            if (!exists) {
                return false;
            }
        }

        //Checks if all parameters of OP2 are included in OP1
        for (EParameter opP : op2.getEParameters()) {
            boolean exists = false;
            for (EParameter op2P : op1.getEParameters()) {
                if (opP.getName().equals(op2P.getName()) && ProcessorHelper.getInstance().fqn(opP.getEType()).equals(ProcessorHelper.getInstance().fqn(op2P.getEType()))) {
                    exists = true;
                }
            }
            if (!exists) {
                return false;
            }
        }
        return true;
    }

    private static void generateAddAllMethod(PrintWriter pr, EClass cls, EReference ref, String typeRefName) {
        pr.println("fun addAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " :List<" + typeRefName + ">) : "+cls.getName());
    }

    private static void generateAddMethod(PrintWriter pr, EClass cls, EReference ref, String typeRefName) {
        pr.println("fun add" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " : " + typeRefName + ") : "+cls.getName());
    }

    private static void generateRemoveMethod(PrintWriter pr, EClass cls, EReference ref, String typeRefName) {
        pr.println("fun remove" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " : " + typeRefName + ") : "+cls.getName());
    }

    private static void generateRemoveAllMethod(PrintWriter pr, EClass cls, EReference ref, String typeRefName) {
        pr.println("fun removeAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "() : "+cls.getName());
    }

}
