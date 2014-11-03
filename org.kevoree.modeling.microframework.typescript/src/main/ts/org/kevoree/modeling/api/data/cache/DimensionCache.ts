///<reference path="../../KDimension.ts"/>
///<reference path="../../ModelListener.ts"/>
///<reference path="../../time/DefaultTimeTree.ts"/>
///<reference path="../../time/TimeTree.ts"/>
///<reference path="../../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../../java/util/JUMap.ts"/>

class DimensionCache {

  public timeTreeCache: JUMap<number, TimeTree> = new JUHashMap<number, TimeTree>();
  public timesCaches: JUMap<number, TimeCache> = new JUHashMap<number, TimeCache>();
  public dimension: KDimension<any,any,any> = null;
  public rootTimeTree: TimeTree = new DefaultTimeTree();
  public listeners: JUList<ModelListener> = new JUArrayList<ModelListener>();

  constructor(dimension: KDimension<any,any,any>) {
    this.dimension = dimension;
  }

}

