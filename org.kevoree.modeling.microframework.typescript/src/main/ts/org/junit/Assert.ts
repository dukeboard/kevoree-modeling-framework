class Assert {

    public static assertNotNull(msg?:string,p:any):void {
        if(p==null){
            throw new Exception("Assert Error "+p+" must be null :"+msg);
        }
    }

    public static assertNull(msg?:string,p:any):void {
        if(p!=null){
            throw new Exception("Assert Error "+p+" must be null :"+msg);
        }
    }

    public static assertEquals(msg?:string,p:any, p2:any):void {
        if(p != p2){
            throw new Exception("Assert Error "+p+" must be equals to "+p2+" :"+msg);
        }
    }

    public static assertTrue(msg?:string,b:boolean):void {
        if(!b){
            throw new Exception("Assert Error "+b+" must be true :"+msg);
        }
    }

}