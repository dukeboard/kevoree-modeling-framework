package org.kevoree.modeling.generator.misc;

import org.kevoree.modeling.idea.psi.MetaModelRelationDeclaration;

import java.util.ArrayList;
import java.util.Comparator;

public class OrderedClassDeclarationLists{
    public ArrayList<MetaModelRelationDeclaration> attributes = new ArrayList<>();
    public ArrayList<MetaModelRelationDeclaration> relations = new ArrayList<>();
    public ArrayList<String> parents = new ArrayList<>();

    public ArrayList<MetaModelRelationDeclaration> getAttributes() {
        return attributes;
    }

    public ArrayList<MetaModelRelationDeclaration> getRelations() {
        return relations;
    }

    private static final Comparator<MetaModelRelationDeclaration> comparator = (o1,o2)-> o1.getText().compareToIgnoreCase(o2.getText());

    public boolean consolidated = false;

    public void sort() {
        attributes.sort(comparator);
        relations.sort(comparator);
    }

}