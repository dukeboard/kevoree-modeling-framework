package org.kevoree.modeling.memory.cache;

import org.kevoree.modeling.KObject;

import java.lang.ref.WeakReference;

/**
 * @ignore ts
 */
public class KObjectWeakReference extends WeakReference<KObject> {

    public long universe;

    public long time;

    public long uuid;

    public KObjectWeakReference next;

    public KObjectWeakReference(KObject referent) {
        super(referent);
        universe = referent.universe();
        time = referent.now();
        uuid = referent.uuid();
    }
}
