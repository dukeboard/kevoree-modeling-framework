package org.kevoree.modeling.GC4MDE.kevoreeTest;

import org.kevoree.ContainerRoot;
import org.kevoree.KevoreeFactory;
import org.kevoree.impl.FlyweightKevoreeFactory;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 16/04/13
 * Time: 10:28
 */
public class FlyWeightKevoreeCloneLoop extends DeleteWholeKevoreeCloneLoop {

    private FlyweightKevoreeFactory flyf = new FlyweightKevoreeFactory();

    @Override
    public void cleanupModel(ContainerRoot model) {
        flyf.restack(model);
        model.delete();
    }

    @Override
    public KevoreeFactory createFactory() {
        flyf.setMaxStackSize(500);
        return flyf;
    }
}
