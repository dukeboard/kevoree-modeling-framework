package org.kevoree.modeling.api.polynomial.ejml;

/**
 * Created by assaa_000 on 28/10/2014.
 */


public class DenseMatrix64F {
    public int numRows;

    public int numCols;


    public double[] data;


    public double get( int index ) {
        return data[index];
    }


    public double set( int index , double val ) {
        // See benchmarkFunctionReturn.  Pointless return does not degrade performance.  Tested on JDK 1.6.0_21
        return data[index] = val;
    }


    public double plus( int index , double val ) {
        // See benchmarkFunctionReturn.  Pointless return does not degrade performance.  Tested on JDK 1.6.0_21
        return data[index] += val;
    }


    public DenseMatrix64F( int numRows  , int numCols ) {
        data = new double[ numRows * numCols ];

        this.numRows = numRows;
        this.numCols = numCols;
    }


    public void reshape(int numRows, int numCols, boolean saveValues) {
        if( data.length < numRows * numCols ) {
            double []d = new double[ numRows*numCols ];

            if( saveValues ) {
                System.arraycopy(data,0,d,0,getNumElements());
            }

            this.data = d;
        }

        this.numRows = numRows;
        this.numCols = numCols;
    }


    public void set( int row , int col , double value ) {
        if( col < 0 || col >= numCols || row < 0 || row >= numRows ) {
            throw new IllegalArgumentException("Specified element is out of bounds: ("+row+" , "+col+")");
        }

        data[ row * numCols + col ] = value;
    }


    public double get( int row , int col ) {
        if( col < 0 || col >= numCols || row < 0 || row >= numRows ) {
            throw new IllegalArgumentException("Specified element is out of bounds: "+row+" "+col);
        }

        return data[ row * numCols + col ];
    }

    public double unsafe_get( int row , int col ) {
        return data[ row * numCols + col ];
    }


    public int getNumElements() {
        return numRows*numCols;
    }



    public void setReshape( DenseMatrix64F b)
    {
        int dataLength = b.getNumElements();

        if( data.length < dataLength ) {
            data = new double[ dataLength ];
        }

        this.numRows = b.numRows;
        this.numCols = b.numCols;

        System.arraycopy(b.data, 0, this.data, 0, dataLength);
    }


}
