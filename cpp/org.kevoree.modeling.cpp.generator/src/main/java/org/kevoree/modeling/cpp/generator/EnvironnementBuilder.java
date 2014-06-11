package org.kevoree.modeling.cpp.generator;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.kevoree.modeling.cpp.generator.utils.FileManager;
import org.kevoree.resolver.MavenResolver;
//import org.kevoree.resolver.MavenResolver;


import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


/**
 * Created with IntelliJ IDEA.
 * User: jed
 * Date: 28/10/13
 * Time: 17:00
 * To change this templates use File | Settings | File Templates.
 */
public class EnvironnementBuilder
{
    private Template gen_cmake;
    private GenerationContext ctx;
    private VelocityEngine ve = new VelocityEngine();

    public EnvironnementBuilder(GenerationContext ctx){
        this.ctx = ctx;
        ve.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getName()) ;
        ve.init();
        gen_cmake = ve.getTemplate("templates/cmake.vm");
    }


    public void generateCmakeFile() throws IOException {
        VelocityContext context = new VelocityContext();
        StringWriter result = new StringWriter();
        context.put("libraryName",ctx.getName_package());
        gen_cmake.merge(context, result);
        FileManager.writeFile(ctx.getRootGenerationDirectory()+ File.separatorChar+ "CMakeLists.txt", result.toString(), false);
    }

    public void downloadMicroframework(){

        MavenResolver resolver = new MavenResolver();

        String group = "org.kevoree.modeling";
        String artifactid = "org.kevoree.modeling.cpp.microframework";

        String version = ctx.getVersionmicroframework()  ;


        File jar = resolver.resolve("mvn:"+group+":"+artifactid+":"+version+":jar", Arrays.asList("https://oss.sonatype.org/content/groups/public/"));

        if(jar != null && jar.exists())
        {
            try {
                FileManager.unzipJar(jar.getAbsolutePath(),ctx.getRootGenerationDirectory()+ File.separatorChar);
            } catch (IOException e)
            {
                e.printStackTrace();
            }
        }


    }
    public void execute() throws IOException
    {
        downloadMicroframework();
       // generateCmakeFile();
    }
}
