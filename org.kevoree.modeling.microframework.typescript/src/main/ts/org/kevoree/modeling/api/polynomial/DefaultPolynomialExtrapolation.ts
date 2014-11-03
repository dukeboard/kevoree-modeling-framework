///<reference path="util/DataSample.ts"/>
///<reference path="util/PolynomialFitEjml.ts"/>
///<reference path="util/Prioritization.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>

class DefaultPolynomialExtrapolation implements PolynomialExtrapolation {

  private weights: number[] = null;
  private timeOrigin: number = null;
  private samples: JUList<DataSample> = new JUArrayList<DataSample>();
  private degradeFactor: number = 0;
  private prioritization: Prioritization = null;
  private maxDegree: number = 0;
  private toleratedError: number = 0;
  private lastIndex: number = -1;
  private static sep: string = '|';

  constructor(timeOrigin: number, toleratedError: number, maxDegree: number, degradeFactor: number, prioritization: Prioritization) {
    this.timeOrigin = timeOrigin;
    this.degradeFactor = degradeFactor;
    this.prioritization = prioritization;
    this.maxDegree = maxDegree;
    this.toleratedError = toleratedError;
  }

  public getSamples(): JUList<DataSample> {
    return this.samples;
  }

  public getDegree(): number {
    if (this.weights == null) {
      return -1;
    } else {
      return this.weights.length - 1;
    }
  }

  public getTimeOrigin(): number {
    return this.timeOrigin;
  }

  private getMaxErr(degree: number, toleratedError: number, maxDegree: number, prioritization: Prioritization): number {
    var tol: number = toleratedError;
    if (prioritization == Prioritization.HIGHDEGREES) {
      tol = toleratedError / Math.pow(2, maxDegree - degree);
    } else {
      if (prioritization == Prioritization.LOWDEGREES) {
        tol = toleratedError / Math.pow(2, degree + 0.5);
      } else {
        if (prioritization == Prioritization.SAMEPRIORITY) {
          tol = toleratedError * degree * 2 / (2 * maxDegree);
        }
      }
    }
    return tol;
  }

  private internal_feed(time: number, value: number): void {
    if (this.weights == null) {
      this.weights = new Array();
      this.weights[0] = value;
      this.timeOrigin = time;
      this.samples.add(new DataSample(time, value));
    }
  }

  private maxError(computedWeights: number[], time: number, value: number): number {
    var maxErr: number = 0;
    var temp: number = 0;
    var ds: DataSample;
    for (var i: number = 0; i < this.samples.size(); i++) {
      ds = this.samples.get(i);
      var val: number = this.internal_extrapolate(ds.time, computedWeights);
      temp = Math.abs(val - ds.value);
      if (temp > maxErr) {
        maxErr = temp;
      }
    }
    temp = Math.abs(this.internal_extrapolate(time, computedWeights) - value);
    if (temp > maxErr) {
      maxErr = temp;
    }
    return maxErr;
  }

  public comparePolynome(p2: DefaultPolynomialExtrapolation, err: number): boolean {
    if (this.weights.length != p2.weights.length) {
      return false;
    }
    for (var i: number = 0; i < this.weights.length; i++) {
      if (Math.abs(this.weights[i] - this.weights[i]) > err) {
        return false;
      }
    }
    return true;
  }

  private internal_extrapolate(time: number, weights: number[]): number {
    var result: number = 0;
    var t: number = (<number>(time - this.timeOrigin)) / this.degradeFactor;
    var power: number = 1;
    for (var j: number = 0; j < weights.length; j++) {
      result += weights[j] * power;
      power = power * t;
    }
    return result;
  }

  public extrapolate(time: number): number {
    return this.internal_extrapolate(time, this.weights);
  }

  public insert(time: number, value: number): boolean {
    if (this.weights == null) {
      this.internal_feed(time, value);
      this.lastIndex = time;
      return true;
    }
    var maxError: number = this.getMaxErr(this.getDegree(), this.toleratedError, this.maxDegree, this.prioritization);
    if (Math.abs(this.extrapolate(time) - value) <= maxError) {
      this.samples.add(new DataSample(time, value));
      this.lastIndex = time;
      return true;
    }
    var deg: number = this.getDegree();
    if (deg < this.maxDegree) {
      deg++;
      var ss: number = Math.min(deg * 2, this.samples.size());
      var times: number[] = new Array();
      var values: number[] = new Array();
      var current: number = this.samples.size();
      for (var i: number = 0; i < ss; i++) {
        var ds: DataSample = this.samples.get(i * current / ss);
        times[i] = (<number>(ds.time - this.timeOrigin)) / this.degradeFactor;
        values[i] = ds.value;
      }
      times[ss] = (<number>(time - this.timeOrigin)) / this.degradeFactor;
      values[ss] = value;
      var pf: PolynomialFitEjml = new PolynomialFitEjml(deg);
      pf.fit(times, values);
      if (this.maxError(pf.getCoef(), time, value) <= maxError) {
        this.weights = new Array();
        for (var i: number = 0; i < pf.getCoef().length; i++) {
          this.weights[i] = pf.getCoef()[i];
        }
        this.samples.add(new DataSample(time, value));
        this.lastIndex = time;
        return true;
      }
    }
    return false;
  }

  public lastIndex(): number {
    return 0;
  }

  public save(): string {
    var builder: StringBuilder = new StringBuilder();
    for (var i: number = 0; i < this.weights.length; i++) {
      if (i != 0) {
        builder.append(DefaultPolynomialExtrapolation.sep);
      }
      builder.append(this.weights[i]);
    }
    return builder.toString();
  }

  public load(payload: string): void {
    var elems: string[] = payload.split(DefaultPolynomialExtrapolation.sep + "");
    this.weights = new Array();
    for (var i: number = 0; i < elems.length; i++) {
      this.weights[i] = Long.parseLong(elems[i]);
    }
  }

}

