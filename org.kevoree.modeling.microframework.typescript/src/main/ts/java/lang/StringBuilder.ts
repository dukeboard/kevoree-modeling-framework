class StringBuilder {

    buffer = "";

    append(val:any):StringBuilder {
        this.buffer = this.buffer + val;
        return this;
    }

    length():number {
        return this.buffer.length;
    }

    toString():string {
        return this.buffer;
    }

}