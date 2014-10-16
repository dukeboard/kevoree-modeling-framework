package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.util.Helper;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 13:08
 */


public class JSONModelLoader implements ModelLoader {

    private KView factory;
    public JSONModelLoader(KView factory) {
        this.factory = factory;
    }

    @Override
    public void loadModelFromString(String str, Callback<KObject> callback) {
        if (str == null) {
            callback.on(null);
        }
        loadModelFromStream(new ByteArrayInputStream(str.getBytes(StandardCharsets.UTF_8)), callback);
    }

    @Override
    public void loadModelFromStream(InputStream inputStream, Callback<KObject> callback) {
        if (inputStream == null) {
            throw new RuntimeException("Null input Stream");
        }
        Lexer lexer = new Lexer(inputStream);
        Token currentToken = lexer.nextToken();
        if (currentToken.getTokenType() != Type.LEFT_BRACKET) {
            callback.on(null);
        }
        while (currentToken.getTokenType() != org.kevoree.modeling.api.json.Type.EOF) {

            currentToken = lexer.nextToken();
        }

        System.out.println(currentToken);

    }

    /*
    class MyCallback implements Callback<KObject> {
        public KObject currentObject = null;
        public JSONLoadingContext context;
        public boolean isRoot;
        public Token currentToken;
        KObject parent;
        String nameInParent;

        @Override
        public void on(KObject kObject) {
            currentObject = kObject;

            if (isRoot) {
                factory.root(currentObject, (success) -> {
                    if (!success) {
                        context.errorCallback.on(new Exception("Could not set root with currentObject:" + currentObject.key()));
                    } else {
                        try {
                            if (parent == null) {
                                context.roots.add(currentObject);
                            }
                            //next loop while begin a sub Elem
                            String currentNameAttOrRef = null;
                            boolean refModel = false;
                            currentToken = context.lexer.nextToken();
                            while (currentToken.getTokenType() != org.kevoree.modeling.api.json.Type.EOF) {
                                if (currentToken.getTokenType() == org.kevoree.modeling.api.json.Type.LEFT_BRACE) {
                                    loadObject(context, currentNameAttOrRef, currentObject);
                                }
                                if (currentToken.getTokenType() == org.kevoree.modeling.api.json.Type.COMMA) {
                                    //ignore
                                }
                                if (currentToken.getTokenType() == org.kevoree.modeling.api.json.Type.VALUE) {
                                    if (currentNameAttOrRef == null) {
                                        currentNameAttOrRef = currentToken.getValue().toString();
                                    } else {
                                        if (refModel) {
                                            context.resolveCommands.add(new ResolveCommand(context, currentToken.getValue().toString(), currentObject, currentNameAttOrRef));
                                        } else {
                                            String unscaped = JSONString.unescape(currentToken.getValue().toString());
                                            currentObject.set(currentObject.metaAttribute(currentNameAttOrRef), unscaped, false);
                                            currentNameAttOrRef = null; //unpop
                                        }
                                    }
                                }
                                if (currentToken.getTokenType() == org.kevoree.modeling.api.json.Type.LEFT_BRACKET) {
                                    currentToken = context.lexer.nextToken();
                                    if (currentToken.getTokenType() == org.kevoree.modeling.api.json.Type.LEFT_BRACE) {
                                        loadObject(context, currentNameAttOrRef, currentObject);
                                    } else {
                                        refModel = true; //wait for all ref to be found
                                        if (currentToken.getTokenType() == org.kevoree.modeling.api.json.Type.VALUE) {
                                            context.resolveCommands.add(new ResolveCommand(context, currentToken.getValue().toString(), currentObject, currentNameAttOrRef));
                                        }
                                    }
                                }
                                if (currentToken.getTokenType() == org.kevoree.modeling.api.json.Type.RIGHT_BRACKET) {
                                    currentNameAttOrRef = null; //unpop
                                    refModel = false;
                                }
                                if (currentToken.getTokenType() == org.kevoree.modeling.api.json.Type.RIGHT_BRACE) {
                                    if (parent != null) {
                                        parent.mutate(KActionType.ADD, parent.metaReference(nameInParent), currentObject, false, false, null);
                                    }
                                    return; //go out
                                }
                                currentToken = context.lexer.nextToken();
                            }
                        } catch (Throwable t) {
                            context.errorCallback.on(t);
                        }
                    }
                });
            }


        }
    }


    private void loadObject(JSONLoadingContext context, String nameInParent, KObject parent) throws Exception {
        //must ne currently on { at input
        Token currentToken = context.lexer.nextToken();
        //KObject currentObject = null;
        MyCallback currentObjectCallback = new MyCallback();
        currentObjectCallback.context = context;
        currentObjectCallback.parent = parent;
        currentObjectCallback.nameInParent = nameInParent;
        if (currentToken.getTokenType() == org.kevoree.modeling.api.json.Type.VALUE) {
            if (currentToken.getValue() == "class") {
                context.lexer.nextToken(); //unpop :
                currentToken = context.lexer.nextToken(); //Two step for having the name
                String name = (currentToken.getValue() != null ? currentToken.getValue().toString() : null);
                //String typeName = null;
                boolean isRoot = false;
                if (name.startsWith("root:")) {
                    isRoot = true;
                    name = name.substring("root:".length());
                }
                currentObjectCallback.isRoot = isRoot;
                currentObjectCallback.currentToken = currentToken;
                if (name.contains("@")) {
                    //typeName = name.substring(0, name.indexOf("@"));
                    String key = name.substring(name.indexOf("@") + 1);
                    if (parent == null) {
                        if (isRoot) {
                            factory.lookup("/", currentObjectCallback);
                        }
                    } else {
                        String path = parent.path() + "/" + nameInParent + "[" + key + "]";
                        factory.lookup(path, currentObjectCallback);
                    }
                } else {
                    //typeName = name;
                    currentObjectCallback.on(factory.createFQN(name));
                }

            } else {
                throw new Exception("Bad Format. eClass att must be first");
                //TODO save temp att
            }
        } else {
            throw new Exception("Bad Format");
        }
    }*/

}

