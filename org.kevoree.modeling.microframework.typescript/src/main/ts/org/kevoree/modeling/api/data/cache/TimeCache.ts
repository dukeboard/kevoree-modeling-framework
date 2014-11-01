///<reference path="../../KObject.ts"/>
///<reference path="../../ModelListener.ts"/>
///<reference path="../../../../../../java/util/ArrayList.ts"/>
///<reference path="../../../../../../java/util/HashMap.ts"/>
///<reference path="../../../../../../java/util/List.ts"/>
///<reference path="../../../../../../java/util/Map.ts"/>

class TimeCache {

  public obj_cache: Map<number, KObject<any,any>> = new HashMap<number, KObject<any,any>>();
  public payload_cache: Map<number, any[]> = new HashMap<number, any[]>();
  public root: KObject<any,any> = null;
  public rootDirty: boolean = false;
  public listeners: List<ModelListener> = new ArrayList<ModelListener>();
  public obj_listeners: Map<number, List<ModelListener>> = new HashMap<number, List<ModelListener>>();

}

