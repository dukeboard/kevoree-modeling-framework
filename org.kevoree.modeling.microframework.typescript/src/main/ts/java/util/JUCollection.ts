
interface JUCollection<T> {

    add(val : T);
    addAll(vals : any);
    remove(val : T);
    clear();
    isEmpty():boolean;
    size():number;
    contains(val:T):boolean;

    toArray():T[];
    toArray(a:Array):T[];


}