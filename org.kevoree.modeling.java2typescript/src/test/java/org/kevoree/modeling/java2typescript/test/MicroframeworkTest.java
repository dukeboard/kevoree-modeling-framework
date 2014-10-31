package org.kevoree.modeling.java2typescript.test;

import com.siliconmint.ts.*;
import org.junit.*;

/**
 * Created by gregory.nain on 31/10/14.
 */
public class MicroframeworkTest {

    @Test
    public void generateMicroframework() {
        SourceTranslator sourceTranslator = new SourceTranslator();
        sourceTranslator.translateSources(baseDir, outputDir);
    }


    public static void main(String[] args) {

    }




}
