package org.kevoree.modeling.java2typescript.test;

import com.siliconmint.ts.*;
import org.junit.*;

import java.io.*;
import java.nio.file.*;

/**
 * Created by gregory.nain on 31/10/14.
 */
public class MicroframeworkTest {

    @Test
    public void generateMicroframework() {

        Path p = Paths.get(this.getClass().getClassLoader().getResource("").getPath());
        Path microframeworkSrc = null;
        for(int i = 0; i < p.getNameCount() ; i++) {
            if(p.getName(i).toString().equals("org.kevoree.modeling.java2typescript")) {
                microframeworkSrc = Paths.get(p.getRoot().toString(),p.subpath(0,i).toString(),"org.kevoree.modeling.microframework", "src", "main", "java");
                break;
            }
        }

        Path genDir = null;
        for(int i = 0; i < p.getNameCount() ; i++) {
            if(p.getName(i).toString().equals("org.kevoree.modeling.java2typescript")) {
                genDir = Paths.get(p.getRoot().toString(),p.subpath(0,i+1).toString(),"target", "classes");
                break;
            }
        }

        System.out.println("SrcPath:" + microframeworkSrc.toAbsolutePath().toString());
        System.out.println("DestPath:" + genDir.toAbsolutePath().toString());

        SourceTranslator sourceTranslator = new SourceTranslator();
        sourceTranslator.translateSources(microframeworkSrc.toAbsolutePath().toString(), genDir.toAbsolutePath().toString());

    }


    public static void main(String[] args) {

    }




}
