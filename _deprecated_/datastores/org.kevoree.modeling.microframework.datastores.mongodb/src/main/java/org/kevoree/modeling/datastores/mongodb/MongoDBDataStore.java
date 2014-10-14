package org.kevoree.modeling.datastores.mongodb;

import jet.runtime.typeinfo.JetValueParameter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.events.ModelEvent;
import org.kevoree.modeling.api.persistence.DataStore;

import java.util.Set;

/**
 * Created by liryc on 8/4/14.
 */
public class MongoDBDataStore implements DataStore {


    public MongoDBDataStore() {

    }

    @Override
    public void put(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2, @JetValueParameter(name = "value") @NotNull String s3) {

    }

    @Nullable
    @Override
    public String get(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {

    }

    @Override
    public void remove(@JetValueParameter(name = "segment") @NotNull String s, @JetValueParameter(name = "key") @NotNull String s2) {

    }

    @Override
    public void commit() {

    }

    @Override
    public void close() {

    }

    @NotNull
    @Override
    public Set<String> getSegments() {

    }

    @NotNull
    @Override
    public Set<String> getSegmentKeys(@JetValueParameter(name = "segment") @NotNull String s) {
       //TODO
    }

    @Override
    public void notify(@JetValueParameter(name = "event") @NotNull ModelEvent modelEvent) {
        //TODO leveraging Memory or MongoDB PubSub
    }

    @Override
    public void register(@JetValueParameter(name = "listener") @NotNull ModelElementListener modelElementListener, @JetValueParameter(name = "from", type = "?") @Nullable Long aLong, @JetValueParameter(name = "to", type = "?") @Nullable Long aLong2, @JetValueParameter(name = "path") @NotNull String s) {}

    @Override
    public void unregister(@JetValueParameter(name = "listener") @NotNull ModelElementListener modelElementListener) {}

}
