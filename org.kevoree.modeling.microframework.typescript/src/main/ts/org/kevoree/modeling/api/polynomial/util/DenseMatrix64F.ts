///<reference path="../../../../../../java/util/Arrays.ts"/>

class DenseMatrix64F {

  public numRows: number = 0;
  public numCols: number = 0;
  public data: number[] = null;
  public static MULT_COLUMN_SWITCH: number = 15;

  public static multTransA_smallMV(A: DenseMatrix64F, B: DenseMatrix64F, C: DenseMatrix64F): void {
    var cIndex: number = 0;
    for (var i: number = 0; i < A.numCols; i++) {
      var total: number = 0.0;
      var indexA: number = i;
      for (var j: number = 0; j < A.numRows; j++) {
        total += A.get(indexA) * B.get(j);
        indexA += A.numCols;
      }
      C.set(cIndex++, total);
    }
  }

  public static multTransA_reorderMV(A: DenseMatrix64F, B: DenseMatrix64F, C: DenseMatrix64F): void {
    if (A.numRows == 0) {
      DenseMatrix64F.fill(C, 0);
      return;
    }
    var B_val: number = B.get(0);
    for (var i: number = 0; i < A.numCols; i++) {
      C.set(i, A.get(i) * B_val);
    }
    var indexA: number = A.numCols;
    for (var i: number = 1; i < A.numRows; i++) {
      B_val = B.get(i);
      for (var j: number = 0; j < A.numCols; j++) {
        C.plus(j, A.get(indexA++) * B_val);
      }
    }
  }

  public static multTransA_reorderMM(a: DenseMatrix64F, b: DenseMatrix64F, c: DenseMatrix64F): void {
    if (a.numCols == 0 || a.numRows == 0) {
      DenseMatrix64F.fill(c, 0);
      return;
    }
    var valA: number;
    for (var i: number = 0; i < a.numCols; i++) {
      var indexC_start: number = i * c.numCols;
      valA = a.get(i);
      var indexB: number = 0;
      var end: number = indexB + b.numCols;
      var indexC: number = indexC_start;
      while (indexB < end){
        c.set(indexC++, valA * b.get(indexB++));
      }
      for (var k: number = 1; k < a.numRows; k++) {
        valA = a.unsafe_get(k, i);
        end = indexB + b.numCols;
        indexC = indexC_start;
        while (indexB < end){
          c.plus(indexC++, valA * b.get(indexB++));
        }
      }
    }
  }

  public static multTransA_smallMM(a: DenseMatrix64F, b: DenseMatrix64F, c: DenseMatrix64F): void {
    var cIndex: number = 0;
    for (var i: number = 0; i < a.numCols; i++) {
      for (var j: number = 0; j < b.numCols; j++) {
        var indexA: number = i;
        var indexB: number = j;
        var end: number = indexB + b.numRows * b.numCols;
        var total: number = 0;
        for (; indexB < end; indexB += b.numCols) {
          total += a.get(indexA) * b.get(indexB);
          indexA += a.numCols;
        }
        c.set(cIndex++, total);
      }
    }
  }

  public static multTransA(a: DenseMatrix64F, b: DenseMatrix64F, c: DenseMatrix64F): void {
    if (b.numCols == 1) {
      if (a.numCols >= DenseMatrix64F.MULT_COLUMN_SWITCH) {
        DenseMatrix64F.multTransA_reorderMV(a, b, c);
      } else {
        DenseMatrix64F.multTransA_smallMV(a, b, c);
      }
    } else {
      if (a.numCols >= DenseMatrix64F.MULT_COLUMN_SWITCH || b.numCols >= DenseMatrix64F.MULT_COLUMN_SWITCH) {
        DenseMatrix64F.multTransA_reorderMM(a, b, c);
      } else {
        DenseMatrix64F.multTransA_smallMM(a, b, c);
      }
    }
  }

  public static setIdentity(mat: DenseMatrix64F): void {
    var width: number = mat.numRows < mat.numCols ? mat.numRows : mat.numCols;
    Arrays.fill(mat.data, 0, mat.getNumElements(), 0);
    var index: number = 0;
    for (var i: number = 0; i < width; i++) {
      mat.data[index] = 1;
      index += mat.numCols + 1;
    }
  }

  public static widentity(width: number): DenseMatrix64F {
    var ret: DenseMatrix64F = new DenseMatrix64F(width, width);
    for (var i: number = 0; i < width; i++) {
      ret.cset(i, i, 1.0);
    }
    return ret;
  }

  public static identity(numRows: number, numCols: number): DenseMatrix64F {
    var ret: DenseMatrix64F = new DenseMatrix64F(numRows, numCols);
    var small: number = numRows < numCols ? numRows : numCols;
    for (var i: number = 0; i < small; i++) {
      ret.cset(i, i, 1.0);
    }
    return ret;
  }

  public static fill(a: DenseMatrix64F, value: number): void {
    Arrays.fill(a.data, 0, a.getNumElements(), value);
  }

  public get(index: number): number {
    return this.data[index];
  }

  public set(index: number, val: number): number {
    return this.data[index] = val;
  }

  public plus(index: number, val: number): number {
    return this.data[index] += val;
  }

  constructor(numRows: number, numCols: number) {
    this.data = new Array();
    this.numRows = numRows;
    this.numCols = numCols;
  }

  public reshape(numRows: number, numCols: number, saveValues: boolean): void {
    if (this.data.length < numRows * numCols) {
      var d: number[] = new Array();
      if (saveValues) {
        System.arraycopy(this.data, 0, d, 0, this.getNumElements());
      }
      this.data = d;
    }
    this.numRows = numRows;
    this.numCols = numCols;
  }

  public cset(row: number, col: number, value: number): void {
    this.data[row * this.numCols + col] = value;
  }

  public unsafe_get(row: number, col: number): number {
    return this.data[row * this.numCols + col];
  }

  public getNumElements(): number {
    return this.numRows * this.numCols;
  }

}

