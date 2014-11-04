///<reference path="../../api/Callback.ts"/>
///<reference path="../../api/util/CallBackChain.ts"/>
///<reference path="../../api/util/Helper.ts"/>

class CallbackTester {

  public callbackTest(): void {
    var big: string[] = new Array();
    for (var i: number = 0; i < big.length; i++) {
      big[i] = "say_" + i;
    }
    Helper.forall(big, {on:function(s: string, next: Callback<Throwable>){
    System.out.println(s);
    next.on(null);
}}, {on:function(t: Throwable){
    System.out.println("End !");
}});
  }

}

