package org.kevoree.modeling.api.polynomial.ejml;

/**
 * Created by assaa_000 on 28/10/2014.
 */
public class MatrixMatrixMult {

    public static void multTransA_reorder( DenseMatrix64F a , DenseMatrix64F b , DenseMatrix64F c )
    {
        if( a == c || b == c )
            throw new IllegalArgumentException("Neither 'a' or 'b' can be the same matrix as 'c'");
        else if( a.numRows != b.numRows ) {
            throw new MatrixDimensionException("The 'a' and 'b' matrices do not have compatible dimensions");
        } else if( a.numCols != c.numRows || b.numCols != c.numCols ) {
            throw new MatrixDimensionException("The results matrix does not have the desired dimensions");
        }

        if( a.numCols == 0 || a.numRows == 0 ) {
            CommonOps.fill(c,0);
            return;
        }
        double valA;

        for( int i = 0; i < a.numCols; i++ ) {
            int indexC_start = i*c.numCols;

            // first assign R
            valA = a.get(i);
            int indexB = 0;
            int end = indexB+b.numCols;
            int indexC = indexC_start;
            while( indexB<end ) {
                c.set( indexC++ , valA*b.get(indexB++));
            }
            // now increment it
            for( int k = 1; k < a.numRows; k++ ) {
                valA = a.unsafe_get(k,i);
                end = indexB+b.numCols;
                indexC = indexC_start;
                // this is the loop for j
                while( indexB<end ) {
                    c.plus( indexC++ , valA*b.get(indexB++));
                }
            }
        }
    }


    public static void multTransA_small( DenseMatrix64F a , DenseMatrix64F b , DenseMatrix64F c )
    {
        if( a == c || b == c )
            throw new IllegalArgumentException("Neither 'a' or 'b' can be the same matrix as 'c'");
        else if( a.numRows != b.numRows ) {
            throw new MatrixDimensionException("The 'a' and 'b' matrices do not have compatible dimensions");
        } else if( a.numCols != c.numRows || b.numCols != c.numCols ) {
            throw new MatrixDimensionException("The results matrix does not have the desired dimensions");
        }

        int cIndex = 0;

        for( int i = 0; i < a.numCols; i++ ) {
            for( int j = 0; j < b.numCols; j++ ) {
                int indexA = i;
                int indexB = j;
                int end = indexB + b.numRows*b.numCols;

                double total = 0;

                // loop for k
                for(; indexB < end; indexB += b.numCols ) {
                    total += a.get(indexA) * b.get(indexB);
                    indexA += a.numCols;
                }

                c.set( cIndex++ , total );
            }
        }
    }

}
