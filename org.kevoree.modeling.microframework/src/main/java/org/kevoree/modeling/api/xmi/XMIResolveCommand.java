package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KActionType;

public class XMIResolveCommand {

    private XMILoadingContext context;
    private KObject target;
    private KActionType mutatorType;
    private String refName;
    private String ref;

    public XMIResolveCommand(XMILoadingContext context, KObject target, KActionType mutatorType, String refName, String ref) {
        this.context = context;
        this.target = target;
        this.mutatorType = mutatorType;
        this.refName = refName;
        this.ref = ref;
    }

    void run() throws Exception {
        KObject referencedElement = context.map.get(ref);
        if (referencedElement != null) {
            target.mutate(mutatorType, target.metaClass().metaReference(refName), referencedElement);
            return;
        }
        referencedElement = context.map.get("/");
        if (referencedElement != null) {
            target.mutate(mutatorType, target.metaClass().metaReference(refName), referencedElement);
            return;
        }
        throw new Exception("KMF Load error : reference " + ref + " not found in map when trying to  " + mutatorType + " " + refName + "  on " + target.metaClass().metaName() + "(uuid:" + target.uuid() + ")");
    }
}