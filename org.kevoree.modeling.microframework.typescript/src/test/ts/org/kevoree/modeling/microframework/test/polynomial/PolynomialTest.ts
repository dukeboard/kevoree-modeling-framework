///<reference path="../../../../../junit/Test.ts"/>
///<reference path="../../../../../../java/util/Random.ts"/>
///<reference path="../../../../../../java/util/TreeMap.ts"/>
// TODO Resolve static imports
///<reference path="../../../../../junit/Assert.ts"/>

class PolynomialTest {

  public test(): void {
    var testVal: TreeMap<number, number> = new TreeMap<number, number>();
    var rand: Random = new Random();
    var degradeFactor: number = 10;
    var toleratedError: number = 0.001;
    var maxDegree: number = 20;
    var starttime: number;
    var endtime: number;
    var res: number;
    var pm: PolynomialModel = new PolynomialModel(degradeFactor, toleratedError, maxDegree);
    var l: number;
    var d: number;
    var initTimeStamp: number = 0;
    var finalTimeStamp: number = 10000000;
    for (var i: number = initTimeStamp; i < finalTimeStamp; i += degradeFactor) {
      l = new number(i);
      d = new number(rand.nextDouble());
      testVal.put(l, d);
      pm.feed(l, d);
    }
    pm.finalSave();
    starttime = System.nanoTime();
    var sc: StatClass = pm.displayStatistics(true);
    endtime = System.nanoTime();
    res = (<number>(endtime - starttime)) / (1000000);
    System.out.println("Statistic calculated in: " + res + " ms!");
    System.out.println("Max error respected: " + String.valueOf(sc.maxErr < toleratedError));
    assertTrue(sc.maxErr < toleratedError);
    starttime = System.nanoTime();
    for (var i: number = initTimeStamp; i < finalTimeStamp; i++) {
      pm.reconstruct(i);
    }
    endtime = System.nanoTime();
    res = (<number>(endtime - starttime)) / (1000000);
    System.out.println("Polynomial chain reconstructed in: " + res + " ms!");
    starttime = System.nanoTime();
    for (var i: number = initTimeStamp; i < finalTimeStamp; i++) {
      pm.fastReconstruct(i);
    }
    endtime = System.nanoTime();
    res = (<number>(endtime - starttime)) / (1000000);
    System.out.println("Polynomial fast reconstructed in: " + res + " ms!");
    starttime = System.nanoTime();
    for (var i: number = initTimeStamp; i < finalTimeStamp; i++) {
      testVal.get(testVal.floorKey(i));
    }
    endtime = System.nanoTime();
    res = (<number>(endtime - starttime)) / (1000000);
    System.out.println("normal chain in: " + res + " ms!");
  }

}

