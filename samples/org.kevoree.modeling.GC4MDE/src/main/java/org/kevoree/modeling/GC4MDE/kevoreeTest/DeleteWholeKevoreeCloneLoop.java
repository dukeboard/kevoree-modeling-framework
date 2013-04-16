package org.kevoree.modeling.GC4MDE.kevoreeTest;

import org.kevoree.ContainerRoot;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 16/04/13
 * Time: 09:54
 */
public class DeleteWholeKevoreeCloneLoop extends SimpleKevoreeCloneLoop {

    public static void main(String[] args) {
        new DeleteWholeKevoreeCloneLoop().doTest();
    }

    @Override
    public void cleanupModel(ContainerRoot model) {
        model.delete();
        model = null;
    }
}
