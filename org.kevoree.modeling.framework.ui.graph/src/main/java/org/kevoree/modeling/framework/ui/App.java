package org.kevoree.modeling.framework.ui;

import org.evaluation.EvaluationFactory;
import org.evaluation.SmartGrid;
import org.evaluation.SmartMeter;
import org.evaluation.impl.DefaultEvaluationFactory;
import org.graphstream.graph.Graph;
import org.graphstream.ui.swingViewer.ViewerListener;
import org.graphstream.ui.swingViewer.ViewerPipe;

/**
 * Created by duke on 7/1/14.
 */
public class App {

    public static void main(String[] args) {

        EvaluationFactory factory = new DefaultEvaluationFactory();

        SmartGrid grid = factory.createSmartGrid();
        factory.setRoot(grid);

        SmartMeter previous = null;

        for (int i = 0; i < 20; i++) {
            String name = "meter_" + i;
            SmartMeter meter = factory.createSmartMeter().withName(name);
            grid.addSmartmeters(meter);
            if (previous != null) {
                meter.addNeighbors(previous);
            }
            previous = meter;

        }

        ModelGraphView view = new ModelGraphView();
        Graph g = view.convert(grid);
        ViewerPipe pipe = g.display(true).newViewerPipe();
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

}
