package org.kevoree.modeling.api.polynomial.ejml;

/**
 * Created by assaa_000 on 28/10/2014.
 */
public class AdjLinearSolverQr {

    protected int numRows;
    protected int numCols;


    protected void _setA(DenseMatrix64F A) {
        this.numRows = A.numRows;
        this.numCols = A.numCols;
    }

    private QRDecompositionHouseholderColumn_D64 decomposer;

    protected int maxRows = -1;
    protected int maxCols = -1;

    protected DenseMatrix64F Q;
    protected DenseMatrix64F R;

    private DenseMatrix64F Y,Z;




    public boolean setA(DenseMatrix64F A) {
        if( A.numRows > maxRows || A.numCols > maxCols ) {
            setMaxSize(A.numRows,A.numCols);
        }

        _setA(A);
        if( !decomposer.decompose(A) )
            return false;

        Q.reshape(numRows,numRows, false);
        R.reshape(numRows,numCols, false);
        decomposer.getQ(Q,false);
        decomposer.getR(R,false);

        return true;
    }


    private void solveU( double U[] , double []b , int n )
    {
//        for( int i =n-1; i>=0; i-- ) {
//            double sum = b[i];
//            for( int j = i+1; j <n; j++ ) {
//                sum -= U[i*n+j]* b[j];
//            }
//            b[i] = sum/U[i*n+i];
//        }
        for( int i =n-1; i>=0; i-- ) {
            double sum = b[i];
            int indexU = i*n+i+1;
            for( int j = i+1; j <n; j++ ) {
                sum -= U[indexU++]* b[j];
            }
            b[i] = sum/U[i*n+i];
        }
    }


    public void solve(DenseMatrix64F B, DenseMatrix64F X) {
        if( X.numRows != numCols )
            throw new IllegalArgumentException("Unexpected dimensions for X");
        else if( B.numRows != numRows || B.numCols != X.numCols )
            throw new IllegalArgumentException("Unexpected dimensions for B");

        int BnumCols = B.numCols;

        Y.reshape(numRows,1, false);
        Z.reshape(numRows,1, false);

        // solve each column one by one
        for( int colB = 0; colB < BnumCols; colB++ ) {

            // make a copy of this column in the vector
            for( int i = 0; i < numRows; i++ ) {
                Y.data[i] = B.get(i,colB);
            }

            // Solve Qa=b
            // a = Q'b
            CommonOps.multTransA(Q,Y,Z);

            // solve for Rx = b using the standard upper triangular solver
            solveU(R.data, Z.data, numCols);

            // save the results
            for( int i = 0; i < numCols; i++ ) {
                X.set(i,colB,Z.data[i]);
            }
        }
    }


    public AdjLinearSolverQr() {
        this.decomposer = new QRDecompositionHouseholderColumn_D64();
    }

    public void setMaxSize( int maxRows , int maxCols ) {
        // allow it some room to grow
        maxRows += 5;

        this.maxRows = maxRows; this.maxCols = maxCols;

        Q = new DenseMatrix64F(maxRows,maxRows);
        R = new DenseMatrix64F(maxRows,maxCols);

        Y = new DenseMatrix64F(maxRows,1);
        Z = new DenseMatrix64F(maxRows,1);

        //update = new QrUpdate(maxRows,maxCols,true);
        //A = new DenseMatrix64F(maxRows,maxCols);
    }

}
