///<reference path="meta/MetaClass.ts"/>
///<reference path="time/TimeTree.ts"/>
///<reference path="../../../../java/util/List.ts"/>
///<reference path="../../../../java/util/Set.ts"/>

interface KView {

  createFQN(metaClassName: string): KObject<any,any>;

  create(clazz: MetaClass): KObject<any,any>;

  setRoot(elem: KObject<any,any>): void;

  createJSONSerializer(): ModelSerializer;

  createJSONLoader(): ModelLoader;

  createXMISerializer(): ModelSerializer;

  createXMILoader(): ModelLoader;

  createModelCompare(): ModelCompare;

  createModelCloner(): ModelCloner<any>;

  createModelSlicer(): ModelSlicer;

  select(query: string, callback: Callback<KObject<any,any>[]>): void;

  lookup(key: number, callback: Callback<KObject<any,any>>): void;

  lookupAll(keys: number[], callback: Callback<KObject<any,any>[]>): void;

  stream(query: string, callback: Callback<KObject<any,any>>): void;

  metaClasses(): MetaClass[];

  metaClass(fqName: string): MetaClass;

  dimension(): KDimension<any,any,any>;

  now(): number;

  createProxy(clazz: MetaClass, timeTree: TimeTree, key: number): KObject<any,any>;

  listen(listener: ModelListener): void;

}

