import org.codehaus.jettison.AbstractXMLStreamReader;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.codehaus.jettison.json.JSONTokener;
import org.codehaus.jettison.mapped.MappedXMLStreamReader;
import org.kevoree.loader.ModelLoader;

import javax.xml.stream.XMLStreamException;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/03/13
 * Time: 14:36
 */
public class TestLoader  {

    public static void main(String[] args) throws IOException, JSONException, XMLStreamException {


        FileReader reader = new FileReader(new File("/var/folders/dq/_bgn79zj25n9w8jbs3x228l80000gn/T/jsonXMI782957124883974594jsonXMI"));
        BufferedReader readerbuf = new BufferedReader(reader);
        StringBuilder builder = new StringBuilder();
        for (String line = null; (line = readerbuf.readLine()) != null;) {
            builder.append(line).append("\n");
        }
        JSONTokener tokener = new JSONTokener(builder.toString());
        AbstractXMLStreamReader readerStax = new MappedXMLStreamReader(new JSONObject(tokener));

        ModelLoader loader = new ModelLoader();
        loader.deserialize(readerStax);



    }


}
