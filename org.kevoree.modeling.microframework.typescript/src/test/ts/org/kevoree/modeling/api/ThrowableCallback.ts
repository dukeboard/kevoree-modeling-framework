
interface ThrowableCallback<A> {

  on(a: A, error: Throwable): void;

}

