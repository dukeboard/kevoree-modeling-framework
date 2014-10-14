package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 10/8/14.
 */
public class Helper {

    public static <A> void forall(List<A> in, final CallBackChain<A> each, final Callback<Throwable> end) {
        final List<A> cloned = new ArrayList<A>(in);
        final int max = cloned.size();
        process(cloned, 0, max, each, end);
    }

    private static <A> void process(final List<A> cloned, final int index, final int max, final CallBackChain<A> each, final Callback<Throwable> end) {
        if (index >= max) {
            end.on(null);
        } else {
            A obj = cloned.get(index);
            each.on(obj, new Callback<Throwable>() {
                @Override
                public void on(Throwable err) {
                    if (err != null) {
                        end.on(err);
                    } else {
                        process(cloned, index + 1, max, each, end);
                    }
                }
            });
        }
    }

    private static final char pathSep = '/';

    public static String parentPath(String currentPath) {
        if (currentPath.charAt(0) == pathSep) {
            int lastIndex = currentPath.lastIndexOf(pathSep);
            if (lastIndex != -1 && lastIndex > 1) {
                return currentPath.substring(0, lastIndex);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

}
