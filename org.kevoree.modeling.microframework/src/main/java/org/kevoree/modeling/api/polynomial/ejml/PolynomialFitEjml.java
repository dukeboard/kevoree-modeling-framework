package org.kevoree.modeling.api.polynomial.ejml;

import org.kevoree.modeling.api.polynomial.brain.Polynomial;

/**
 * Created by assaa_000 on 28/10/2014.
 */
public class PolynomialFitEjml implements Polynomial {

    // Vandermonde matrix
    DenseMatrix64F A;
    // matrix containing computed polynomial coefficients
    DenseMatrix64F coef;
    // observation matrix
    DenseMatrix64F y;

    // solver used to compute
    AdjLinearSolverQr solver;


    public PolynomialFitEjml(int degree) {
        coef = new DenseMatrix64F(degree+1,1);
        A = new DenseMatrix64F(1,degree+1);
        y = new DenseMatrix64F(1,1);

        // create a solver that allows elements to be added or removed efficiently
        solver = new AdjLinearSolverQr();
    }



    public double[] getCoef() {
        return coef.data;
    }


    public void fit( double samplePoints[] , double[] observations ) {
        y.reshape(observations.length,1,false);
        System.arraycopy(observations,0, y.data,0,observations.length);
        A.reshape(y.numRows, coef.numRows,false);

        // set up the A matrix
        for( int i = 0; i < observations.length; i++ ) {

            double obs = 1;

            for( int j = 0; j < coef.numRows; j++ ) {
                A.set(i,j,obs);
                obs *= samplePoints[i];
            }
        }

        // process the A matrix and see if it failed
        if( !solver.setA(A) )
            throw new RuntimeException("Solver failed");

        solver.solve(y,coef);
    }

}
