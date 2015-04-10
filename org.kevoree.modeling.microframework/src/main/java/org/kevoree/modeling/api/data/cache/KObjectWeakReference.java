package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KObject;

import java.lang.ref.WeakReference;

/**
 * Created by duke on 30/03/15.
 */

/** @ignore ts */
public class KObjectWeakReference extends WeakReference<KObject> {

    public long[] keyParts() {
        return _keyParts;
    }

    private long[] _keyParts;

    public KObjectWeakReference(KObject referent) {
        super(referent);
        _keyParts = new long[3];
        _keyParts[0] = referent.universe().key();
        _keyParts[1] = referent.view().now();
        _keyParts[2] = referent.uuid();
    }
}
