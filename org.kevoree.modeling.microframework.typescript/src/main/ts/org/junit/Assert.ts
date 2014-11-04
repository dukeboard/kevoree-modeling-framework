class Assert {

    public static assertNotNull(p:any):void {
        if(p==null){
            throw new Exception("Assert Error "+p+" must be null");
        }
    }

    public static assertNull(p:any):void {
        if(p!=null){
            throw new Exception("Assert Error "+p+" must be null");
        }
    }

    public static assertEquals(p:any, p2:any):void {
        if(p != p2){
            throw new Exception("Assert Error "+p+" must be equals to "+p2);
        }
    }

    public static assertTrue(b:boolean):void {
        if(!b){
            throw new Exception("Assert Error "+b+" must be true");
        }
    }

}