package org.kevoree.modeling.plugin.gradle;

import org.gradle.api.Plugin;
import org.gradle.api.Project;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 13/04/13
 * Time: 07:35
 */


public class GenerationPlugin implements Plugin<Project> {
    @Override
    public void apply(Project o) {
        System.out.println("Hello World");
        System.out.println("ecorePath->" + o.getProperties().get("ecorePath"));

    }
}
