package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelAttributeVisitor;
import org.kevoree.modeling.api.ModelVisitor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by duke on 7/22/14.
 */

public class Selector {



    fun select(root:KObject, query:String)

    :List<KObject>

    {
        var extractedQuery = extractFirstQuery(query)
        var result = ArrayList < KObject > ()
        var tempResult = HashMap < String, KObject>()
        tempResult.put(root.path(), root)
        while (extractedQuery != null) {
            val staticExtractedQuery = extractedQuery !!
                    val clonedRound = tempResult
            tempResult = HashMap < String, KObject > ()
            for (currentRootKey in clonedRound.keySet()) {
                val currentRoot = clonedRound.get(currentRootKey) !!
                        var resolved:
                KObject ? = null
                if (!staticExtractedQuery.oldString.contains("*")) {
                    resolved = currentRoot.findByPath(staticExtractedQuery.oldString)
                }
                if (resolved != null) {
                    tempResult.put(resolved !!.path(), resolved !!)
                } else {
                    var alreadyVisited = HashMap < String, Boolean>()
                    var visitor = object:ModelVisitor() {
                        override fun beginVisitRef(refName:String, refType:String):Boolean {
                            if (staticExtractedQuery.previousIsDeep) {
                                return true;  //we cannot filter here, to early in case of deep
                            } else {
                                if (refName == staticExtractedQuery.relationName) {
                                    return true;
                                } else {
                                    if (staticExtractedQuery.relationName.contains("*")) {
                                        if (refName.matches(staticExtractedQuery.relationName.replace("*", ".*"))) {
                                            return true;
                                        }
                                    }
                                }
                                return false;
                            }
                        }

                        override fun visit(elem:KObject, refNameInParent:String, parent:KObject){
                            if (staticExtractedQuery.previousIsRefDeep) {
                                if (alreadyVisited.containsKey(parent.path() + "/" + refNameInParent + "[" + elem.internalGetKey() + "]")) {
                                    return;
                                }
                            }
                            if (staticExtractedQuery.previousIsDeep && !staticExtractedQuery.previousIsRefDeep) {
                                if (alreadyVisited.containsKey(elem.path())) {
                                    return;
                                }
                            }
                            var selected = true
                            if (staticExtractedQuery.previousIsDeep) {
                                selected = false
                                if (refNameInParent == staticExtractedQuery.relationName) {
                                    selected = true;
                                } else {
                                    if (staticExtractedQuery.relationName.contains("*")) {
                                        if (refNameInParent.matches(staticExtractedQuery.relationName.replace("*", ".*"))) {
                                            selected = true;
                                        }
                                    }
                                }
                            }
                            if (selected) {
                                if (staticExtractedQuery.params.size == 1 && staticExtractedQuery.params.get("@id") != null && staticExtractedQuery.params.get("@id")
                                !!.name == null){
                                    if (elem.internalGetKey() == staticExtractedQuery.params.get("@id") ?.value){
                                        tempResult.put(elem.path(), elem)
                                    }
                                }else{
                                    if (staticExtractedQuery.params.size > 0) {
                                        val subResult = Array < Boolean > (staticExtractedQuery.params.size) {i -> false}
                                        elem.visitAttributes(object:ModelAttributeVisitor {
                                            override fun visit(value:Any ?, name:String, parent:KObject){
                                                for (att in staticExtractedQuery.params.keySet()) {
                                                    if (att == "@id") {
                                                        throw Exception("Malformed KMFQuery, bad selector attribute without attribute name : " + staticExtractedQuery.params.get(att))
                                                    } else {
                                                        var keySelected = false
                                                        if (att == name) {
                                                            keySelected = true
                                                        } else {
                                                            if (att.contains("*") && name.matches(att.replace("*", ".*"))) {
                                                                keySelected = true
                                                            }
                                                        }
                                                        val attvalue = staticExtractedQuery.params.get(att) !!
                                                        //now check value
                                                        if (keySelected) {
                                                            if (value == null) {
                                                                if (attvalue.negative) {
                                                                    if (attvalue.value != "null") {
                                                                        subResult.set(attvalue.idParam, true)
                                                                    }
                                                                } else {
                                                                    if (attvalue.value == "null") {
                                                                        subResult.set(attvalue.idParam, true)
                                                                    }
                                                                }
                                                            } else {
                                                                if (attvalue.negative) {
                                                                    if (!attvalue.value.contains("*") && value != attvalue.value) {
                                                                        subResult.set(attvalue.idParam, true)
                                                                    } else {
                                                                        if (!value.toString().matches(attvalue.value.replace("*", ".*"))) {
                                                                            subResult.set(attvalue.idParam, true)
                                                                        }
                                                                    }
                                                                } else {
                                                                    if (value == attvalue.value) {
                                                                        subResult.set(attvalue.idParam, true)
                                                                    } else {
                                                                        if (value.toString().matches(attvalue.value.replace("*", ".*"))) {
                                                                            subResult.set(attvalue.idParam, true)
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        })
                                        var finalRes = true
                                        //Check final result
                                        for (sub in subResult) {
                                            if (!sub) {
                                                finalRes = false
                                            }
                                        }
                                        if (finalRes) {
                                            tempResult.put(elem.path(), elem)
                                        }
                                    } else {
                                        tempResult.put(elem.path(), elem)
                                    }
                                }
                            }
                            if (staticExtractedQuery.previousIsDeep) {
                                if (staticExtractedQuery.previousIsRefDeep) {
                                    alreadyVisited.put(parent.path() + "/" + refNameInParent + "[" + elem.internalGetKey() + "]", true);
                                    elem.visit(this, false, true, true)
                                } else {
                                    alreadyVisited.put(elem.path(), true);
                                    elem.visit(this, false, true, false)
                                }
                            }
                        }
                    }
                    if (staticExtractedQuery.previousIsDeep) {
                        currentRoot.visit(visitor, false, true, staticExtractedQuery.previousIsRefDeep)
                    } else {
                        currentRoot.visit(visitor, false, true, true)
                    }
                }
            }
            if (staticExtractedQuery.subQuery == null) {
                extractedQuery = null
            } else {
                extractedQuery = extractFirstQuery(staticExtractedQuery.subQuery)
            }
        }
        for (v in tempResult.keySet()) {
            result.add(tempResult.get(v) !!)
        }
        return result
    }

    public KmfQuery extractFirstQuery(String query) {
        if (query.charAt(0) == '/') {
            String subQuery = null;
            if (query.length() > 1) {
                subQuery = query.substring(1);
            }
            HashMap<String, KmfQueryParam> params = new HashMap<String, KmfQueryParam>();
            return new KmfQuery("", params, subQuery, "/", false, false);
        }
        if (query.startsWith("**/")) {
            if (query.length() > 3) {
                KmfQuery next = extractFirstQuery(query.substring(3));
                if (next != null) {
                    next.previousIsDeep = true;
                    next.previousIsRefDeep = false;
                }
                return next;
            } else {
                return null;
            }
        }
        if (query.startsWith("***/")) {
            if (query.length() > 4) {
                KmfQuery next = extractFirstQuery(query.substring(4));
                if (next != null) {
                    next.previousIsDeep = true;
                    next.previousIsRefDeep = true;
                }
                return next;
            } else {
                return null;
            }
        }
        int i = 0;
        int relationNameEnd = 0;
        int attsEnd = 0;
        boolean escaped = false;
        while (i < query.length() && ((query.charAt(i) != '/') || escaped)) {
            if (escaped) {
                escaped = false;
            }
            if (query.charAt(i) == '[') {
                relationNameEnd = i;
            } else {
                if (query.charAt(i) == ']') {
                    attsEnd = i;
                } else {
                    if (query.charAt(i) == '\\') {
                        escaped = true;
                    }
                }
            }
            i = i + 1;
        }

        if (i > 0 && relationNameEnd > 0) {
            String oldString = query.substring(0, i);
            String subQuery = null;
            if (i + 1 < query.length()) {
                subQuery = query.substring(i + 1);
            }
            String relName = query.substring(0, relationNameEnd);
            HashMap<String, KmfQueryParam> params = new HashMap<String, KmfQueryParam>();
            relName = relName.replace("\\", "");
            //parse param
            if (attsEnd != 0) {
                String paramString = query.substring(relationNameEnd + 1, attsEnd);
                int iParam = 0;
                int lastStart = iParam;
                escaped = false;
                while (iParam < paramString.length()) {
                    if (paramString.charAt(iParam) == ',' && !escaped) {
                        String p = paramString.substring(lastStart, iParam).trim();
                        if (p.equals("") && !p.equals("*")) {
                            if (p.endsWith("=")) {
                                p = p + "*";
                            }
                            String[] pArray = p.split("=");
                            KmfQueryParam pObject;
                            if (pArray.length > 1) {
                                String paramKey = pArray[0].trim();
                                boolean negative = paramKey.endsWith("!");
                                pObject = new KmfQueryParam(paramKey.replace("!", ""), pArray[1].trim(), params.size(), negative);
                                params.put(pObject.name, pObject);
                            } else {
                                pObject = new KmfQueryParam(null, p, params.size(), false);
                                params.put("@id", pObject);
                            }
                        }
                        lastStart = iParam + 1;
                    } else {
                        if (paramString.charAt(iParam) == '\\') {
                            escaped = true;
                        } else {
                            escaped = false;
                        }
                    }
                    iParam = iParam + 1;
                }
                String lastParam = paramString.substring(lastStart, iParam).trim();
                if (!lastParam.equals("") && !lastParam.equals("*")) {
                    if (lastParam.endsWith("=")) {
                        lastParam = lastParam + "*";
                    }
                    String[] pArray = lastParam.split("=");
                    KmfQueryParam pObject;
                    if (pArray.length > 1) {
                        String paramKey = pArray[0].trim();
                        boolean negative = paramKey.endsWith("!");
                        pObject = new KmfQueryParam(paramKey.replace("!", ""), pArray[1].trim(), params.size(), negative);
                        params.put(pObject.name, pObject);
                    } else {
                        pObject = new KmfQueryParam(null, lastParam, params.size(), false);
                        params.put("@id", pObject);
                    }
                }
            }
            return new KmfQuery(relName, params, subQuery, oldString, false, false);
        }
        return null;
    }


    private class KmfQueryParam {
        private String name;
        private String value;
        private int idParam;
        private boolean negative;

        private KmfQueryParam(String name, String value, int idParam, boolean negative) {
            this.name = name;
            this.value = value;
            this.idParam = idParam;
            this.negative = negative;
        }

        public String getName() {
            return name;
        }

        public String getValue() {
            return value;
        }

        public int getIdParam() {
            return idParam;
        }

        public boolean isNegative() {
            return negative;
        }
    }

    private class KmfQuery {
        String relationName;
        Map<String, KmfQueryParam> params;
        String subQuery;
        String oldString;
        boolean previousIsDeep;
        boolean previousIsRefDeep;

        private KmfQuery(String relationName, Map<String, KmfQueryParam> params, String subQuery, String oldString, boolean previousIsDeep, boolean previousIsRefDeep) {
            this.relationName = relationName;
            this.params = params;
            this.subQuery = subQuery;
            this.oldString = oldString;
            this.previousIsDeep = previousIsDeep;
            this.previousIsRefDeep = previousIsRefDeep;
        }
    }

}



