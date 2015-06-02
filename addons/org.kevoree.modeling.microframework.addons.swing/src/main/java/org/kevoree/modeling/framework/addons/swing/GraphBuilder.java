package org.kevoree.modeling.framework.addons.swing;

import org.graphstream.graph.Edge;
import org.graphstream.graph.Graph;
import org.graphstream.graph.Node;
import org.graphstream.graph.implementations.SingleGraph;
import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KModelVisitor;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.KVisitResult;
import org.kevoree.modeling.abs.AbstractKObject;
import org.kevoree.modeling.memory.KCacheElementSegment;
import org.kevoree.modeling.memory.struct.segment.HeapCacheSegment;
import org.kevoree.modeling.memory.AccessMode;
import org.kevoree.modeling.meta.MetaReference;

/**
 * Created by duke on 7/1/14.
 */
public class GraphBuilder {

    public static void graphFrom(KObject modelRoot, Callback<Graph> cb) {
        final Graph graph = new SingleGraph("Model_" + modelRoot.metaClass().metaName());
        graph.setStrict(false);
        createNode(graph, modelRoot);
        modelRoot.visit(new KModelVisitor() {
            @Override
            public KVisitResult visit(KObject elem) {
                createNode(graph, elem);
                return KVisitResult.CONTINUE;
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                modelRoot.visit(new KModelVisitor() {
                    @Override
                    public KVisitResult visit(KObject elem) {
                        createEdges(graph, elem);
                        return KVisitResult.CONTINUE;
                    }
                }, new Callback<Throwable>() {
                    @Override
                    public void on(Throwable throwable) {
                        createEdges(graph, modelRoot);
                        graph.addAttribute("ui.antialias");
                        graph.addAttribute("ui.quality");
                        graph.addAttribute("ui.stylesheet", styleSheet);
                        cb.on(graph);
                    }
                });
            }
        });
    }

    private static void createNode(Graph graph, KObject elem) {
        Node n = graph.addNode(elem.uuid() + "");
        n.addAttribute("ui.label", elem.uuid() + ":" + elem.metaClass().metaName());
    }

    private static void createEdges(Graph graph, KObject elem) {
        Node n = graph.getNode(elem.uuid() + "");
        KCacheElementSegment rawPayload = elem.manager().segment(elem, AccessMode.READ);
        for (MetaReference metaRef : elem.metaClass().metaReferences()) {
            long[] relatedElems = rawPayload.getRef(metaRef.index(), elem.metaClass());
            if (relatedElems != null) {
                for (int i = 0; i < relatedElems.length; i++) {
                    Edge e = graph.addEdge(elem.uuid() + "_" + relatedElems[i] + "_" + metaRef.metaName(), elem.uuid() + "", relatedElems[i] + "");
                    if (e != null) {
                        e.addAttribute("ui.label", metaRef.metaName());
                    }
                }

            }
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
