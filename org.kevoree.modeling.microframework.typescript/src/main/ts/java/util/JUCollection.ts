interface JUCollection<T> {
    add(val:T);
    addAll(vals:JUCollection<T>);
    remove(val:T);
    clear();
    isEmpty():boolean;
    size():number;
    contains(val:T):boolean;
    toArray(a:Array<T>):T[];
}