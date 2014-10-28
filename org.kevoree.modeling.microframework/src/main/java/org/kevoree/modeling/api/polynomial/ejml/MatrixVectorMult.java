package org.kevoree.modeling.api.polynomial.ejml;

/**
 * Created by assaa_000 on 28/10/2014.
 */
public class MatrixVectorMult {

    public static void multTransA_small( DenseMatrix64F A , DenseMatrix64F B , DenseMatrix64F C )
    {
        if( C.numCols != 1 ) {
            throw new MatrixDimensionException("C is not a column vector");
        } else if( C.numRows != A.numCols ) {
            throw new MatrixDimensionException("C is not the expected length");
        }
        if( B.numRows == 1 ) {
            if( A.numRows != B.numCols ) {
                throw new MatrixDimensionException("A and B are not compatible");
            }
        } else if( B.numCols == 1 ) {
            if( A.numRows != B.numRows ) {
                throw new MatrixDimensionException("A and B are not compatible");
            }
        } else {
            throw new MatrixDimensionException("B is not a vector");
        }

        int cIndex = 0;
        for( int i = 0; i < A.numCols; i++ ) {
            double total = 0.0;

            int indexA = i;
            for( int j = 0; j < A.numRows; j++ ) {
                total += A.get(indexA) * B.get(j);
                indexA += A.numCols;
            }

            C.set(cIndex++ , total);
        }
    }


    public static void multTransA_reorder( DenseMatrix64F A , DenseMatrix64F B , DenseMatrix64F C )
    {
        if( C.numCols != 1 ) {
            throw new MatrixDimensionException("C is not a column vector");
        } else if( C.numRows != A.numCols ) {
            throw new MatrixDimensionException("C is not the expected length");
        }
        if( B.numRows == 1 ) {
            if( A.numRows != B.numCols ) {
                throw new MatrixDimensionException("A and B are not compatible");
            }
        } else if( B.numCols == 1 ) {
            if( A.numRows != B.numRows ) {
                throw new MatrixDimensionException("A and B are not compatible");
            }
        } else {
            throw new MatrixDimensionException("B is not a vector");
        }

        if( A.numRows == 0 ) {
            CommonOps.fill(C,0);
            return;
        }

        double B_val = B.get(0);
        for( int i = 0; i < A.numCols; i++ ) {
            C.set( i , A.get(i) * B_val );
        }

        int indexA = A.numCols;
        for( int i = 1; i < A.numRows; i++ ) {
            B_val = B.get(i);
            for( int j = 0; j < A.numCols; j++ ) {
                C.plus(  j , A.get(indexA++) * B_val );
            }
        }
    }

}
