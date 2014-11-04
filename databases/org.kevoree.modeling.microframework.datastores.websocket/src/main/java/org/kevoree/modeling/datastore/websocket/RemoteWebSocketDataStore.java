package org.kevoree.modeling.datastore.websocket;

import jet.runtime.typeinfo.JetValueParameter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.api.persistence.DataStore;

import java.util.Set;

/**
 * Created by duke on 6/26/14.
 */
public class RemoteWebSocketDataStore implements DataStore {

    @NotNull
    @Override
    public void put(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2, @JetValueParameter(name = "value") @NotNull String s3) {

    }

    @Nullable
    @Override
    public String get(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {
        return null;
    }

    @NotNull
    @Override
    public void remove(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {

    }

    @NotNull
    @Override
    public void sync() {

    }

    @NotNull
    @Override
    public Set<String> getSegments() {
        return null;
    }

    @NotNull
    @Override
    public Set<String> getSegmentKeys(@JetValueParameter(name = "segment") @NotNull String s) {
        return null;
    }

}
