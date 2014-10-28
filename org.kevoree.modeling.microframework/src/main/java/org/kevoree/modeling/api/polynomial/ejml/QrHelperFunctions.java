package org.kevoree.modeling.api.polynomial.ejml;

/**
 * Created by assaa_000 on 28/10/2014.
 */
public class QrHelperFunctions {

    public static double findMax( double[] u, int startU , int length ) {
        double max = -1;

        int index = startU;
        int stopIndex = startU + length;
        for( ; index < stopIndex; index++ ) {
            double val = u[index];
            val = (val < 0.0D) ? -val : val;
            if( val > max )
                max = val;
        }

        return max;
    }

    public static void divideElements(final int j, final int numRows ,
                                      final double[] u, final double u_0 ) {
//        double div_u = 1.0/u_0;
//
//        if( Double.isInfinite(div_u)) {
        for( int i = j; i < numRows; i++ ) {
            u[i] /= u_0;
        }
//        } else {
//            for( int i = j; i < numRows; i++ ) {
//                u[i] *= div_u;
//            }
//        }
    }


    public static double computeTauAndDivide(final int j, final int numRows ,
                                             final double[] u , final double max) {
        double tau = 0;
//        double div_max = 1.0/max;
//        if( Double.isInfinite(div_max)) {
        for( int i = j; i < numRows; i++ ) {
            double d = u[i] /= max;
            tau += d*d;
        }
//        } else {
//            for( int i = j; i < numRows; i++ ) {
//                double d = u[i] *= div_max;
//                tau += d*d;
//            }
//        }
        tau = Math.sqrt(tau);

        if( u[j] < 0 )
            tau = -tau;

        return tau;
    }


    public static void rank1UpdateMultR( DenseMatrix64F A , double u[] , double gamma ,
                                         int colA0,
                                         int w0, int w1 ,
                                         double _temp[] )
    {
//        for( int i = colA0; i < A.numCols; i++ ) {
//            double val = 0;
//
//            for( int k = w0; k < w1; k++ ) {
//                val += u[k]*A.data[k*A.numCols +i];
//            }
//            _temp[i] = gamma*val;
//        }

        // reordered to reduce cpu cache issues
        for( int i = colA0; i < A.numCols; i++ ) {
            _temp[i] = u[w0]*A.data[w0 *A.numCols +i];
        }

        for( int k = w0+1; k < w1; k++ ) {
            int indexA = k*A.numCols + colA0;
            double valU = u[k];
            for( int i = colA0; i < A.numCols; i++ ) {
                _temp[i] += valU*A.data[indexA++];
            }
        }
        for( int i = colA0; i < A.numCols; i++ ) {
            _temp[i] *= gamma;
        }

        // end of reorder

        for( int i = w0; i < w1; i++ ) {
            double valU = u[i];

            int indexA = i*A.numCols + colA0;
            for( int j = colA0; j < A.numCols; j++ ) {
                A.data[indexA++] -= valU*_temp[j];
            }
        }
    }

}
