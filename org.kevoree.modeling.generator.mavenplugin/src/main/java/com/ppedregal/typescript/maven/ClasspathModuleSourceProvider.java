package com.ppedregal.typescript.maven;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;

import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.commonjs.module.provider.ModuleSource;
import org.mozilla.javascript.commonjs.module.provider.ModuleSourceProvider;

public class ClasspathModuleSourceProvider implements ModuleSourceProvider {

    private final ClassLoader classLoader;

    public ClasspathModuleSourceProvider() {
        this(Thread.currentThread().getContextClassLoader());
    }

    public ClasspathModuleSourceProvider(ClassLoader classLoader) {
        this.classLoader = classLoader;
    }

    public ModuleSource loadSource(String moduleId, Scriptable paths, Object validator) throws IOException, URISyntaxException {
        return loadModule(URI.create("modules:/" + moduleId));
    }

    public ModuleSource loadSource(URI uri, URI baseUri, Object validator) throws IOException, URISyntaxException {
        return loadModule(baseUri.resolve(uri));
    }

    public ModuleSource loadModule(URI uri) {
        InputStream stream = classLoader.getResourceAsStream("modules/" + uri.getPath().substring(1) + ".js");
        if (stream != null) {
            return new ModuleSource(new InputStreamReader(stream), null, uri, null, null);
        }
        return null;
    }

}
