class Arrays {
    static fill(data:Number[], begin:number, nbElem:number, param:number):void {
        var max = begin+nbElem;
        for(var i=begin;i<max;i++){
            data[i]=param;
        }
    }
}
