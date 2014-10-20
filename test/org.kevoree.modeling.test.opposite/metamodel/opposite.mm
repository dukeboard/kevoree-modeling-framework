
class kmf.opposite.test.Container  {
    @contained
    bees : kmf.opposite.test.B[0,*]
    @contained
    aees : kmf.opposite.test.A[0,*]
    @contained
    cees : kmf.opposite.test.C[0,*]
}

class kmf.opposite.test.C  {
    @contained
    bees : kmf.opposite.test.B[0,*]
}

class kmf.opposite.test.A  {
    optionalSingleA_optionalSingleB : kmf.opposite.test.B oppositeOf optionalSingleA_optionalSingleB
    optionalSingleA_MandatorySingleB : kmf.opposite.test.B oppositeOf optionalSingleA_MandatorySingleB
    optionalSingleA_StarListB : kmf.opposite.test.B oppositeOf optionalSingleA_StarListB
    mandatorySingleA_mandatorySingleB : kmf.opposite.test.B oppositeOf mandatorySingleA_mandatorySingleB
    optionalSingleA_PlusListB : kmf.opposite.test.B oppositeOf optionalSingleA_PlusListB
    mandatorySingleA_StartListB : kmf.opposite.test.B oppositeOf mandatorySingleA_StarListB
    mandatorySingleA_PlusListB : kmf.opposite.test.B oppositeOf mandatorySingleA_PlusListB
    starListA_StarListB : kmf.opposite.test.B[0,*] oppositeOf starListA_StarListB
    starListA_PlusListB : kmf.opposite.test.B[0,*] oppositeOf starListA_PlusListB
    plusListA_PlusListB : kmf.opposite.test.B oppositeOf plusListA_PlusListB
    optionalSingleRef : kmf.opposite.test.B
    mandatorySingleRef : kmf.opposite.test.B
    starList : kmf.opposite.test.B[0,*]
    plusList : kmf.opposite.test.B
}

class kmf.opposite.test.B  {
    @contained
    optionalSingleA_optionalSingleB : kmf.opposite.test.A oppositeOf optionalSingleA_optionalSingleB
    @contained
    optionalSingleA_MandatorySingleB : kmf.opposite.test.A oppositeOf optionalSingleA_MandatorySingleB
    @contained
    optionalSingleA_StarListB : kmf.opposite.test.A[0,*] oppositeOf optionalSingleA_StarListB
    @contained
    mandatorySingleA_mandatorySingleB : kmf.opposite.test.A oppositeOf mandatorySingleA_mandatorySingleB
    @contained
    optionalSingleA_PlusListB : kmf.opposite.test.A oppositeOf optionalSingleA_PlusListB
    @contained
    mandatorySingleA_StarListB : kmf.opposite.test.A[0,*] oppositeOf mandatorySingleA_StartListB
    @contained
    mandatorySingleA_PlusListB : kmf.opposite.test.A oppositeOf mandatorySingleA_PlusListB
    @contained
    starListA_StarListB : kmf.opposite.test.A[0,*] oppositeOf starListA_StarListB
    @contained
    starListA_PlusListB : kmf.opposite.test.A oppositeOf starListA_PlusListB
    @contained
    plusListA_PlusListB : kmf.opposite.test.A oppositeOf plusListA_PlusListB
    @contained
    optionalSingleRef : kmf.opposite.test.A
    @contained
    mandatorySingleRef : kmf.opposite.test.A
    @contained
    starList : kmf.opposite.test.A[0,*]
    @contained
    plusList : kmf.opposite.test.A
}
