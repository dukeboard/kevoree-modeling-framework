class JUList<T> extends JUCollection<T> {
    private internalArray:Array<T> = [];

    addAll(vals:JUCollection<T>) {
        var tempArray = vals.toArray(null);
        for (var i = 0; i < tempArray.length; i++) {
            this.internalArray.push(tempArray[i]);
        }
    }

    clear() {
        this.internalArray = [];
    }

    remove(val:T) {
        //TODO with filter
    }

    toArray(a:Array<T>):T[] {
        //TODO
        var result = new Array<T>(this.internalArray.length);
        this.internalArray.forEach((value:T, index:number, p1:T[])=> {
            result[index] = value;
        });
        return result;
    }

    size():number {
        return this.internalArray.length;
    }

    add(val:T):void {
        this.internalArray.push(val);
    }

    get(index:number):T {
        return this.internalArray[index];
    }

    contains(val:T):boolean {
        for (var i = 0; i < this.internalArray.length; i++) {
            if (this.internalArray[i] == val) {
                return true;
            }
        }
        return false;
    }

    isEmpty():boolean {
        return this.internalArray.length == 0;
    }
}