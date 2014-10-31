
interface Map<K, V> {
    put(key:K, value:V):void;
    containsKey(key:K):boolean;
    remove(key:K):void;
    keySet() : List<K>;
    isEmpty() : boolean;
    values() : List<K>;
}