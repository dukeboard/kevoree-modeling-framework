class HashMap<K, V> implements Map<K,V> {

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

    forEach(callbackfn:(p1:V, p1:K, p1:Map<K, V>)=>void, thisArg?: any) {
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

    keySet() : List<K> {
        return undefined;
    }

    isEmpty():boolean {
        return undefined;
    }

    values():List<K> {
        return undefined;
    }

}