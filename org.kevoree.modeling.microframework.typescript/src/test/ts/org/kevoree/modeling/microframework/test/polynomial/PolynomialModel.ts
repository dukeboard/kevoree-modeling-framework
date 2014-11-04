///<reference path="../../../api/polynomial/util/DataSample.ts"/>
///<reference path="../../../api/polynomial/DefaultPolynomialExtrapolation.ts"/>
///<reference path="../../../api/polynomial/util/Prioritization.ts"/>
///<reference path="../../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../../java/util/TreeMap.ts"/>

class PolynomialModel {

  private degradeFactor: number = 0;
  private toleratedError: number = 0;
  private maxDegree: number = 0;
  private prioritization: Prioritization = Prioritization.LOWDEGREES;
  private polynomTree: TreeMap<number, DefaultPolynomialExtrapolation> = new TreeMap<number, DefaultPolynomialExtrapolation>();
  private defaultPolynomialExtrapolation: DefaultPolynomialExtrapolation = null;
  private fast: DefaultPolynomialExtrapolation = null;
  private timeE: number = 0;

  constructor(degradeFactor: number, toleratedError: number, maxDegree: number) {
    if (degradeFactor == 0) {
      degradeFactor = 1;
    }
    this.degradeFactor = degradeFactor;
    this.toleratedError = toleratedError;
    this.maxDegree = maxDegree;
  }

  public feed(time: number, value: number): void {
    if (this.defaultPolynomialExtrapolation == null) {
      this.defaultPolynomialExtrapolation = new DefaultPolynomialExtrapolation(time, this.toleratedError, this.maxDegree, this.degradeFactor, this.prioritization);
      this.defaultPolynomialExtrapolation.insert(time, value);
      return;
    }
    if (this.defaultPolynomialExtrapolation.insert(time, value)) {
      return;
    }
    var prev: DataSample = this.defaultPolynomialExtrapolation.getSamples().get(this.defaultPolynomialExtrapolation.getSamples().size() - 1);
    var newPrev: DataSample = new DataSample(prev.time, this.defaultPolynomialExtrapolation.extrapolate(prev.time));
    this.polynomTree.put(this.defaultPolynomialExtrapolation.getTimeOrigin(), this.defaultPolynomialExtrapolation);
    this.defaultPolynomialExtrapolation = new DefaultPolynomialExtrapolation(newPrev.time, this.toleratedError, this.maxDegree, this.degradeFactor, this.prioritization);
    this.defaultPolynomialExtrapolation.insert(newPrev.time, newPrev.value);
    this.defaultPolynomialExtrapolation.insert(time, value);
  }

  public finalSave(): void {
    if (this.defaultPolynomialExtrapolation != null) {
      this.polynomTree.put(this.defaultPolynomialExtrapolation.getTimeOrigin(), this.defaultPolynomialExtrapolation);
    }
  }

  public reconstruct(time: number): number {
    var timeO: number = this.polynomTree.floorKey(time);
    var p: DefaultPolynomialExtrapolation = this.polynomTree.get(timeO);
    return p.extrapolate(time);
  }

  public fastReconstruct(time: number): number {
    if (this.fast != null) {
      if (time < this.timeE || this.timeE == -1) {
        return this.fast.extrapolate(time);
      }
    }
    var timeO: number = this.polynomTree.floorKey(time);
    this.fast = this.polynomTree.get(timeO);
    try {
      this.timeE = this.polynomTree.ceilingKey(time);
    } catch ($ex$) {
      if ($ex$ instanceof Exception) {
        var ex: Exception = <Exception>$ex$;
        this.timeE = -1;
      }
     }
    return this.fast.extrapolate(time);
  }

  public displayStatistics(display: boolean): StatClass {
    var global: StatClass = new StatClass();
    var temp: StatClass = new StatClass();
    var debug: JUArrayList<StatClass> = new JUArrayList<StatClass>();
    var pol: number = 0;
    //TODO resolve for-each cycle
    var t: number;
    for (t in this.polynomTree.keySet()) {
      pol++;
      temp = this.calculateError(this.polynomTree.get(t));
      debug.add(temp);
      if (temp.maxErr > global.maxErr) {
        global.maxErr = temp.maxErr;
        global.time = temp.time;
        global.value = temp.value;
        global.calculatedValue = temp.calculatedValue;
      }
      global.avgError += temp.avgError * temp.samples;
      global.samples += temp.samples;
      global.degree += temp.degree;
    }
    global.avgError = global.avgError / global.samples;
    global.polynoms = pol;
    global.storage = (global.degree + pol);
    global.avgDegree = (<number>global.degree) / pol;
    global.timeCompression = (1 - (<number>pol) / global.samples) * 100;
    global.diskCompression = (1 - (<number>global.degree + 2 * pol) / (global.samples * 2)) * 100;
    if (display) {
      System.out.println("Total number of samples: " + global.samples);
      System.out.println("Total number of Polynoms: " + global.polynoms);
      System.out.println("Total doubles in polynoms: " + global.storage);
      System.out.println("Average degrees in polynoms: " + global.avgDegree);
      System.out.println("Time points compression: " + global.timeCompression + " %");
      System.out.println("Disk compression: " + global.diskCompression + " %");
      System.out.println("Maximum error: " + global.maxErr + " at time: " + global.time + " original value was: " + global.value + " calculated value: " + global.calculatedValue);
      System.out.println("Average error: " + global.avgError);
    }
    return global;
  }

  public calculateError(pol: DefaultPolynomialExtrapolation): StatClass {
    var ec: StatClass = new StatClass();
    var temp: number = 0;
    var err: number = 0;
    var ds: DataSample;
    ec.degree = pol.getDegree();
    ec.samples = pol.getSamples().size();
    for (var i: number = 0; i < pol.getSamples().size(); i++) {
      ds = pol.getSamples().get(i);
      temp = pol.extrapolate(ds.time);
      err = Math.abs(temp - ds.value);
      ec.avgError += err;
      if (err > ec.maxErr) {
        ec.time = ds.time;
        ec.value = ds.value;
        ec.calculatedValue = temp;
        ec.maxErr = err;
      }
    }
    ec.avgError = ec.avgError / pol.getSamples().size();
    return ec;
  }

}

