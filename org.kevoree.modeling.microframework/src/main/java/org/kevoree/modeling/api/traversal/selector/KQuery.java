package org.kevoree.modeling.api.traversal.selector;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by duke on 10/24/14.
 */
public class KQuery {

    public static char OPEN_BRACKET = '[';
    public static char CLOSE_BRACKET = ']';
    public static char QUERY_SEP = '/';

    String relationName;
    Map<String, KQueryParam> params;
    String subQuery;
    String oldString;
    boolean previousIsDeep;
    boolean previousIsRefDeep;

    private KQuery(String relationName, Map<String, KQueryParam> params, String subQuery, String oldString, boolean previousIsDeep, boolean previousIsRefDeep) {
        this.relationName = relationName;
        this.params = params;
        this.subQuery = subQuery;
        this.oldString = oldString;
        this.previousIsDeep = previousIsDeep;
        this.previousIsRefDeep = previousIsRefDeep;
    }

    public static KQuery extractFirstQuery(String query) {
        if (query == null || query.length() == 0) {
            return null;
        }
        if (query.charAt(0) == QUERY_SEP) {
            String subQuery = null;
            if (query.length() > 1) {
                subQuery = query.substring(1);
            }
            Map<String, KQueryParam> params = new HashMap<String, KQueryParam>();
            return new KQuery("", params, subQuery, "" + QUERY_SEP, false, false);
        }
        if (query.startsWith("**/")) {
            if (query.length() > 3) {
                KQuery next = extractFirstQuery(query.substring(3));
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
                KQuery next = extractFirstQuery(query.substring(4));
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
        while (i < query.length() && ((query.charAt(i) != QUERY_SEP) || escaped)) {
            if (escaped) {
                escaped = false;
            }
            if (query.charAt(i) == OPEN_BRACKET) {
                relationNameEnd = i;
            } else {
                if (query.charAt(i) == CLOSE_BRACKET) {
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
            Map<String, KQueryParam> params = new HashMap<String, KQueryParam>();
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
                            KQueryParam pObject;
                            if (pArray.length > 1) {
                                String paramKey = pArray[0].trim();
                                boolean negative = paramKey.endsWith("!");
                                pObject = new KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                                params.put(pObject.name(), pObject);
                            } else {
                                pObject = new KQueryParam(null, p, false);
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
                    KQueryParam pObject;
                    if (pArray.length > 1) {
                        String paramKey = pArray[0].trim();
                        boolean negative = paramKey.endsWith("!");
                        pObject = new KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                        params.put(pObject.name(), pObject);
                    } else {
                        pObject = new KQueryParam(null, lastParam, false);
                        params.put("@id", pObject);
                    }
                }
            }
            return new KQuery(relName, params, subQuery, oldString, false, false);
        }
        return null;
    }

}
