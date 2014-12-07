package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.meta.*;

import java.util.HashMap;

/**
 * Created by duke on 07/12/14.
 */
public class AbstractMetaClass implements MetaClass {

    private String _name;

    private int _index;

    private MetaModel _origin;

    private MetaAttribute[] _atts;

    private MetaReference[] _refs;

    private MetaOperation[] _operations;

    private HashMap<String, Integer> _atts_indexes = new HashMap<String, Integer>();

    private HashMap<String, Integer> _refs_indexes = new HashMap<String, Integer>();

    private HashMap<String, Integer> _ops_indexes = new HashMap<String, Integer>();

    public MetaModel origin() {
        return _origin;
    }

    public int index() {
        return _index;
    }

    public String metaName() {
        return _name;
    }

    protected AbstractMetaClass(String p_name, int p_index, MetaModel p_origin) {
        this._name = p_name;
        this._index = p_index;
        this._origin = p_origin;
    }

    protected void init(MetaAttribute[] p_atts, MetaReference[] p_refs, MetaOperation[] p_operations) {
        this._atts = p_atts;
        for (int i = 0; i < _atts.length; i++) {
            _atts_indexes.put(_atts[i].metaName(), i);
        }
        this._refs = p_refs;
        for (int i = 0; i < _refs.length; i++) {
            _refs_indexes.put(_refs[i].metaName(), i);
        }
        this._operations = p_operations;
        for (int i = 0; i < _operations.length; i++) {
            _ops_indexes.put(_operations[i].metaName(), i);
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

    @Override
    public MetaOperation[] metaOperations() {
        return this._operations;
    }

    @Override
    public MetaAttribute metaAttribute(String name) {
        Integer resolved = _atts_indexes.get(name);
        if (resolved == null) {
            return null;
        } else {
            return _atts[resolved];
        }
    }

    @Override
    public MetaReference metaReference(String name) {
        Integer resolved = _refs_indexes.get(name);
        if (resolved == null) {
            return null;
        } else {
            return _refs[resolved];
        }
    }

    @Override
    public MetaOperation metaOperation(String name) {
        Integer resolved = _ops_indexes.get(name);
        if (resolved == null) {
            return null;
        } else {
            return _operations[resolved];
        }
    }

}
