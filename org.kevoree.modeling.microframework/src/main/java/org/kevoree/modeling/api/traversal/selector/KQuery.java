package org.kevoree.modeling.api.traversal.selector;

import org.kevoree.modeling.api.util.Checker;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 10/24/14.
 */
public class KQuery {

    public static char OPEN_BRACKET = '[';
    public static char CLOSE_BRACKET = ']';
    public static char QUERY_SEP = '/';

    String relationName;
    String params;
    String subQuery;
    String oldString;
    boolean previousIsDeep;
    boolean previousIsRefDeep;

    private KQuery(String relationName, String params, String subQuery, String oldString, boolean previousIsDeep, boolean previousIsRefDeep) {
        this.relationName = relationName;
        this.params = params;
        this.subQuery = subQuery;
        this.oldString = oldString;
        this.previousIsDeep = previousIsDeep;
        this.previousIsRefDeep = previousIsRefDeep;
    }

    public static List<KQuery> buildChain(String query) {
        List<KQuery> result = new ArrayList<KQuery>();
        KQuery current = extractFirstQuery(query);
        if (current != null) {
            result.add(current);
            while (current != null && !"".equals(current.subQuery) && Checker.isDefined(current.subQuery)) {
                KQuery next = extractFirstQuery(current.subQuery);
                result.add(next);
                current = next;
            }
        }
        return result;
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
            return new KQuery("", null, subQuery, "" + QUERY_SEP, false, false);
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
            relName = relName.replace("\\", "");
            //parse param
            if (attsEnd != 0) {
                return new KQuery(relName, query.substring(relationNameEnd + 1, attsEnd), subQuery, oldString, false, false);
            } else {
                return new KQuery(relName, null, subQuery, oldString, false, false);
            }
        }
        return null;
    }

}
