package org.kevoree.modeling.api.util;

/**
 * Created by duke on 10/17/14.
 */
public class InternalInboundRef {

    private String path;

    private String meta;

    public InternalInboundRef(String path, String meta) {
        this.path = path;
        this.meta = meta;
    }

    public String getPath() {
        return path;
    }

    public String getMeta() {
        return meta;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof InternalInboundRef)) {
            return false;
        } else {
            return path.equals(((InternalInboundRef) obj).getPath()) && meta.equals(((InternalInboundRef) obj).getMeta());
        }
    }
}
