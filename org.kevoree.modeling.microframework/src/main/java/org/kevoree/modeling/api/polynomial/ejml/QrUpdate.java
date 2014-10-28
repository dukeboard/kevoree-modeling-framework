package org.kevoree.modeling.api.polynomial.ejml;

/**
 * Created by assaa_000 on 28/10/2014.
 */
public class QrUpdate {

    // the decomposition that is being adjusted
    private DenseMatrix64F Q,R;
    // product of planar multiplications
    private DenseMatrix64F U_tran; // using transpose of U reduces cache misses
    private DenseMatrix64F Qm;

    // it can process matrices up to this size
    private int maxCols;
    private int maxRows;

    // number of rows and columns in the original A matrix that was decomposed
    private int m,n;
    // number of rows in the adjusted matrices
    private int m_m;

    // should it declare new internal data when what currently exists is too small or throw
    // and exception.
    private boolean autoGrow;

    public QrUpdate( int maxRows , int maxCols , boolean autoGrow ) {
        this.autoGrow = autoGrow;
        declareInternalData(maxRows, maxCols);
    }


    public void declareInternalData(int maxRows, int maxCols) {
        this.maxRows = maxRows;
        this.maxCols = maxCols;

        U_tran = new DenseMatrix64F(maxRows,maxRows);
        Qm = new DenseMatrix64F(maxRows,maxRows);

        //r_row = new double[ maxCols ];
    }


    private void setQR( DenseMatrix64F Q , DenseMatrix64F R , int growRows ) {
        if( Q.numRows != Q.numCols ) {
            throw new IllegalArgumentException("Q should be square.");
        }

        this.Q = Q;
        this.R = R;

        m = Q.numRows;
        n = R.numCols;

        if( m+growRows > maxRows || n > maxCols ) {
            if( autoGrow ) {
                declareInternalData(m+growRows,n);
            } else {
                throw new IllegalArgumentException("Autogrow has been set to false and the maximum number of rows" +
                        " or columns has been exceeded.");
            }
        }
    }


    private void updateRemoveQ( int rowIndex ) {
        Qm.setReshape(Q);
        Q.reshape(m_m,m_m, false);

        for( int i = 0; i < rowIndex; i++ ) {
            for( int j = 1; j < m; j++ ) {
                double sum = 0;
                for( int k = 0; k < m; k++ ) {
                    sum += Qm.data[i*m+k]* U_tran.data[j*m+k];
                }
                Q.data[i*m_m+j-1] = sum;
            }
        }

        for( int i = rowIndex+1; i < m; i++ ) {
            for( int j = 1; j < m; j++ ) {
                double sum = 0;
                for( int k = 0; k < m; k++ ) {
                    sum += Qm.data[i*m+k]* U_tran.data[j*m+k];
                }
                Q.data[(i-1)*m_m+j-1] = sum;
            }
        }
    }


    private void updateRemoveR() {
        for( int i = 1; i < n+1; i++ ) {
            for( int j = 0; j < n; j++ ) {
                double sum = 0;
                for( int k = i-1; k <= j; k++ ) {
                    sum += U_tran.data[i*m+k] * R.data[k*n+j];
                }
                R.data[(i-1)*n+j] = sum;
            }
        }
    }

    private void computeRemoveGivens( int selectedRow )
    {
        CommonOps.setIdentity(U_tran);

        double xj = Q.data[selectedRow*m+m-1];

        for( int j = m-2; j >= 0; j-- ) {
            // first compute the rotation
            double c,s;
            double xi = Q.data[selectedRow*m+j];

            double r = xi*xi + xj*xj;
            if( r != 0 ) {
                r = Math.sqrt(r);
                c = xi/r;
                s = xj/r;
            } else {
                c = 1;
                s = 0;
            }

            // in the next iteration xj is r
            xj = r;

            // compute U^T = U^T_(x+1) * U^T_x
            for( int col = j; col < m; col++ ) {
                double q1 = U_tran.data[j*m+col];
                double q2 = U_tran.data[(j+1)*m+col];

                U_tran.data[j*m+col] = c*q1 + s*q2;
                U_tran.data[(j+1)*m+col] = c*q2 - s*q1;
            }
        }
    }

}
