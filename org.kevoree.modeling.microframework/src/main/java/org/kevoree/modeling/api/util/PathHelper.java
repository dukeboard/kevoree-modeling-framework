package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaReference;

/**
 * Created by duke on 10/8/14.
 */
public class PathHelper {

    public static final char pathSep = '/';
    private static final char pathIDOpen = '[';
    private static final char pathIDClose = ']';
    private static final String rootPath = "/";

    public static String parentPath(String currentPath) {
        if (currentPath == null || currentPath.length() == 0) {
            return null;
        }
        if (currentPath.length() == 1) {
            return null;
        }
        int lastIndex = currentPath.lastIndexOf(pathSep);
        if (lastIndex != -1) {
            if (lastIndex == 0) {
                return rootPath;
            } else {
                return currentPath.substring(0, lastIndex);
            }
        } else {
            return null;
        }
    }

    public static boolean isRoot(String path) {
        return path.length() == 1 && path.charAt(0) == PathHelper.pathSep;
    }

    public static String path(String parent, MetaReference reference, KObject target) {
        if (isRoot(parent)) {
            return pathSep + reference.metaName() + pathIDOpen + target.domainKey() + pathIDClose;
        } else {
            return parent + pathSep + reference.metaName() + pathIDOpen + target.domainKey() + pathIDClose;
        }
    }

}
