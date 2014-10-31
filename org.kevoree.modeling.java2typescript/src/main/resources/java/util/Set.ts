
interface Set<T> {
    contains(val:T):boolean;
    addAll(other:List<T>);
    remove(val:T);
    size():number;
    isEmpty():boolean;
    toArray(other:Array<T>):T[];
}