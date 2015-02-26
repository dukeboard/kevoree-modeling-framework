package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.meta.*;

import java.util.HashMap;

/**
 * Created by duke on 07/12/14.
 */
public class AbstractMetaClass implements MetaClass {

    private String _name;

    private int _index;

    private Meta[] _meta;

    private MetaAttribute[] _atts;

    private MetaReference[] _refs;

    private HashMap<String, Meta> _indexes = new HashMap<String, Meta>();

    @Override
    public Meta metaByName(String name) {
        return _indexes.get(name);
    }

    @Override
    public Meta[] metaElements() {
        return _meta;
    }

    public int index() {
        return _index;
    }

    public String metaName() {
        return _name;
    }

    protected AbstractMetaClass(String p_name, int p_index) {
        this._name = p_name;
        this._index = p_index;
    }

    protected void init(Meta[] p_meta) {
        this._meta = p_meta;
        int nbAtt = 0;
        int nbRef = 0;
        for (int i = 0; i < p_meta.length; i++) {
            if (p_meta[i] instanceof AbstractMetaAttribute) {
                nbAtt++;
            } else if (p_meta[i] instanceof AbstractMetaReference) {
                nbRef++;
            }
            _indexes.put(p_meta[i].metaName(), p_meta[i]);
        }
        _atts = new MetaAttribute[nbAtt];
        _refs = new MetaReference[nbRef];
        nbAtt = 0;
        nbRef = 0;
        for (int i = 0; i < p_meta.length; i++) {
            if (p_meta[i] instanceof AbstractMetaAttribute) {
                _atts[nbAtt] = (MetaAttribute) p_meta[i];
                nbAtt++;
            } else if (p_meta[i] instanceof AbstractMetaReference) {
                _refs[nbRef] = (MetaReference) p_meta[i];
                nbRef++;
            }
            _indexes.put(p_meta[i].metaName(), p_meta[i]);
        }

    }

    @Override
    public Meta meta(int index) {
        int transposedIndex = index - Index.RESERVED_INDEXES;
        if (transposedIndex >= 0 && transposedIndex < this._meta.length) {
            return this._meta[index];
        } else {
            return null;
        }
    }

    @Override
    public MetaAttribute[] metaAttributes() {
        return this._atts;
    }

    @Override
    public MetaReference[] metaReferences() {
        return this._refs;
    }

}
