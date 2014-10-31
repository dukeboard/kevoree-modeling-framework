package org.kevoree.modeling.ast;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

/**
 * Created by gregory.nain on 14/10/2014.
 */
/*
public class MModelPackage {

    private String name;
    private MModelPackage parentPackage;
    private  HashMap<String, MModelPackage> subPackages = new HashMap<>();
    private HashMap<String, MModelClass> classes = new HashMap<>();
    private HashMap<String, MModelEnum> enums = new HashMap<>();

    public MModelPackage(String name) {
        this.name = name;
    }

    public Collection<MModelPackage> getSubPackages() {
        return subPackages.values();
    }

    public void addSubPackage(MModelPackage subPackage) {
        subPackages.computeIfAbsent(subPackage.name,(n)->subPackage);
        subPackage.parentPackage = this;
    }

    public void addSubPackage(String subPackageName) {
        MModelPackage pack = new MModelPackage(subPackageName);
        this.addSubPackage(pack);
    }

    public String getName() {
        return name;
    }

    public String getFqn() {
        MModelPackage parent = parentPackage;
        String fqn = name;
        while(parent != null) {
            fqn = parent.name + "." + fqn;
            parent = parent.parentPackage;
        }
        return fqn;
    }


    public MModelPackage getParentPackage() {
        return parentPackage;
    }

    public Collection<MModelClass> getClasses() {
        return classes.values();
    }

    public void addClass(MModelClass clazz) {
        classes.computeIfAbsent(clazz.getName(),(n)->clazz);
        clazz.setPack(this);
    }

    public void addClass(String name) {
        addClass(new MModelClass(name));
    }

    public Collection<MModelEnum> getEnums() {
        return enums.values();
    }

    public void addEnum(MModelEnum enm) {
        enums.computeIfAbsent(enm.getName(),(n)->enm);
        enm.setPack(this);
    }

    public void addEnum(String name) {
        addEnum(new MModelEnum(name));
    }

    public MModelClass findClass(String fqn){
        if(!fqn.contains(".")) {
            return classes.get(fqn);
        } else {
            int indexOfPoint = fqn.indexOf(".");
            String subPack = fqn.substring(0, indexOfPoint);
            return (subPackages.get(subPack) == null ? null : subPackages.get(subPack).findClass(fqn.substring(indexOfPoint+1)));
        }
    }

    public MModelPackage findPackage(String fqn){
        if(!fqn.contains(".")) {
            return (fqn.equals(name)?this:null);
        } else {
            int indexOfPoint = fqn.indexOf(".");
            String subPack = fqn.substring(0, indexOfPoint);
            return (subPackages.get(subPack) == null ? null : subPackages.get(subPack).findPackage(fqn.substring(indexOfPoint+1)));
        }
    }

    public Collection<MModelClass> getAllClasses() {
        ArrayList<MModelClass> allCls = new ArrayList<>(classes.values());
        subPackages.values().forEach((pack)->allCls.addAll(pack.getAllClasses()));
        return allCls;
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof MModelPackage && this.getFqn().equals(((MModelPackage) obj).getFqn());
    }

}
*/
