class JUCollection<T> {
    add(val:T):void{
        throw new Exception("Abstract implementation");
    }
    addAll(vals:JUCollection<T>):void{
        throw new Exception("Abstract implementation");
    }
    remove(val:T):void{
        throw new Exception("Abstract implementation");
    }
    clear():void{
        throw new Exception("Abstract implementation");
    }
    isEmpty():boolean{
        throw new Exception("Abstract implementation");
    }
    size():number{
        throw new Exception("Abstract implementation");
    }
    contains(val:T):boolean{
        throw new Exception("Abstract implementation");
    }
    toArray(a:Array<T>):T[]{
        throw new Exception("Abstract implementation");
    }
}