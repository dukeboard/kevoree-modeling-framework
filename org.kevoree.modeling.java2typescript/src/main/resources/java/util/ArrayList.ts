
class ArrayList<T> implements List<T> {
    clear() {
    }
    addAll(vals:any) {
    }

    remove(val:T) {
    }

    toArray():T[] {
        return undefined;
    }

    toArray(a:Array):T[] {
        return undefined;
    }

    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    constructor(size : number) {
        this.items = new Array(size);
    }

    constructor(others : Collection<T>) {
        this.items = new Array(others);
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }

    contains(val:T):boolean {
        return undefined;
    }

    isEmpty():boolean {
        return undefined;
    }
}