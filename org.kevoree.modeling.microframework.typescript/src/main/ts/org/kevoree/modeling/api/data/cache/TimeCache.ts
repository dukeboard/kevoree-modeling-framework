///<reference path="../../KObject.ts"/>
///<reference path="../../ModelListener.ts"/>
///<reference path="../../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../../java/util/JUMap.ts"/>

class TimeCache {

  public obj_cache: JUMap<number, KObject<any,any>> = new JUHashMap<number, KObject<any,any>>();
  public payload_cache: JUMap<number, any[]> = new JUHashMap<number, any[]>();
  public root: KObject<any,any> = null;
  public rootDirty: boolean = false;
  public listeners: JUList<ModelListener> = new JUArrayList<ModelListener>();
  public obj_listeners: JUMap<number, JUList<ModelListener>> = new JUHashMap<number, JUList<ModelListener>>();

}

