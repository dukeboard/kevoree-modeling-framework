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
package org.kevoree.modeling.kotlin.generator;

import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EReference;

import java.io.PrintWriter;
import java.util.*;


/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/02/13
 * Time: 19:09
 */
public class KMFQLFinder {

    public static void generateKMFQLMethods(PrintWriter pr, EClass cls, GenerationContext ctx, String pack) {
        pr.println("override fun internalGetKey() : String? {");
        pr.println("if(key_cache != null){");
        pr.println("return key_cache");
        pr.println("} else {");
        boolean first = true;
        pr.print("key_cache = ");
        SortedMap<String, EAttribute> idAttributes = new TreeMap<String, EAttribute>();
        for (EAttribute att : cls.getEAllAttributes()) {
            if (att.isID() && !att.getName().equals("generated_KMF_ID")) {
                idAttributes.put(att.getName(), att);
            }
        }
        if (idAttributes.size() > 0) {
            pr.print("\"");
            if (idAttributes.size() == 1) {

                String attributeType = ProcessorHelper.getInstance().convertType(idAttributes.get(idAttributes.firstKey()).getEAttributeType().getInstanceClassName());
                if(attributeType.equals("String") || attributeType.equals("Char")) {
                    pr.print("${org.kevoree.modeling.api.util.KevURLEncoder.encode(" + ProcessorHelper.getInstance().protectReservedWords(idAttributes.firstKey()) + ")}");
                } else {
                    pr.print("${" + ProcessorHelper.getInstance().protectReservedWords(idAttributes.firstKey()) + "}");
                }
            } else {
                for (Map.Entry<String, EAttribute> att : idAttributes.entrySet()) {
                    if (!first) {
                        pr.print(",");
                    }
                    String attributeType = ProcessorHelper.getInstance().convertType(att.getValue().getEAttributeType().getInstanceClassName());
                    if(attributeType.equals("String") || attributeType.equals("Char")) {
                        pr.print(att.getKey() + "=${org.kevoree.modeling.api.util.KevURLEncoder.encode(" + ProcessorHelper.getInstance().protectReservedWords(att.getKey()) + ")}");
                    } else {
                        pr.print(att.getKey() + "=${" + ProcessorHelper.getInstance().protectReservedWords(att.getKey()) + "}");
                    }
                    first = false;
                }
            }
            pr.print("\"");
        } else {
            pr.print(" generated_KMF_ID");
        }
        pr.println();
        pr.println("}");
        pr.println("return key_cache");
        pr.println("}");
        //GENERATE findByID methods
        for (EReference ref : cls.getEAllReferences()) {
            if (ref.isMany()) {

                //Check if multiple Key
                SortedSet<String> idRefAttributes = new TreeSet<String>();
                for (EAttribute att : ref.getEReferenceType().getEAllAttributes()) {
                    if (att.isID() && !att.getName().equals("generated_KMF_ID")) {
                        idRefAttributes.add(att.getName());
                    }
                }
                if (idRefAttributes.size() > 1) {
                    boolean first2 = true;
                    StringBuilder builder = new StringBuilder();
                    StringBuilder builder2 = new StringBuilder();
                    StringBuilder builder3 = new StringBuilder();
                    for (String att : idRefAttributes) {
                        if (!first2) {
                            builder.append(",");
                            builder2.append(",");
                        }
                        builder.append(ProcessorHelper.getInstance().protectReservedWords(att) + ":String");
                        builder2.append(att + "=$" + ProcessorHelper.getInstance().protectReservedWords(att));
                        String name = att.substring(0, 1).toUpperCase() + att.substring(1).toLowerCase();
                        builder3.append(name);
                        first2 = false;
                    }
                    pr.println("override fun find" + ProcessorHelper.getInstance().protectReservedWords(ref.getName().substring(0, 1).toUpperCase() + ref.getName().substring(1)) + "By" + builder3 + "(" + builder + ") : " + ProcessorHelper.getInstance().fqn(ctx, ref.getEType()) + "? {");
                    pr.println("return find" + ProcessorHelper.getInstance().protectReservedWords(ref.getName().substring(0, 1).toUpperCase() + ref.getName().substring(1)) + "ByID(\"" + builder2 + "\")");
                    pr.println("}");
                }


                pr.println("override fun find" + ProcessorHelper.getInstance().protectReservedWords(ref.getName().substring(0, 1).toUpperCase() + ref.getName().substring(1)) + "ByID(key : String) : " + ProcessorHelper.getInstance().fqn(ctx, ref.getEType()) + "? {");
                if (ctx.persistence) {
                    if (ref.isContainment()) {
                        pr.println("val resolved = _" + ref.getName() + ".get(key)");
                        pr.println("if(resolved==null){");
                        //pr.println("val originFactory = (this as org.kevoree.modeling.api.persistence.KObjectProxy).originFactory!!");
                        pr.println("val result = relativeLookupFrom(this," + ctx.basePackageForUtilitiesGeneration + ".util.Constants.Ref_" + ref.getName() + ",key)");
                        pr.println("return result as? " + ProcessorHelper.getInstance().fqn(ctx, ref.getEType()));
                        pr.println("} else {");
                        pr.println("return resolved");
                        pr.println("}");
                    } else {
                        pr.println("checkLazyLoad()");
                        pr.println("return " + "_" + ref.getName() + ".get(key)");
                    }
                } else {
                    pr.println("return " + "_" + ref.getName() + ".get(key)");
                }
                pr.println("}");
            }
        }
        generateFindByPathMethods(ctx, cls, pr);
    }

    public static void generateFindByPathMethods(GenerationContext ctx, EClass cls, PrintWriter pr) {
        pr.print("override fun findByID(relationName:String,idP : String) : org.kevoree.modeling.api.KObject? {");
        pr.println("when(relationName) {");
        for (EReference ref : cls.getEAllReferences()) {
            if (ref.isMany()) {
                pr.println(ctx.basePackageForUtilitiesGeneration + ".util.Constants.Ref_" + ref.getName() + " -> {");
                pr.println("return find" + ProcessorHelper.getInstance().protectReservedWords(ref.getName().substring(0, 1).toUpperCase() + ref.getName().substring(1)) + "ByID(idP)}");
            }
            if (ref.getUpperBound() == 1) {
                pr.println(ctx.basePackageForUtilitiesGeneration + ".util.Constants.Ref_" + ref.getName() + " -> {");
                pr.println("val objFound = " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()));
                pr.println("if(objFound!=null && objFound.internalGetKey() == idP){");
                pr.println("return objFound");
                pr.println("}else{return null}");
                pr.println("}");
            }
        }
        pr.println("else -> {return null}");
        pr.println("}");
        pr.println("}");
    }


}
