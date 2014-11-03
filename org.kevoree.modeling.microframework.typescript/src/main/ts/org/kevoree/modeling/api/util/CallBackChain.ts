///<reference path="../Callback.ts"/>

interface CallBackChain<A> {

  on(a: A, next: Callback<Throwable>): void;

}

