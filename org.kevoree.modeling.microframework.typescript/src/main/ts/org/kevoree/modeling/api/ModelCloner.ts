
interface ModelCloner<A extends KObject<any,any>> {

  clone(o: A, callback: Callback<A>): void;

}

