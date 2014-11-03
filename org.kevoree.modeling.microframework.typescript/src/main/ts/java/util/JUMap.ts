
interface JUMap<K, V> {
    put(key:K, value:V):void;
    containsKey(key:K):boolean;
    remove(key:K):void;
    keySet() : JUList<K>;
    isEmpty() : boolean;
    values() : JUList<K>;
}