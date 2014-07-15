package org.kevoree.modeling.idea.psi;

import com.intellij.navigation.ChooseByNameContributor;
import com.intellij.navigation.NavigationItem;
import com.intellij.openapi.project.Project;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 7/14/14.
 */
public class MetaModelChooseByNameContributor implements ChooseByNameContributor {




    @NotNull
    @Override
    public String[] getNames(Project project, boolean includeNonProjectItems) {
        List<MetaModelTypeDeclaration> properties = MetaModelUtil.findProperties(project);
        List<String> names = new ArrayList<String>(properties.size());
        for (MetaModelTypeDeclaration property : properties) {
            if (property.getName() != null && property.getName().length() > 0) {
                names.add(property.getName());
            }
        }
        return names.toArray(new String[names.size()]);
    }

    @NotNull
    @Override
    public NavigationItem[] getItemsByName(String name, String pattern, Project project, boolean includeNonProjectItems) {
        // todo include non project items
        List<MetaModelTypeDeclaration> properties = MetaModelUtil.findProperties(project, name);
        return properties.toArray(new NavigationItem[properties.size()]);
    }
}



