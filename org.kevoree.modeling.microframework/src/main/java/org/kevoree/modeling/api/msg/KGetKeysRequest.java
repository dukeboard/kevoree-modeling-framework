package org.kevoree.modeling.api.msg;

import org.kevoree.modeling.api.data.cache.KContentKey;

/**
 * Created by duke on 24/02/15.
 */
public class KGetKeysRequest implements KMessage {

    public KContentKey[] keys;

    @Override
    public String json() {
        return null;
    }

    @Override
    public int type() {
        return 0;
    }
}
