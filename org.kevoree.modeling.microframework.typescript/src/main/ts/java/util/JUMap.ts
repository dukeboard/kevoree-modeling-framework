interface JUMap<K, V> {
    get(key:K):V;
    put(key:K, value:V):void;
    containsKey(key:K):boolean;
    remove(key:K):void;
    keySet() : JUSet<K>;
    isEmpty() : boolean;
    values() : JUSet<K>;
}