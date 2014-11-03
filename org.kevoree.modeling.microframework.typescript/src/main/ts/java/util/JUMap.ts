class JUMap<K, V> {
    get(key:K):V {
        return this.internalMap.get(key);
    }

    put(key:K, value:V):void {
        this.internalMap.set(key, value);
    }

    containsKey(key:K):boolean {
        return this.internalMap.has(key);
    }

    remove(key:K):void {
        return this.remove(key);
    }

    keySet():JUSet<K> {
        var result = new JUHashSet<K>();
        this.internalMap.forEach((value:V, index:K, p1:Map<K,V>)=> {
            result.add(index);
        });
        return result;
    }

    isEmpty():boolean {
        return this.internalMap.size == 0;
    }

    values():JUSet<V> {
        var result = new JUHashSet<V>();
        this.internalMap.forEach((value:V, index:K, p1:Map<K,V>)=> {
            result.add(value);
        });
        return result;
    }

    private internalMap:Map<K,V> = new Map<K,V>();

}