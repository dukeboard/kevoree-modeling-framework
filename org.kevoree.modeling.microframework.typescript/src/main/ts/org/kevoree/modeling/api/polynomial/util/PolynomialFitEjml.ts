
class PolynomialFitEjml {

  public A: DenseMatrix64F = null;
  public coef: DenseMatrix64F = null;
  public y: DenseMatrix64F = null;
  public solver: AdjLinearSolverQr = null;

  constructor(degree: number) {
    this.coef = new DenseMatrix64F(degree + 1, 1);
    this.A = new DenseMatrix64F(1, degree + 1);
    this.y = new DenseMatrix64F(1, 1);
    this.solver = new AdjLinearSolverQr();
  }

  public getCoef(): number[] {
    return this.coef.data;
  }

  public fit(samplePoints: number[], observations: number[]): void {
    this.y.reshape(observations.length, 1, false);
    System.arraycopy(observations, 0, this.y.data, 0, observations.length);
    this.A.reshape(this.y.numRows, this.coef.numRows, false);
    for (var i: number = 0; i < observations.length; i++) {
      var obs: number = 1;
      for (var j: number = 0; j < this.coef.numRows; j++) {
        this.A.set(i, j, obs);
        obs *= samplePoints[i];
      }
    }
    this.solver.setA(this.A);
    this.solver.solve(this.y, this.coef);
  }

}

