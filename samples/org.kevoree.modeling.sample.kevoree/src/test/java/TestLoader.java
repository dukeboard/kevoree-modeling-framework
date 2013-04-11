
import com.google.gson.stream.JsonReader;

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

    public static void main(String[] args) throws IOException {

        FileReader freader = new FileReader(new File("/var/folders/6n/ck0f5nk107x6zgsbq7llk7j8tnk81r/T/jsonXMI2103046917755608438jsonXMI"));
        //BufferedReader readerbuf = new BufferedReader(reader);

        JsonReader reader = new JsonReader(freader);

        reader.beginObject();

        while (reader.hasNext()) {

            String name = reader.nextName();

            if (name.equals("name")) {

                System.out.println(reader.nextString());

            } else if (name.equals("age")) {

                System.out.println(reader.nextInt());

            } else if (name.equals("message")) {

                // read array
                reader.beginArray();

                while (reader.hasNext()) {
                    System.out.println(reader.nextString());
                }

                reader.endArray();

            } else {
                reader.skipValue(); //avoid some unhandle events
            }
        }

        reader.endObject();
        reader.close();

    }

/*

        FileReader reader = new FileReader(new File("/var/folders/6n/ck0f5nk107x6zgsbq7llk7j8tnk81r/T/jsonXMI4684125067540683092jsonXMI"));
        BufferedReader readerbuf = new BufferedReader(reader);
        StringBuilder builder = new StringBuilder();
        for (String line = null; (line = readerbuf.readLine()) != null;) {
            builder.append(line).append("\n");
        }

        JSONTokener tokener = new JSONTokener(builder.toString());
        JSONObject object = new JSONObject(tokener);

        print(object);

    }

    private static void print(JSONObject object) {
        System.out.println("Object:" + object.getClass());
        Iterator it = object.keys();
        while(it.hasNext()) {
            try {
                String nextKey = (String)it.next();
                System.out.println("NextKey:" + nextKey);
                Object nextContent = object.get(nextKey);
                System.out.println("NextContent:" + nextContent.getClass());
                if(nextContent instanceof JSONObject) {
                    System.out.println(nextContent.toString());
                } else if(nextContent instanceof String) {
                    System.out.println("Value:" + nextContent);
                }else if(nextContent instanceof JSONArray) {
                    JSONArray nextArray = (JSONArray)nextContent;
                    for(int i = 0; i < nextArray.length(); i++) {

                        print(nextArray.getJSONObject(i));

                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }
    }
*/
    }
