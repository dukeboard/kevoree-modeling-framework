package org.kevoree.modeling.framework.ui;

import org.evaluation.container.KMFContainerImpl;
import org.graphstream.graph.Edge;
import org.graphstream.graph.Graph;
import org.graphstream.graph.Node;
import org.graphstream.graph.implementations.SingleGraph;
import org.graphstream.ui.spriteManager.SpriteManager;
import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.api.KMFContainer;
import org.kevoree.modeling.api.util.ModelVisitor;

/**
 * Created by duke on 7/1/14.
 */
public class ModelGraphView {

    public Graph convert(KMFContainer model) {
        final Graph graph = new SingleGraph("KMFModel_" + model.metaClassName());
        model.visit(new ModelVisitor() {
            @Override
            public void visit(KMFContainer elem, String refNameInParent, KMFContainer parent) {
                verifyNode(graph, parent);
                verifyNode(graph, elem);
                Edge e = graph.addEdge(refNameInParent + parent.path() + elem.path(), parent.path(), elem.path());
                e.addAttribute("ui.label", refNameInParent);
                e.addAttribute("ui.class", "containmentReference");
                elem.visit(new ModelVisitor() {
                    @NotNull
                    @Override
                    public void visit(KMFContainer elem, String refNameInParent, KMFContainer parent) {
                        verifyNode(graph, parent);
                        verifyNode(graph, elem);
                        Edge e = graph.addEdge(refNameInParent + parent.path() + elem.path(), parent.path(), elem.path(),true);
                        e.addAttribute("ui.label", refNameInParent);
                    }
                }, false, false, true);
            }
        }, true, true, false);


        graph.addAttribute("ui.antialias");
        graph.addAttribute("ui.quality");
        graph.addAttribute("ui.stylesheet", styleSheet);


        return graph;
    }

    public void verifyNode(Graph g, KMFContainer elem) {
        if (g.getNode(elem.path()) == null) {
            Node n = g.addNode(elem.path());
            if (n.getId().equals("/")) {
                n.addAttribute("ui.class", "modelRoot");
            }
            n.addAttribute("ui.label", ((KMFContainerImpl)elem).internalGetKey()+":"+elem.metaClassName());
        }
    }

    protected static String styleSheet = "graph { padding: 100px; stroke-width: 2px; }"
            + "node { fill-color: orange;  fill-mode: dyn-plain; }"
            + "edge { fill-color: grey; }"
            + "edge .containmentReference { fill-color: blue; }"
            + "node:selected { fill-color: red;  fill-mode: dyn-plain; }"
            + "node:clicked  { fill-color: blue; fill-mode: dyn-plain; }"
            + "node .modelRoot        { fill-color: grey, yellow, purple; fill-mode: dyn-plain; }";

}
