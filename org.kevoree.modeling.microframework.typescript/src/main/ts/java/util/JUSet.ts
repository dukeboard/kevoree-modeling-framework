
interface JUSet<T> {
    contains(val:T):boolean;
    addAll(other:any);
    remove(val:T);
    size():number;
    isEmpty():boolean;
    toArray(other:Array<T>):T[];
}