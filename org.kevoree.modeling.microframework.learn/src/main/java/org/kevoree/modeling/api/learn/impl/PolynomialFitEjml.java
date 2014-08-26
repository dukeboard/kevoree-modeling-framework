package org.kevoree.modeling.api.learn.impl;

import org.ejml.alg.dense.linsol.AdjustableLinearSolver;
import org.ejml.data.DenseMatrix64F;
import org.ejml.factory.LinearSolverFactory;

import java.util.Random;

/**
 * Created by assaa_000 on 8/19/2014.
 */
public class PolynomialFitEjml {

    // Vandermonde matrix
    DenseMatrix64F A;
    // matrix containing computed polynomial coefficients
    DenseMatrix64F coef;
    // observation matrix
    DenseMatrix64F y;

    // solver used to compute
    AdjustableLinearSolver solver;

    private int degree;

    public PolynomialFitEjml(double samplePoints[], double[] observations) {

        this.degree = findbestdegree(samplePoints, observations);


        coef = new DenseMatrix64F(degree + 1, 1);
        A = new DenseMatrix64F(1, degree + 1);
        y = new DenseMatrix64F(1, 1);

        // create a solver that allows elements to be added or removed efficiently
        solver = LinearSolverFactory.adjustable();
        this.fit(samplePoints, observations);
    }

    public PolynomialFitEjml(int degree) {
        this.degree = degree;
        coef = new DenseMatrix64F(degree + 1, 1);
        A = new DenseMatrix64F(1, degree + 1);
        y = new DenseMatrix64F(1, 1);

        // create a solver that allows elements to be added or removed efficiently
        solver = LinearSolverFactory.adjustable();
    }

    /**
     * Returns the computed coefficients
     *
     * @return polynomial coefficients that best fit the data.
     */

    public double[] getCoef() {
        return coef.data;
    }

    /**
     * Computes the best fit set of polynomial coefficients to the provided observations.
     *
     * @param samplePoints where the observations were sampled.
     * @param observations A set of observations.
     */
    public void fit(double samplePoints[], double[] observations) {
        // Create a copy of the observations and put it into a matrix
        y.reshape(observations.length, 1, false);
        System.arraycopy(observations, 0, y.data, 0, observations.length);

        // reshape the matrix to avoid unnecessarily declaring new memory
        // save values is set to false since its old values don't matter
        A.reshape(y.numRows, coef.numRows, false);

        // set up the A matrix
        for (int i = 0; i < observations.length; i++) {

            double obs = 1;

            for (int j = 0; j < coef.numRows; j++) {
                A.set(i, j, obs);
                obs *= samplePoints[i];
            }
        }

        // process the A matrix and see if it failed
        if (!solver.setA(A))
            throw new RuntimeException("Solver failed");

        // solver the the coefficients
        solver.solve(y, coef);
    }

    public double getError(double samplePoints[], double[] observations) {
        double err = 0;
        double val = 0;

        for (int i = 0; i < samplePoints.length; i++) {
            val = calculate(samplePoints[i]);
            err += ((val - observations[i]) * (val - observations[i]));
        }
        err = Math.sqrt(err);

        return err / samplePoints.length;
    }


    private static int findbestdegree(double samplePoints[], double[] observations) {
        int degree = 1;
        double err = -1;
        int bestdeg = 0;
        PolynomialFitEjml best = null;


        if (samplePoints.length < 2) {
            return 1;

        }
        int maxdegree = Math.min(samplePoints.length, 25);

        for (degree = 1; degree < maxdegree; degree++) {
            double error = 0;
            for (int count = 0; count < 10; count++) {
                int testsize = Math.max(3, (int) (samplePoints.length * 0.1));
                double[] sampleTraining = new double[samplePoints.length - testsize];
                double[] observationTraining = new double[samplePoints.length - testsize];
                double[] sampleCsv = new double[testsize];
                double[] observationCsv = new double[testsize];

                int[] all = new int[samplePoints.length];
                for (int i = 0; i < all.length; i++)
                    all[i] = i;

                int temp = all[0];
                all[0] = all[all.length - 2];
                all[all.length - 2] = temp;

                Random rand = new Random();
                for (int i = 1; i < all.length - 2; i++) {
                    temp = all[i];
                    int r = rand.nextInt(all.length - 1);
                    all[i] = all[r];
                    all[r] = temp;
                }


                for (int i = 0; i < testsize; i++) {
                    sampleCsv[i] = samplePoints[all[i]];
                    observationCsv[i] = observations[all[i]];
                }
                for (int i = testsize; i < samplePoints.length; i++) {
                    sampleTraining[i - testsize] = samplePoints[all[i]];
                    observationTraining[i - testsize] = observations[all[i]];
                }

                PolynomialFitEjml pf = new PolynomialFitEjml(degree);
                pf.fit(sampleTraining, observationTraining);

                error += pf.getError(sampleCsv, observationCsv);
            }

            if (err < 0 || error < err) {
                err = error;
                bestdeg = degree;
            }

        }

        return bestdeg;
    }


    public double calculate(double t) {
        double[] factor = getCoef();
        double result = 0;
        double powT = 1;

        for (double d : factor) {
            result += d * powT;
            powT = powT * t;
        }

        return result;
    }

    /**
     * Removes the observation that fits the model the worst and recomputes the coefficients.
     * This is done efficiently by using an adjustable solver.  Often times the elements with
     * the largest errors are outliers and not part of the system being modeled.  By removing them
     * a more accurate set of coefficients can be computed.
     */
    public void removeWorstFit() {
        // find the observation with the most error
        int worstIndex = -1;
        double worstError = -1;

        for (int i = 0; i < y.numRows; i++) {
            double predictedObs = 0;

            for (int j = 0; j < coef.numRows; j++) {
                predictedObs += A.get(i, j) * coef.get(j, 0);
            }

            double error = Math.abs(predictedObs - y.get(i, 0));

            if (error > worstError) {
                worstError = error;
                worstIndex = i;
            }
        }

        // nothing left to remove, so just return
        if (worstIndex == -1)
            return;

        // remove that observation
        removeObservation(worstIndex);

        // update A
        solver.removeRowFromA(worstIndex);

        // solve for the parameters again
        solver.solve(y, coef);
    }

    /**
     * Removes an element from the observation matrix.
     *
     * @param index which element is to be removed
     */
    private void removeObservation(int index) {
        final int N = y.numRows - 1;
        final double d[] = y.data;

        // shift
        for (int i = index; i < N; i++) {
            d[i] = d[i + 1];
        }
        y.numRows--;
    }

    public int getDegree() {
        return degree;
    }

    public void print() {
        double[] coef = this.getCoef();
        System.out.println("Function is");
        int counter = 0;
        for (double d : coef) {
            System.out.println(d + " * t" + counter);
            counter++;
        }
    }
}