package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelAttributeVisitor;
import org.kevoree.modeling.api.events.ModelElementListener;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.trace.ModelTrace;
import org.kevoree.modeling.api.util.ActionType;

import java.util.List;

/**
 * Created by duke on 10/9/14.
 */
public abstract class AbstractKObject<A extends KObject, B extends KView> implements KObject<A, B> {

    private B factory;

    private String metaClassName;

    @Override
    public B factory() {
        return factory;
    }

    public AbstractKObject(B factory, String metaClassName, Long now, String dimension, TimeTree timeTree) {
        this.factory = factory;
        this.metaClassName = metaClassName;
        this.now = now;
        this.dimension = dimension;
        this.timeTree = timeTree;
    }

    private boolean isDeleted = false;

    @Override
    public boolean isDeleted() {
        return isDeleted;
    }

    private boolean isRoot = false;

    @Override
    public boolean isRoot() {
        return isRoot;
    }

    private Long now;

    @Override
    public Long now() {
        return now;
    }

    private TimeTree timeTree;

    @Override
    public TimeTree timeTree() {
        return timeTree;
    }

    private String dimension;

    @Override
    public String dimension() {
        return dimension;
    }

    private String path = null;

    @Override
    public String path() {
        return path;
    }

    private String referenceInParent = null;

    @Override
    public String referenceInParent() {
        return referenceInParent;
    }

    @Override
    public void delete(Callback<Boolean> callback) {

    }

    @Override
    public void parent(Callback<KObject> callback) {

    }

    @Override
    public boolean modelEquals(A similarObj) {
        return false;
    }

    @Override
    public void deepModelEquals(A similarObj, Callback<Boolean> callback) {

    }

    @Override
    public void findByID(String relationName, String idP, Callback<KObject> callback) {

    }

    @Override
    public void select(String query, Callback<List<KObject>> callback) {

    }

    @Override
    public void stream(String query, Callback<KObject> callback) {

    }

    @Override
    public void addModelElementListener(ModelElementListener lst) {

    }

    @Override
    public void removeModelElementListener(ModelElementListener lst) {

    }

    @Override
    public void removeAllModelElementListeners() {

    }

    @Override
    public void addModelTreeListener(ModelElementListener lst) {

    }

    @Override
    public void removeModelTreeListener(ModelElementListener lst) {

    }

    @Override
    public void removeAllModelTreeListeners() {

    }

    @Override
    public void visitAttributes(ModelAttributeVisitor visitor) {

    }

    @Override
    public List<ModelTrace> createTraces(A similarObj, boolean isInter, boolean isMerge, boolean onlyReferences, boolean onlyAttributes) {
        return null;
    }

    @Override
    public List<ModelTrace> toTraces(boolean attributes, boolean references) {
        return null;
    }

    @Override
    public void mutate(ActionType mutatorType, String refName, Object value, boolean setOpposite, boolean fireEvent) {

    }

    @Override
    public void jump(Long time, Callback<A> callback) {
        factory().dimension().time(time).lookup(path(), (o) -> {
            callback.on((A) o);
        });
    }

    @Override
    public String key() {
        StringBuilder builder = new StringBuilder();
        MetaAttribute[] atts = metaAttributes();
        for (int i = 0; i < atts.length; i++) {
            MetaAttribute att = atts[i];
            if (att.key()) {
                if (builder.length() != 0) {
                    builder.append(",");
                }
                builder.append(att.metaName());
                builder.append("=");
                builder.append(get(att).toString());//TODO, forbid multiple cardinality as key
            }
        }
        return builder.toString();
    }

    //TODO optimize , maybe dangerous if cache is unloaded ...
    public Object get(MetaAttribute attribute) {
        //here potentially manage learned attributes
        long previous = timeTree().resolve(now());
        return ((AbstractKView) factory()).getDataCache().getPayload(dimension(), previous, path(), attribute.index());
    }

    public void set(MetaAttribute attribute, Object payload) {
        //TODO update timeTree
        factory().dimension().univers().dataCache().putPayload(dimension(), now(), path(), attribute.index(), payload);
        timeTree().insert(now());
        factory().dimension().globalTimeTree().insert(now());
    }


}