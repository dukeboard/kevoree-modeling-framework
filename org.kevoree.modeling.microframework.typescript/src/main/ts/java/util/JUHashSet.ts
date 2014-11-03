class JUHashSet<T> implements JUSet<T> {

    private internalSet = new Set<T>();

    add(val:T) {
        this.internalSet.add(val);
    }

    clear() {
        this.internalSet = new Set<T>();
    }

    contains(val:T):boolean {
        return this.internalSet.has(val);
    }

    addAll(vals:JUCollection<T>) {
        var tempArray = vals.toArray(null);
        for (var i = 0; i < tempArray.length; i++) {
            this.internalSet.add(tempArray[i]);
        }
    }

    remove(val:T) {
        this.internalSet.delete(val);
    }

    size():number {
        return this.internalSet.size;
    }

    isEmpty():boolean {
        return this.internalSet.size == 0;
    }

    toArray(other:Array<T>):T[] {
        var result = new Array<T>[this.internalSet.size]();
        this.internalSet.forEach((value:T, index:T, p1:Set<T>)=> {
            result[index] = value;
        });
        return result;
    }

}