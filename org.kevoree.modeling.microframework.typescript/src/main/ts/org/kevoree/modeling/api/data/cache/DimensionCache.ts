///<reference path="../../KDimension.ts"/>
///<reference path="../../ModelListener.ts"/>
///<reference path="../../time/DefaultTimeTree.ts"/>
///<reference path="../../time/TimeTree.ts"/>
///<reference path="../../../../../../java/util/ArrayList.ts"/>
///<reference path="../../../../../../java/util/HashMap.ts"/>
///<reference path="../../../../../../java/util/List.ts"/>
///<reference path="../../../../../../java/util/Map.ts"/>

class DimensionCache {

  public timeTreeCache: Map<number, TimeTree> = new HashMap<number, TimeTree>();
  public timesCaches: Map<number, TimeCache> = new HashMap<number, TimeCache>();
  public dimension: KDimension = null;
  public rootTimeTree: TimeTree = new DefaultTimeTree();
  public listeners: List<ModelListener> = new ArrayList<ModelListener>();

  constructor(dimension: KDimension) {
    this.dimension = dimension;
  }

}

