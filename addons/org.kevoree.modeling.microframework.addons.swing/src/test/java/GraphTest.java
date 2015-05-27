import org.graphstream.graph.Graph;
import org.graphstream.ui.swingViewer.ViewerListener;
import org.graphstream.ui.swingViewer.ViewerPipe;
import org.junit.Test;
import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.meta.PrimitiveTypes;
import org.kevoree.modeling.api.reflexive.DynamicMetaClass;
import org.kevoree.modeling.api.reflexive.DynamicMetaModel;
import org.kevoree.modeling.api.scheduler.ExecutorServiceScheduler;
import org.kevoree.modeling.framework.addons.swing.GraphBuilder;

import java.util.Random;

/**
 * Created by duke on 20/03/15.
 */
public class GraphTest {

    private static int PRIMARY = 5;

    private static int SECONDARY = 5;

    //@Test
    public void test() throws InterruptedException {
        DynamicMetaModel metaModel = new DynamicMetaModel("TestModel");
        DynamicMetaClass nodeClazz = metaModel.createMetaClass("Node");
        nodeClazz.addAttribute("name", PrimitiveTypes.STRING);
        nodeClazz.addReference("children", nodeClazz, true, null);
        nodeClazz.addReference("neighbor", nodeClazz, false, null);
        KModel model = metaModel.model();
        model.setScheduler(new ExecutorServiceScheduler());

        model.connect(new Callback() {
            @Override
            public void on(Object o) {
                KView view0_0 = model.universe(0).time(0);
                KObject root = view0_0.create(nodeClazz);
                Random random = new Random();
                for (int i = 0; i < random.nextInt(PRIMARY); i++) {
                    KObject sub = view0_0.create(nodeClazz);
                    root.mutate(KActionType.ADD, nodeClazz.reference("children"), sub);
                    for (int j = 0; j < random.nextInt(SECONDARY); j++) {
                        KObject sub2 = view0_0.create(nodeClazz);
                        if (j % 10 == 0) {
                            sub.mutate(KActionType.ADD, nodeClazz.reference("neighbor"), sub2);
                        } else {
                            sub.mutate(KActionType.ADD, nodeClazz.reference("children"), sub2);
                        }
                    }
                }

                GraphBuilder.graphFrom(root, new Callback<Graph>() {
                    @Override
                    public void on(Graph graph) {
                        ViewerPipe pipe = graph.display(true).newViewerPipe();
                        pipe.addViewerListener(new ViewerListener() {
                            @Override
                            public void viewClosed(String viewName) {

                            }

                            @Override
                            public void buttonPushed(String id) {

                            }

                            @Override
                            public void buttonReleased(String id) {

                            }
                        });
                    }
                });
            }
        });


        Thread.currentThread().join();

        //  Thread.sleep(10000);
    }

}
