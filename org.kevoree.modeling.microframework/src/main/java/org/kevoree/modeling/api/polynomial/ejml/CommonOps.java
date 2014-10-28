package org.kevoree.modeling.api.polynomial.ejml;

import java.util.Arrays;

/**
 * Created by assaa_000 on 28/10/2014.
 */
public class CommonOps {


    public static void multTransA( DenseMatrix64F a , DenseMatrix64F b , DenseMatrix64F c )
    {
        if( b.numCols == 1 ) {
            // todo check a.numCols == 1 and do inner product?
            // there are significantly faster algorithms when dealing with vectors
            if( a.numCols >= EjmlParameters.MULT_COLUMN_SWITCH ) {
                MatrixVectorMult.multTransA_reorder(a,b,c);
            } else {
                MatrixVectorMult.multTransA_small(a,b,c);
            }
        } else if( a.numCols >= EjmlParameters.MULT_COLUMN_SWITCH ||
                b.numCols >= EjmlParameters.MULT_COLUMN_SWITCH  ) {
            MatrixMatrixMult.multTransA_reorder(a,b,c);
        } else {
            MatrixMatrixMult.multTransA_small(a,b,c);
        }
    }



    public static void setIdentity( DenseMatrix64F mat )
    {
        int width = mat.numRows < mat.numCols ? mat.numRows : mat.numCols;

        Arrays.fill(mat.data,0,mat.getNumElements(),0);

        int index = 0;
        for( int i = 0; i < width; i++ , index += mat.numCols + 1) {
            mat.data[index] = 1;
        }
    }


    public static DenseMatrix64F identity( int width )
    {
        DenseMatrix64F ret = new DenseMatrix64F(width,width);

        for( int i = 0; i < width; i++ ) {
            ret.set(i,i,1.0);
        }

        return ret;
    }


    public static DenseMatrix64F identity( int numRows , int numCols )
    {
        DenseMatrix64F ret = new DenseMatrix64F(numRows,numCols);

        int small = numRows < numCols ? numRows : numCols;

        for( int i = 0; i < small; i++ ) {
            ret.set(i,i,1.0);
        }

        return ret;
    }


    public static void fill(DenseMatrix64F a, double value)
    {
        Arrays.fill(a.data,0,a.getNumElements(),value);
    }

}