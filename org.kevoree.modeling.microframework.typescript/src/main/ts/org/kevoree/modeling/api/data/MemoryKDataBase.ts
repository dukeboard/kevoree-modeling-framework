///<reference path="../Callback.ts"/>
///<reference path="../ThrowableCallback.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>

class MemoryKDataBase implements KDataBase {

  private backend: JUHashMap<string, string> = new JUHashMap<string, string>();

  public put(payloads: string[][], callback: Callback<Throwable>): void {
    for (var i: number = 0; i < payloads.length; i++) {
      this.backend.put(payloads[i][0], payloads[i][1]);
    }
    callback.on(null);
  }

  public get(keys: string[], callback: ThrowableCallback<string[]>): void {
    var values: string[] = new Array();
    for (var i: number = 0; i < keys.length; i++) {
      values[i] = this.backend.get(keys[i]);
    }
    callback.on(values, null);
  }

  public remove(keys: string[], callback: Callback<Throwable>): void {
    for (var i: number = 0; i < keys.length; i++) {
      this.backend.remove(keys[i]);
    }
    callback.on(null);
  }

  public commit(callback: Callback<Throwable>): void {
  }

  public close(callback: Callback<Throwable>): void {
    this.backend.clear();
  }

}

