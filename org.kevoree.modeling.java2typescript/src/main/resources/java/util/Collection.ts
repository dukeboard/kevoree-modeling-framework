
interface Collection<T> {

    add(val : T);
    addAll(vals : Collection<T>);
    remove(val : T);
    clear();
    isEmpty():boolean;
    size():number;
    contains(val:T):boolean;

    toArray():T[];
    toArray(a:Array):T[];


}