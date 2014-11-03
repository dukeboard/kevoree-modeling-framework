class Collections {

    public static reverse<A>(p : A[]) : A[] {
        var result = new A[p.length];
        var newIndex = p.length-1;
        for(i=0;i<p.length;i++){
            result[newIndex] = p[i];
            newIndex--;
        }
        return result;
    }

}