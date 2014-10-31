
class AdjLinearSolverQr {

  public numRows: number = 0;
  public numCols: number = 0;
  private decomposer: QRDecompositionHouseholderColumn_D64 = null;
  public maxRows: number = -1;
  public maxCols: number = -1;
  public Q: DenseMatrix64F = null;
  public R: DenseMatrix64F = null;
  private Y: DenseMatrix64F = null;
  private Z: DenseMatrix64F = null;

  public setA(A: DenseMatrix64F): boolean {
    if (A.numRows > this.maxRows || A.numCols > this.maxCols) {
      this.setMaxSize(A.numRows, A.numCols);
    }
    this.numRows = A.numRows;
    this.numCols = A.numCols;
    if (!this.decomposer.decompose(A)) {
      return false;
    }
    this.Q.reshape(this.numRows, this.numRows, false);
    this.R.reshape(this.numRows, this.numCols, false);
    this.decomposer.getQ(this.Q, false);
    this.decomposer.getR(this.R, false);
    return true;
  }

  private solveU(U: number[], b: number[], n: number): void {
    for (var i: number = n - 1; i >= 0; i--) {
      var sum: number = b[i];
      var indexU: number = i * n + i + 1;
      for (var j: number = i + 1; j < n; j++) {
        sum -= U[indexU++] * b[j];
      }
      b[i] = sum / U[i * n + i];
    }
  }

  public solve(B: DenseMatrix64F, X: DenseMatrix64F): void {
    var BnumCols: number = B.numCols;
    this.Y.reshape(this.numRows, 1, false);
    this.Z.reshape(this.numRows, 1, false);
    for (var colB: number = 0; colB < BnumCols; colB++) {
      for (var i: number = 0; i < this.numRows; i++) {
        this.Y.data[i] = B.unsafe_get(i, colB);
      }
      DenseMatrix64F.multTransA(this.Q, this.Y, this.Z);
      this.solveU(this.R.data, this.Z.data, this.numCols);
      for (var i: number = 0; i < this.numCols; i++) {
        X.set(i, colB, this.Z.data[i]);
      }
    }
  }

  constructor() {
    this.decomposer = new QRDecompositionHouseholderColumn_D64();
  }

  public setMaxSize(maxRows: number, maxCols: number): void {
    maxRows += 5;
    this.maxRows = maxRows;
    this.maxCols = maxCols;
    this.Q = new DenseMatrix64F(maxRows, maxRows);
    this.R = new DenseMatrix64F(maxRows, maxCols);
    this.Y = new DenseMatrix64F(maxRows, 1);
    this.Z = new DenseMatrix64F(maxRows, 1);
  }

}

