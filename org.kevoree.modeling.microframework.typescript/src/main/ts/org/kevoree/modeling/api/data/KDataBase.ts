///<reference path="../Callback.ts"/>
///<reference path="../ThrowableCallback.ts"/>

interface KDataBase {

  get(keys: string[], callback: ThrowableCallback<string[]>): void;

  put(payloads: string[][], error: Callback<Throwable>): void;

  remove(keys: string[], error: Callback<Throwable>): void;

  commit(error: Callback<Throwable>): void;

  close(error: Callback<Throwable>): void;

}

