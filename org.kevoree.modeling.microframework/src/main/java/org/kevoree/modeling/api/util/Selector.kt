package org.kevoree.modeling.api.util

import org.kevoree.modeling.api.KMFContainer
import java.util.ArrayList
import java.util.HashMap

/**
 * Created by duke on 7/22/14.
 */

object Selector {

    fun select(root: KMFContainer, query: String): List<KMFContainer> {
        var extractedQuery = extractFirstQuery(query)
        var result = ArrayList<KMFContainer>()
        var tempResult = HashMap<String, KMFContainer>()
        tempResult.put(root.path(), root)
        while (extractedQuery != null) {
            val staticExtractedQuery = extractedQuery!!
            val clonedRound = tempResult
            tempResult = HashMap<String, KMFContainer>()
            for (currentRootKey in clonedRound.keySet()) {
                val currentRoot = clonedRound.get(currentRootKey)!!
                var resolved: KMFContainer? = null
                if (!staticExtractedQuery.oldString.contains("*")) {
                    resolved = currentRoot.findByPath(staticExtractedQuery.oldString)
                }
                if (resolved != null) {
                    tempResult.put(resolved!!.path(), resolved!!)
                } else {
                    var alreadyVisited = HashMap<String, Boolean>()
                    var visitor = object : ModelVisitor() {
                        override fun beginVisitRef(refName: String, refType: String): Boolean {
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

                        override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
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
                                if (staticExtractedQuery.params.size == 1 && staticExtractedQuery.params.get("@id") != null && staticExtractedQuery.params.get("@id")!!.name == null) {
                                    if (elem.internalGetKey() == staticExtractedQuery.params.get("@id")?.value) {
                                        tempResult.put(elem.path(), elem)
                                    }
                                } else {
                                    if (staticExtractedQuery.params.size > 0) {
                                        val subResult = Array<Boolean>(staticExtractedQuery.params.size) { i -> false }
                                        elem.visitAttributes(object : ModelAttributeVisitor {
                                            override fun visit(value: Any?, name: String, parent: KMFContainer) {
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
                                                        val attvalue = staticExtractedQuery.params.get(att)!!
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
            result.add(tempResult.get(v)!!)
        }
        return result
    }

    fun extractFirstQuery(query: String): KmfQuery? {
        if (query.get(0) == '/') {
            var subQuery: String? = null
            if (query.length > 1) {
                subQuery = query.substring(1)
            }
            val params = HashMap<String, KmfQueryParam>()
            return KmfQuery("", params, subQuery, "/", false, false)
        }
        if (query.startsWith("**/")) {
            if (query.length > 3) {
                val next = extractFirstQuery(query.substring(3))
                if (next != null) {
                    next.previousIsDeep = true
                    next.previousIsRefDeep = false
                }
                return next
            } else {
                return null
            }
        }
        if (query.startsWith("***/")) {
            if (query.length > 4) {
                val next = extractFirstQuery(query.substring(4))
                if (next != null) {
                    next.previousIsDeep = true
                    next.previousIsRefDeep = true
                }
                return next
            } else {
                return null
            }
        }
        var i = 0
        var relationNameEnd = 0
        var attsEnd = 0
        var escaped = false
        while (i < query.length && (query.get(i) != '/' || escaped)) {
            if (escaped) {
                escaped = false
            }
            if (query.get(i) == '[') {
                relationNameEnd = i
            } else {
                if (query.get(i) == ']') {
                    attsEnd = i
                } else {
                    if (query.get(i) == '\\') {
                        escaped = true
                    }
                }
            }
            i = i + 1
        }

        if (i > 0 && relationNameEnd > 0) {
            val oldString = query.substring(0, i)
            var subQuery: String? = null
            if (i + 1 < query.length) {
                subQuery = query.substring(i + 1)
            }
            var relName = query.substring(0, relationNameEnd)
            val params = HashMap<String, KmfQueryParam>()
            relName = relName.replace("\\", "")
            //parse param
            if (attsEnd != 0) {
                val paramString = query.substring(relationNameEnd + 1, attsEnd)
                var iParam = 0
                var lastStart = iParam
                escaped = false
                while (iParam < paramString.length) {
                    if (paramString.get(iParam) == ',' && !escaped) {
                        var p = paramString.substring(lastStart, iParam).trim()
                        if (p != "" && p != "*") {
                            if (p.endsWith("=")) {
                                p = p + "*"
                            }
                            var pArray = p.split("=")
                            var pObject: KmfQueryParam
                            if (pArray.size > 1) {
                                val paramKey = pArray.get(0).trim()
                                val negative = paramKey.endsWith("!")
                                pObject = KmfQueryParam(paramKey.replace("!", ""), pArray.get(1).trim(), params.size, negative)
                                params.put(pObject.name!!, pObject)
                            } else {
                                pObject = KmfQueryParam(null, p, params.size, false)
                                params.put("@id", pObject)
                            }
                        }
                        lastStart = iParam + 1
                    } else {
                        if (paramString.get(iParam) == '\\') {
                            escaped = true
                        } else {
                            escaped = false
                        }
                    }
                    iParam = iParam + 1
                }
                var lastParam = paramString.substring(lastStart, iParam).trim()
                if (lastParam != "" && lastParam != "*") {
                    if (lastParam.endsWith("=")) {
                        lastParam = lastParam + "*"
                    }
                    var pArray = lastParam.split("=")
                    var pObject: KmfQueryParam
                    if (pArray.size > 1) {
                        val paramKey = pArray.get(0).trim()
                        val negative = paramKey.endsWith("!")
                        pObject = KmfQueryParam(paramKey.replace("!", ""), pArray.get(1).trim(), params.size, negative)
                        params.put(pObject.name!!, pObject)
                    } else {
                        pObject = KmfQueryParam(null, lastParam, params.size, false)
                        params.put("@id", pObject)
                    }
                }
            }
            return KmfQuery(relName, params, subQuery, oldString, false, false)
        }
        return null
    }

}

data class KmfQuery(val relationName: String, val params: Map<String, KmfQueryParam>, val subQuery: String?, val oldString: String, var previousIsDeep: Boolean, var previousIsRefDeep: Boolean)

data class KmfQueryParam(val name: String?, val value: String, val idParam: Int, val negative: Boolean)

