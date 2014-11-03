///<reference path="JUCollection.ts"/>
class JUSet<T> extends JUCollection<T> {

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
        var result = new Array<T>(this.internalSet.size);
        var i=0;
        this.internalSet.forEach((value:T, index:T, origin:Set<T>)=> {
            result[i] = value;
            i++;
        });
        return result;
    }

}