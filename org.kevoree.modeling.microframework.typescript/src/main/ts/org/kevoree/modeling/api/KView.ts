///<reference path="meta/MetaClass.ts"/>
///<reference path="time/TimeTree.ts"/>
///<reference path="../../../../java/util/List.ts"/>
///<reference path="../../../../java/util/Set.ts"/>

interface KView {

  createFQN(metaClassName: string): KObject;

  create(clazz: MetaClass): KObject;

  setRoot(elem: KObject<any,any>): void;

  createJSONSerializer(): ModelSerializer;

  createJSONLoader(): ModelLoader;

  createXMISerializer(): ModelSerializer;

  createXMILoader(): ModelLoader;

  createModelCompare(): ModelCompare;

  createModelCloner(): ModelCloner;

  createModelSlicer(): ModelSlicer;

  select(query: string, callback: Callback<List<KObject>>): void;

  lookup(key: number, callback: Callback<KObject>): void;

  lookupAll(keys: Set<number>, callback: Callback<List<KObject>>): void;

  stream(query: string, callback: Callback<KObject>): void;

  metaClasses(): MetaClass[];

  metaClass(fqName: string): MetaClass;

  dimension(): KDimension;

  now(): number;

  createProxy(clazz: MetaClass, timeTree: TimeTree, key: number): KObject;

  listen(listener: ModelListener): void;

}

