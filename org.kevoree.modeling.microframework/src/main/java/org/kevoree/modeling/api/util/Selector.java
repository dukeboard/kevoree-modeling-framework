package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelAttributeVisitor;
import org.kevoree.modeling.api.ModelVisitor;

import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by duke on 7/22/14.
 */

public class Selector {

    private class SelectorContext {

        public Callback<List<KObject>> successCallback;
        public Callback<Throwable> error;

        public KmfQuery staticExtractedQuery;
        public HashMap<String, Boolean> alreadyVisited;
        public HashMap<String, KObject> tempResult;
        public boolean[] subResult;
        public ArrayList<KObject> result;

    }


    private class SelectorModelVisitor extends ModelVisitor {

        private SelectorContext context;

        public SelectorModelVisitor(SelectorContext context) {
            this.context = context;
        }

        @Override
        public boolean beginVisitRef(String refName, String refType) {
            if (context.staticExtractedQuery.previousIsDeep) {
                return true;  //we cannot filter here, to early in case of deep
            } else {
                if (refName.equals(context.staticExtractedQuery.relationName)) {
                    return true;
                } else {
                    if (context.staticExtractedQuery.relationName.contains("*")) {
                        if (refName.matches(context.staticExtractedQuery.relationName.replace("*", ".*"))) {
                            return true;
                        }
                    }
                }
                return false;
            }
        }


        @Override
        public void visit(KObject elem, String refNameInParent, KObject parent) {
            if (context.staticExtractedQuery.previousIsRefDeep) {
                if (alreadyVisited.containsKey(parent.path() + "/" + refNameInParent + "[" + elem.key() + "]")) {
                    return;
                }
            }
            if (context.staticExtractedQuery.previousIsDeep && !context.staticExtractedQuery.previousIsRefDeep) {
                if (alreadyVisited.containsKey(elem.path())) {
                    return;
                }
            }
            boolean selected = true;
            if (context.staticExtractedQuery.previousIsDeep) {
                selected = false;
                if (refNameInParent.equals(context.staticExtractedQuery.relationName)) {
                    selected = true;
                } else {
                    if (context.staticExtractedQuery.relationName.contains("*")) {
                        if (refNameInParent.matches(context.staticExtractedQuery.relationName.replace("*", ".*"))) {
                            selected = true;
                        }
                    }
                }
            }
            if (selected) {
                if (context.staticExtractedQuery.params.size() == 1 && context.staticExtractedQuery.params.get("@id") != null && context.staticExtractedQuery.params.get("@id").name == null){
                    if (context.staticExtractedQuery.params.get("@id") != null && elem.key().equals(context.staticExtractedQuery.params.get("@id").value)){
                        context.tempResult.put(elem.path(), elem);
                    }
                }else{
                    if (context.staticExtractedQuery.params.size() > 0) {
                        boolean[] subResult = new boolean[context.staticExtractedQuery.params.size()];
                        Arrays.fill(subResult, false);
                        context.subResult = subResult;

                        elem.visitAttributes(new SelectorModelAttributeVisitor(context));
                        boolean finalRes = true;
                        //Check final result
                        for (boolean sub : subResult) {
                            if (!sub) {
                                finalRes = false;
                            }
                        }
                        if (finalRes) {
                            context.tempResult.put(elem.path(), elem);
                        }
                    } else {
                        context.tempResult.put(elem.path(), elem);
                    }
                }
            }
            if (context.staticExtractedQuery.previousIsDeep) {
                if (context.staticExtractedQuery.previousIsRefDeep) {
                    context.alreadyVisited.put(parent.path() + "/" + refNameInParent + "[" + elem.key() + "]", true);
                    elem.visitAll(this, new Callback<Throwable>() {
                        public void on(Throwable throwable) {
                            //TODO: Something
                        }
                    });
                    //elem.visit(this, false, true, true);
                } else {
                    context.alreadyVisited.put(elem.path(), true);
                    elem.visitContained(this, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            //TODO: Something
                        }
                    });
                    //elem.visit(this, false, true, false);
                }
            }
        }
    }

    private class SelectorModelAttributeVisitor implements ModelAttributeVisitor {

        private SelectorContext context;

        public SelectorModelAttributeVisitor(SelectorContext context) {
            this.context = context;
        }

        public void visit(String name, Object value) {
            for (String att : context.staticExtractedQuery.params.keySet()) {
                if ("@id".equals(att)) {
                    throw new RuntimeException("Malformed KMFQuery, bad selector attribute without attribute name : " + context.staticExtractedQuery.params.get(att));
                } else {
                    boolean keySelected = false;
                    if (att.equals(name)) {
                        keySelected = true;
                    } else {
                        if (att.contains("*") && name.matches(att.replace("*", ".*"))) {
                            keySelected = true;
                        }
                    }
                    KmfQueryParam attvalue = context.staticExtractedQuery.params.get(att);
                    //now check value
                    if (keySelected) {
                        if (value == null) {
                            if (attvalue.value.equals("null")) {
                                context.subResult[attvalue.idParam] = true;
                            }
                                /*
                                if (attvalue.negative) {
                                } else {
                                    if (attvalue.value == "null") {
                                        subResult.set(attvalue.idParam, true);
                                    }
                                }
                                */
                        } else {
                            if (attvalue.negative) {
                                if (!attvalue.value.contains("*") && value != attvalue.value) {
                                    context.subResult[attvalue.idParam] = true;
                                } else {
                                    if (!value.toString().matches(attvalue.value.replace("*", ".*"))) {
                                        context.subResult[attvalue.idParam] = true;
                                    }
                                }
                            } else {
                                if (value == attvalue.value) {
                                    context.subResult[attvalue.idParam] = true;
                                } else {
                                    if (value.toString().matches(attvalue.value.replace("*", ".*"))) {
                                        context.subResult[attvalue.idParam] = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    private ExecutorService executor = Executors.newCachedThreadPool();


    public void select(KObject root, String query, Callback<List<KObject>> success, Callback<Throwable> error) {
        executor.submit(()-> {
            SelectorContext context = new SelectorContext();
            context.error = error;
            context.successCallback = success;
            context.tempResult = new HashMap<>();
            context.result = new ArrayList<>();
            context.tempResult.put(root.path(), root);

            try {
                List<KmfQuery> queryPieces = new ArrayList<>();
                KmfQuery extractedQuery = extractFirstQuery(query);
                while (extractedQuery != null) {
                    queryPieces.add(extractedQuery);
                    extractedQuery = extractFirstQuery(extractedQuery.subQuery);
                }

                Helper.forall(queryPieces, (kmfQuery, next) -> {

                    KmfQuery staticExtractedQuery = kmfQuery;
                    HashMap<String, KObject> clonedRound = context.tempResult;
                    context.tempResult = new HashMap<>();

                    Helper.forall(new ArrayList<>(clonedRound.keySet()), (currentRootKey, next1) -> {
                        KObject currentRoot = clonedRound.get(currentRootKey);
                        if (!staticExtractedQuery.oldString.contains("*")) {
                            currentRoot.factory().lookup(staticExtractedQuery.oldString, resolved -> {
                                if (resolved != null) {
                                    context.tempResult.put(resolved.path(), resolved);
                                } else {
                                    ModelVisitor visitor = new SelectorModelVisitor(context);
                                    if (staticExtractedQuery.previousIsDeep) {
                                        if(staticExtractedQuery.previousIsRefDeep) {
                                            currentRoot.visitAll(visitor, next1);
                                        } else {
                                            currentRoot.visitContained(visitor, next1);
                                        }
                                    } else {
                                        currentRoot.visitAll(visitor, next1);
                                    }
                                }
                            });
                        }
                    }, next);
                }, (thowable)->{
                    if(thowable == null) {
                        context.result.addAll(context.tempResult.values());
                        context.successCallback.on(context.result);
                    } else {
                        context.error.on(thowable);
                    }
                });

            } catch(Throwable t) {
                context.error.on(t);
            }
        });
    }

    public KmfQuery extractFirstQuery(String query) {
        if(query == null) {return null;}
        if (query.charAt(0) == '/') {
            String subQuery = null;
            if (query.length() > 1) {
                subQuery = query.substring(1);
            }
            HashMap<String, KmfQueryParam> params = new HashMap<>();
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



