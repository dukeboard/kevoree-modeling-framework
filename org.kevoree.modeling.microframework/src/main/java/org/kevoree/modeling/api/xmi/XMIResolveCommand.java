package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.util.ActionType;

public class XMIResolveCommand {

    private LoadingContext context;
    private KObject target;
    private ActionType mutatorType;
    private String refName;
    private String ref;

    public XMIResolveCommand(LoadingContext context, KObject target, ActionType mutatorType, String refName, String ref) {
        this.context = context;
        this.target = target;
        this.mutatorType = mutatorType;
        this.refName = refName;
        this.ref = ref;
    }

    void run() throws Exception {
        KObject referencedElement = context.map.get(ref);
        if (referencedElement != null) {
            target.mutate(mutatorType, refName, referencedElement, true, false);
            return;
        }
        if (ref.equals("/0/") || ref.equals("/")) {
            referencedElement = context.map.get("/0");
            if (referencedElement != null) {
                target.mutate(mutatorType, refName, referencedElement, true, false);
                return;
            }
        }
        if (context.resourceSet != null) {
            referencedElement = context.resourceSet.resolveObject(ref);
            if (referencedElement != null) {
                target.mutate(mutatorType, refName, referencedElement, true, false);
                return;
            }
        }
        throw new Exception("KMF Load error : reference " + ref + " not found in map when trying to  " + mutatorType + " " + refName + "  on " + target.metaClassName() + "(path:" + target.path() + ")");
    }
}