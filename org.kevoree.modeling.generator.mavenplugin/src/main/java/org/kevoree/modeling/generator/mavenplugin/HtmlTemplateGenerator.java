package org.kevoree.modeling.generator.mavenplugin;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Created by gregory.nain on 07/11/14.
 */
public class HtmlTemplateGenerator {


    public static void generateHtml(Path targetDir, String jsFileName, String metaModelFQN) throws IOException {
        String  metaModelName;
        if(metaModelFQN.contains(".")) {
           metaModelName = metaModelFQN.substring(metaModelFQN.lastIndexOf(".")+1);
        } else {
            metaModelName = metaModelFQN;
            metaModelFQN = metaModelFQN.toLowerCase() + "." + metaModelFQN;
        }


        StringBuilder sb = new StringBuilder();
        sb.append("<!DOCTYPE html>\n<html>\n<head lang=\"en\">\n    <meta charset=\"UTF-8\">\n    <title></title>\n</head>\n");
        sb.append("<body>\n");
        sb.append("<script src=\"./java.js\"></script>\n");
        sb.append("<script src=\"./org.kevoree.modeling.microframework.typescript.js\"></script>\n");
        sb.append("<script src=\"./"+jsFileName+"\"></script>\n");
        sb.append("<script>\n");
        sb.append("    var "+metaModelName.toLowerCase()+"Universe = new "+metaModelFQN+"Universe();\n");
        sb.append("    "+metaModelName.toLowerCase()+"Universe.newDimension(function(dimension){\n");
        sb.append("        var "+metaModelName.toLowerCase()+"View = dimension.time(0);\n");
        sb.append("\n");
        sb.append("        //create your root element from '"+metaModelName.toLowerCase()+"View' ::  var element = "+metaModelName.toLowerCase()+"View.create[...]();\n");
        sb.append("        //set your root element (if necessary) '"+metaModelName.toLowerCase()+"View' ::  "+metaModelName.toLowerCase()+"View.setRoot(<element>);\n");
        sb.append("\n");
        sb.append("        //Load from JSON\n");
        sb.append("        "+metaModelName.toLowerCase()+"View.json().load(\"Model_As_String\", function(error){console.error(error);});\n");
        sb.append("\n");
        sb.append("        /*  Serialize in JSON:\n");
        sb.append("\n");
        sb.append("         "+metaModelName.toLowerCase()+"View.json().save(<model>, function(serializedModel, error){\n");
        sb.append("         if(!error) {\n");
        sb.append("             //Do something with 'serializedModel'\n");
        sb.append("         } else {\n");
        sb.append("             console.error(error);\n");
        sb.append("         }\n");
        sb.append("         */\n");
        sb.append("    });\n");
        sb.append("\n");
        sb.append("</script>\n");
        sb.append("</body>\n");
        sb.append("</html>");

        Files.write(Paths.get(targetDir.toAbsolutePath().toString(),"index.html"), sb.toString().getBytes());

    }

}
