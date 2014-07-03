package org.kevoree.modeling.idea.ide;

import com.intellij.openapi.components.AbstractProjectComponent;
import com.intellij.openapi.project.Project;

/**
 * Created by duke on 24/01/2014.
 */
public class MetaModelComponent extends AbstractProjectComponent {

    protected MetaModelComponent(Project project) {
        super(project);
    }

    public static MetaModelComponent getInstance(final Project project) {



        if (project == null) {
            return null;
        } else {
            return project.getComponent(MetaModelComponent.class);
        }
    }



}
