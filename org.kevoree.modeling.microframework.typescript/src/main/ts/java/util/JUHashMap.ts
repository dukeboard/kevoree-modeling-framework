class JUHashMap<K, V> implements JUMap<K,V> {
    keySet():JUList<K> {
        return undefined;
    }

    values():JUList<K> {
        return undefined;
    }

    private map : Map<K,V> = new Map<K,V>();

    size:number = 0;

    clear():void {
        this.map.clear();
        this.size = this.map.size;
    }

    delete(key:K):boolean {
        var res = this.map.delete(key);
        this.size = this.map.size;
        return res;
    }

    remove(key:K):void {
        this.delete(key);
    }

    forEach(callbackfn:(p1:V, p2:K, p3:Map<K, V>)=>void, thisArg?: any) {
        this.map.forEach(callbackfn, thisArg);
    }

    get(key:K):V {
        return this.map.get(key);
    }

    has(key:K):boolean {
        return this.map.has(key);
    }

    set(key:K, value:V):Map<K, V> {
        var res = this.map.set(key, value);
        this.size = this.map.size;
        return res;
    }

    put(key:K, value:V):void {
        this.set(key, value);
    }

    containsKey(key:K):boolean {
        return this.has(key);
    }

    isEmpty():boolean {
        return undefined;
    }

}