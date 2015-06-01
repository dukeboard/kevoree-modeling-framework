package org.kevoree.modeling;

import org.kevoree.modeling.meta.Meta;

public interface KEventListener {

    void on(KObject src, Meta[] modifications);

}
