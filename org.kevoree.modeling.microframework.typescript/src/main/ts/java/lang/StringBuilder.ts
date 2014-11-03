class StringBuilder {

    buffer = "";

    public length = 0;

    append(val:any):StringBuilder {
        this.buffer = this.buffer + val;
        length = this.buffer.length;
        return this;
    }

    toString():string {
        return this.buffer;
    }

}