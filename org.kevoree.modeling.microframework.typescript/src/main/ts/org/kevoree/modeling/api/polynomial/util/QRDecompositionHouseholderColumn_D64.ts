
class QRDecompositionHouseholderColumn_D64 {

  public dataQR: number[][] = null;
  public v: number[] = null;
  public numCols: number = 0;
  public numRows: number = 0;
  public minLength: number = 0;
  public gammas: number[] = null;
  public gamma: number = 0;
  public tau: number = 0;
  public error: boolean = null;

  public setExpectedMaxSize(numRows: number, numCols: number): void {
    this.numCols = numCols;
    this.numRows = numRows;
    this.minLength = Math.min(numCols, numRows);
    var maxLength: number = Math.max(numCols, numRows);
    if (this.dataQR == null || this.dataQR.length < numCols || this.dataQR[0].length < numRows) {
      this.dataQR = new Array(new Array());
      this.v = new Array();
      this.gammas = new Array();
    }
    if (this.v.length < maxLength) {
      this.v = new Array();
    }
    if (this.gammas.length < this.minLength) {
      this.gammas = new Array();
    }
  }

  public getQ(Q: DenseMatrix64F, compact: boolean): DenseMatrix64F {
    if (compact) {
      if (Q == null) {
        Q = DenseMatrix64F.identity(this.numRows, this.minLength);
      } else {
        DenseMatrix64F.setIdentity(Q);
      }
    } else {
      if (Q == null) {
        Q = DenseMatrix64F.identity(this.numRows);
      } else {
        DenseMatrix64F.setIdentity(Q);
      }
    }
    for (var j: number = this.minLength - 1; j >= 0; j--) {
      var u: number[] = this.dataQR[j];
      var vv: number = u[j];
      u[j] = 1;
      QRDecompositionHouseholderColumn_D64.rank1UpdateMultR(Q, u, this.gammas[j], j, j, this.numRows, this.v);
      u[j] = vv;
    }
    return Q;
  }

  public getR(R: DenseMatrix64F, compact: boolean): DenseMatrix64F {
    if (R == null) {
      if (compact) {
        R = new DenseMatrix64F(this.minLength, this.numCols);
      } else {
        R = new DenseMatrix64F(this.numRows, this.numCols);
      }
    } else {
      for (var i: number = 0; i < R.numRows; i++) {
        var min: number = Math.min(i, R.numCols);
        for (var j: number = 0; j < min; j++) {
          R.set(i, j, 0);
        }
      }
    }
    for (var j: number = 0; j < this.numCols; j++) {
      var colR: number[] = this.dataQR[j];
      var l: number = Math.min(j, this.numRows - 1);
      for (var i: number = 0; i <= l; i++) {
        var val: number = colR[i];
        R.set(i, j, val);
      }
    }
    return R;
  }

  public decompose(A: DenseMatrix64F): boolean {
    this.setExpectedMaxSize(A.numRows, A.numCols);
    this.convertToColumnMajor(A);
    this.error = false;
    for (var j: number = 0; j < this.minLength; j++) {
      this.householder(j);
      this.updateA(j);
    }
    return !this.error;
  }

  public convertToColumnMajor(A: DenseMatrix64F): void {
    for (var x: number = 0; x < this.numCols; x++) {
      var colQ: number[] = this.dataQR[x];
      for (var y: number = 0; y < this.numRows; y++) {
        colQ[y] = A.data[y * this.numCols + x];
      }
    }
  }

  public householder(j: number): void {
    var u: number[] = this.dataQR[j];
    var max: number = QRDecompositionHouseholderColumn_D64.findMax(u, j, this.numRows - j);
    if (max == 0.0) {
      this.gamma = 0;
      this.error = true;
    } else {
      this.tau = QRDecompositionHouseholderColumn_D64.computeTauAndDivide(j, this.numRows, u, max);
      var u_0: number = u[j] + this.tau;
      QRDecompositionHouseholderColumn_D64.divideElements(j + 1, this.numRows, u, u_0);
      this.gamma = u_0 / this.tau;
      this.tau *= max;
      u[j] = -this.tau;
    }
    this.gammas[j] = this.gamma;
  }

  public updateA(w: number): void {
    var u: number[] = this.dataQR[w];
    for (var j: number = w + 1; j < this.numCols; j++) {
      var colQ: number[] = this.dataQR[j];
      var val: number = colQ[w];
      for (var k: number = w + 1; k < this.numRows; k++) {
        val += u[k] * colQ[k];
      }
      val *= this.gamma;
      colQ[w] -= val;
      for (var i: number = w + 1; i < this.numRows; i++) {
        colQ[i] -= u[i] * val;
      }
    }
  }

  public static findMax(u: number[], startU: number, length: number): number {
    var max: number = -1;
    var index: number = startU;
    var stopIndex: number = startU + length;
    for (; index < stopIndex; index++) {
      var val: number = u[index];
      val = (val < 0.0) ? -val : val;
      if (val > max) {
        max = val;
      }
    }
    return max;
  }

  public static divideElements(j: number, numRows: number, u: number[], u_0: number): void {
    for (var i: number = j; i < numRows; i++) {
      u[i] /= u_0;
    }
  }

  public static computeTauAndDivide(j: number, numRows: number, u: number[], max: number): number {
    var tau: number = 0;
    for (var i: number = j; i < numRows; i++) {
      var d: number = u[i] /= max;
      tau += d * d;
    }
    tau = Math.sqrt(tau);
    if (u[j] < 0) {
      tau = -tau;
    }
    return tau;
  }

  public static rank1UpdateMultR(A: DenseMatrix64F, u: number[], gamma: number, colA0: number, w0: number, w1: number, _temp: number[]): void {
    for (var i: number = colA0; i < A.numCols; i++) {
      _temp[i] = u[w0] * A.data[w0 * A.numCols + i];
    }
    for (var k: number = w0 + 1; k < w1; k++) {
      var indexA: number = k * A.numCols + colA0;
      var valU: number = u[k];
      for (var i: number = colA0; i < A.numCols; i++) {
        _temp[i] += valU * A.data[indexA++];
      }
    }
    for (var i: number = colA0; i < A.numCols; i++) {
      _temp[i] *= gamma;
    }
    for (var i: number = w0; i < w1; i++) {
      var valU: number = u[i];
      var indexA: number = i * A.numCols + colA0;
      for (var j: number = colA0; j < A.numCols; j++) {
        A.data[indexA++] -= valU * _temp[j];
      }
    }
  }

}

