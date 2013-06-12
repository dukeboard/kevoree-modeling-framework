package tester;

import org.kevoree.loader.JSONModelLoader;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 12/06/13
 * Time: 15:21
 */
public class FixJSON {


    public static void main(String args[]){
       System.out.println("Yop");

        JSONModelLoader loader = new JSONModelLoader();

        loader.loadModelFromStream(FixJSON.class.getClassLoader().getResourceAsStream("modelAllBad.json"));



    }

}
