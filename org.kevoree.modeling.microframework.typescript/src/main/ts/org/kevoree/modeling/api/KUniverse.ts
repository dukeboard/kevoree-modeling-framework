///<reference path="data/KStore.ts"/>

interface KUniverse<A> {

  newDimension(callback: Callback<A>): void;

  dimension(key: number, callback: Callback<A>): void;

  saveAll(callback: Callback<boolean>): void;

  deleteAll(callback: Callback<boolean>): void;

  unloadAll(callback: Callback<boolean>): void;

  disable(listener: ModelListener): void;

  stream(query: string, callback: Callback<KObject>): void;

  storage(): KStore;

  listen(listener: ModelListener): void;

}

