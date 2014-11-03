class Collections {

    public static reverse<A>(p:JUList<A>):void {
        var temp = new JUList<A>();
        for (var i = 0; i < p.size(); i++) {
            temp.add(p.get(i));
        }
        p.clear();
        for (var i = temp.size - 1; i >= 0; i--) {
            p.add(temp.get(i));
        }
    }

}