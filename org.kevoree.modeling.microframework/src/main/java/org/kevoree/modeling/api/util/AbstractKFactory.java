package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.json.JSONModelLoader;
import org.kevoree.modeling.api.json.JSONModelSerializer;
import org.kevoree.modeling.api.xmi.XMIModelLoader;
import org.kevoree.modeling.api.xmi.XMIModelSerializer;

/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKFactory implements KFactory {

    @Override
    public ModelSerializer createJSONSerializer() {
        return new JSONModelSerializer();
    }

    @Override
    public ModelLoader createJSONLoader() {
        return new JSONModelLoader(this);
    }

    @Override
    public XMIModelSerializer createXMISerializer() {
        return null;
    }

    @Override
    public XMIModelLoader createXMILoader() {
        return null;
    }

    @Override
    public ModelCompare createModelCompare() {
        return null;
    }

    @Override
    public ModelCloner createModelCloner() {
        return null;
    }

    @Override
    public ModelSlicer createModelSlicer() {
        return null;
    }
}
