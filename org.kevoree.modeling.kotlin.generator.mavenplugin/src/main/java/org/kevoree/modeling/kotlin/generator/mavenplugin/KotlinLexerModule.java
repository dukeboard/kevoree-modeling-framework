package org.kevoree.modeling.kotlin.generator.mavenplugin;

import com.intellij.lexer.FlexLexer;
import com.intellij.psi.tree.IElementType;
import org.jetbrains.jet.lexer.JetLexer;
import org.jetbrains.jet.lexer.JetTokens;
import org.kevoree.modeling.aspect.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 26/09/13
 * Time: 08:47
 */
public class KotlinLexerModule {

    public static void main(String[] args) throws Exception {
        KotlinLexerModule analyzer = new KotlinLexerModule();
        analyzer.analyze(new File("/Users/duke/Documents/dev/smartgrid/lu.snt.smartgrid.model/src/main/java/smartgrid/core/HubAspect.kt"));
        //analyzer.analyze(new File("/Users/duke/Documents/dev/smartgrid/lu.snt.smartgrid.model/src/main/java"));//TODO
        for (String key : analyzer.cacheAspects.keySet()) {
            System.out.println("<<<<< " + key + " >>>>>");
            AspectClass clazz = analyzer.cacheAspects.get(key);
            for (AspectMethod method : clazz.methods) {
                System.out.println("MET : <<<<< " + method.name + " >>>>> , private : " + (method.privateMethod));
                System.out.println(clazz.getContent(method));
            }
            System.out.println(clazz.toString());
        }
        for (NewMetaClassCreation key : analyzer.newMetaClass) {
            System.out.println("MetaClass " + key.packageName + "." + key.name + "-" + key.parentName);
        }
    }

    HashMap<String, AspectClass> cacheAspects = new HashMap<String, AspectClass>();
    List<NewMetaClassCreation> newMetaClass = new ArrayList<NewMetaClassCreation>();

    private String currentPackageName = "";

    public void analyze(File sourceFile) throws Exception {
        List<File> sourceKotlinFileList = new ArrayList<File>();
        if (sourceFile.isDirectory() && sourceFile.exists()) {
            collectFiles(sourceFile, sourceKotlinFileList, ".kt");
        } else {
            if (sourceFile.isFile() && !sourceFile.isDirectory() && sourceFile.getName().endsWith(".kt")) {
                sourceKotlinFileList.add(sourceFile);
            }
        }
        for (File currentFile : sourceKotlinFileList) {

            List<String> imports = new ArrayList<String>();

            JetLexer baseLexer = new JetLexer();
            baseLexer.start(fromFile(currentFile));
            FlexLexer lexer = baseLexer.getFlex();
            IElementType token = lexer.advance();
            while (token != null) {
                if (token.getIndex() == JetTokens.IMPORT_KEYWORD.getIndex() || (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && baseLexer.getTokenText().equals("import"))) {
                    token = readUntil(baseLexer, JetTokens.IDENTIFIER.getIndex());
                    StringBuffer name = new StringBuffer();
                    while (token.getIndex() == JetTokens.IDENTIFIER.getIndex() || token.getIndex() == JetTokens.DOT.getIndex()) {
                        name.append(baseLexer.getTokenText());
                        token = lexer.advance();
                    }
                    imports.add(name.toString());
                } else {
                    if (token.getIndex() == JetTokens.PACKAGE_KEYWORD.getIndex()) {
                        baseLexer.getTokenText();
                        token = lexer.advance();
                        StringBuffer packageName = new StringBuffer();
                        while (token.getIndex() == JetTokens.IDENTIFIER.getIndex() || token.getIndex() == JetTokens.DOT.getIndex()) {
                            packageName.append(baseLexer.getTokenText());
                            token = baseLexer.getFlex().advance();
                        }
                        currentPackageName = packageName.toString().trim();
                    } else {
                        if (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && baseLexer.getTokenText().equals("meta")) {
                            token = readBlank(baseLexer);
                            if (token.getIndex() == JetTokens.TRAIT_KEYWORD.getIndex()) {
                                readMetaClassUntilOpenDeclaration(baseLexer, currentFile, imports);
                            }
                        } else {
                            if (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && baseLexer.getTokenText().equals("aspect")) {
                                token = readBlank(baseLexer);
                                if (token.getIndex() == JetTokens.TRAIT_KEYWORD.getIndex()) {
                                    readAspectClassUntilOpenDeclaration(baseLexer, currentFile, imports);
                                }
                            }
                        }
                    }
                }
                token = lexer.advance();
            }
        }

    }


    public CharSequence fromFile(File file) throws IOException {
        FileInputStream fis = new FileInputStream(file);
        FileChannel fc = fis.getChannel();
        ByteBuffer bbuf = fc.map(FileChannel.MapMode.READ_ONLY, 0,
                (int) fc.size());
        CharBuffer cbuf = Charset.forName("UTF-8").newDecoder().decode(bbuf);
        return cbuf;
    }


    public void readAspectClassUntilOpenDeclaration(JetLexer lexer, File from, List<String> imports) throws Exception {
        readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
        String aspectName = lexer.getTokenText();
        AspectClass aspectClass = new AspectClass();
        aspectClass.name = aspectName;
        aspectClass.from = from;
        aspectClass.imports = imports;

        aspectClass.packageName = currentPackageName;
        readUntil(lexer, JetTokens.COLON.getIndex());
        IElementType token = lexer.getFlex().advance();
        StringBuffer typeDef = new StringBuffer();
        while (token.getIndex() != JetTokens.LBRACE.getIndex()) {
            typeDef.append(lexer.getTokenText());
            token = lexer.getFlex().advance();
        }
        aspectClass.aspectedClass = typeDef.toString().trim();
        //Read Until Right Brace
        token = lexer.getFlex().advance();
        int deep = 0;
        Boolean isPrivate = false;
        while (!(token.getIndex() == JetTokens.RBRACE.getIndex() && deep == 0)) {
            if (
                    (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && lexer.getTokenText().equals("private"))
                            || (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && lexer.getTokenText().equals("protected"))
                            || token.getIndex() == JetTokens.PRIVATE_KEYWORD.getIndex()
                            || token.getIndex() == JetTokens.PROTECTED_KEYWORD.getIndex()) {
                isPrivate = true;
            }
            if (token.getIndex() == JetTokens.LBRACE.getIndex()) {
                deep++;
            }
            if (token.getIndex() == JetTokens.RBRACE.getIndex()) {
                deep--;
            }
            if (token.getIndex() == JetTokens.VAL_KEYWORD.getIndex()) {
                //I detect a val
                isPrivate = false;
            }
            if (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && lexer.getTokenText().equals("meta")) {
                token = readBlank(lexer);
                if (token.getIndex() == JetTokens.VAR_KEYWORD.getIndex()) {
                    aspectClass.vars.add(readVar(lexer,false));
                    isPrivate = false;
                } else {
                    throw new Exception("Format error "+token.getIndex()+"-"+lexer.getTokenText());
                }
            }
            if (token.getIndex() == JetTokens.VAR_KEYWORD.getIndex()) {
                aspectClass.vars.add(readVar(lexer,true));
                isPrivate = false;
            }
            if (token.getIndex() == JetTokens.CLASS_KEYWORD.getIndex()) {
                //ignore nested class
                readUntil(lexer, JetTokens.LBRACE.getIndex());
                int nestedDeep = 0;
                token = lexer.getFlex().advance();
                while (!(token.getIndex() == JetTokens.RBRACE.getIndex() && nestedDeep == 0)) {
                    if (token.getIndex() == JetTokens.LBRACE.getIndex()) {
                        nestedDeep++;
                    }
                    if (token.getIndex() == JetTokens.RBRACE.getIndex()) {
                        nestedDeep--;
                    }
                    token = lexer.getFlex().advance();
                }
                //I detect a var
                isPrivate = false;
            }
            if (token.getIndex() == JetTokens.FUN_KEYWORD.getIndex()) {
                AspectMethod newMethod = readMethodDefinition(lexer);
                newMethod.privateMethod = isPrivate;
                aspectClass.methods.add(newMethod);
                isPrivate = false;
            }
            token = lexer.getFlex().advance();
        }
        cacheAspects.put(aspectClass.packageName + "." + aspectClass.name, aspectClass);
    }

    public AspectMethod readMethodDefinition(JetLexer lexer) throws IOException {
        AspectMethod method = new AspectMethod();
        IElementType token = lexer.getFlex().advance();
        while (token.getIndex() != JetTokens.IDENTIFIER.getIndex()) {
            token = lexer.getFlex().advance();
        }
        method.name = lexer.getTokenText();
        token = lexer.getFlex().advance();
        while (token.getIndex() != JetTokens.LPAR.getIndex()) {
            token = lexer.getFlex().advance();
        }
        token = lexer.getFlex().advance();

        while (token.getIndex() != JetTokens.RPAR.getIndex()) {
            AspectParam param = new AspectParam();
            StringBuffer typeDef = new StringBuffer();
            while (token.getIndex() != JetTokens.COLON.getIndex()) {
                typeDef.append(lexer.getTokenText());
                token = lexer.getFlex().advance();
            }
            String paramName = typeDef.toString().trim();
            token = lexer.getFlex().advance(); //consume :
            typeDef = new StringBuffer();
            while (token.getIndex() != JetTokens.RPAR.getIndex() && token.getIndex() != JetTokens.COMMA.getIndex()) {
                typeDef.append(lexer.getTokenText());
                token = lexer.getFlex().advance();
            }
            if (token.getIndex() == JetTokens.COMMA.getIndex()) {
                token = lexer.getFlex().advance();
            }
            param.name = paramName;
            if (typeDef.length() > 0) {
                param.type = typeDef.toString().trim();
            }
            method.params.add(param);
        }
        while (token.getIndex() != JetTokens.LBRACE.getIndex() && token.getIndex() != JetTokens.COLON.getIndex()) {
            token = lexer.getFlex().advance();
        }
        if (token.getIndex() == JetTokens.COLON.getIndex()) {
            token = lexer.getFlex().advance();
            StringBuffer typeDef = new StringBuffer();
            while (token.getIndex() != JetTokens.LBRACE.getIndex()) {
                typeDef.append(lexer.getTokenText());
                token = lexer.getFlex().advance();
            }
            method.returnType = typeDef.toString().trim();
        } else {
            if (token.getIndex() == JetTokens.LBRACE.getIndex()) {
                //here we are in method declaration
            } else {
                System.err.println("===== Bad Format ! " + token);
            }
        }
        token = lexer.getFlex().advance();

        method.startOffset = lexer.getCurrentPosition().getOffset();


        //Read Method definition
        int deep = 0;
        while (!(token.getIndex() == JetTokens.RBRACE.getIndex() && deep == 0)) {
            if (token.getIndex() == JetTokens.LBRACE.getIndex()) {
                deep = deep + 1;
            }
            if (token.getIndex() == JetTokens.RBRACE.getIndex()) {
                deep = deep - 1;
            }
            token = lexer.getFlex().advance();
        }
        method.endOffset = lexer.getCurrentPosition().getOffset() - 1;
        return method;

    }

    public AspectVar readVar(JetLexer lexer, Boolean isPrivate) throws Exception {

        AspectVar varRes = new AspectVar();
        //varRes.isPrivate = isPrivate;
        //kotlin workaround

        readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
        varRes.name = lexer.getTokenText();
        varRes.isPrivate = varRes.name.startsWith("_");


                readUntil(lexer, JetTokens.COLON.getIndex());
        IElementType token = lexer.getFlex().advance();
        token = readBlank(lexer);
        StringBuffer typeDef = new StringBuffer();
        while (token.getIndex() != JetTokens.WHITE_SPACE.getIndex()) {
            typeDef.append(lexer.getTokenText());
            token = lexer.getFlex().advance();
        }
        varRes.typeName = typeDef.toString().trim();

        if(!varRes.typeName.trim().endsWith("?")){
            /*if(
                    varRes.typeName.trim() == "String"
                    || varRes.typeName.trim() == "Int"
                            || varRes.typeName.trim() == "Boolean"
                            || varRes.typeName.trim() == "Char"
                            || varRes.typeName.trim() == "Short"
                            || varRes.typeName.trim() == "Long"
                            || varRes.typeName.trim() == "Double"
                            || varRes.typeName.trim() == "Float"
                            || varRes.typeName.trim() == "Byte"
                    ){    */
                  throw new Exception("Only nullable type accepted for statfull aspect, var "+varRes.name);
           // }
        }


        return varRes;
    }


    public void readMetaClassUntilOpenDeclaration(JetLexer lexer, File from, List<String> imports) throws Exception {

        readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
        String newMetaClassName = lexer.getTokenText();

        NewMetaClassCreation newMeta = new NewMetaClassCreation();
        newMeta.name = newMetaClassName;
        newMeta.originFile = from;
        newMeta.packageName = currentPackageName;

        IElementType token = readBlank(lexer);
        if (token.getIndex() == JetTokens.COLON.getIndex()) {
            token = lexer.getFlex().advance();
            StringBuffer typeDef = new StringBuffer();
            while (token.getIndex() != JetTokens.LBRACE.getIndex()) {
                typeDef.append(lexer.getTokenText());
                token = lexer.getFlex().advance();
            }
            newMeta.parentName = typeDef.toString().trim();
        } else {
            if (token.getIndex() == JetTokens.LBRACE.getIndex()) {

            } else {
                System.err.println("===== Bad Format !");
            }
        }
        newMetaClass.add(newMeta);
        AspectClass currentAspect = new AspectClass();
        currentAspect.name = newMetaClassName;
        currentAspect.packageName = currentPackageName;
        currentAspect.aspectedClass = newMetaClassName;
        currentAspect.from = from;
        currentAspect.imports = imports;
        token = lexer.getFlex().advance(); //read {
        int deep = 0;
        Boolean isPrivate = false;
        while (!(token.getIndex() == JetTokens.RBRACE.getIndex() && deep == 0)) {
            if (
                    (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && lexer.getTokenText().equals("private"))
                            || (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && lexer.getTokenText().equals("protected"))
                            || token.getIndex() == JetTokens.PRIVATE_KEYWORD.getIndex()
                            || token.getIndex() == JetTokens.PROTECTED_KEYWORD.getIndex()) {
                isPrivate = true;
            }
            if (token.getIndex() == JetTokens.LBRACE.getIndex()) {
                deep++;
            }
            if (token.getIndex() == JetTokens.RBRACE.getIndex()) {
                deep--;
            }
            if (token.getIndex() == JetTokens.VAL_KEYWORD.getIndex()) {
                //I detect a val
                isPrivate = false;
            }
            if (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && lexer.getTokenText().equals("meta")) {
                token = readBlank(lexer);
                if (token.getIndex() == JetTokens.VAR_KEYWORD.getIndex()) {
                    currentAspect.vars.add(readVar(lexer,false));
                    isPrivate = false;
                } else {
                    throw new Exception("Format error");
                }
            }
            if (token.getIndex() == JetTokens.VAR_KEYWORD.getIndex()) {
                currentAspect.vars.add(readVar(lexer,true));
                //I detect a var
                isPrivate = false;
            }
            if (token.getIndex() == JetTokens.FUN_KEYWORD.getIndex()) {
                AspectMethod newMethod = readMethodDefinition(lexer);
                newMethod.privateMethod = isPrivate;
                currentAspect.methods.add(newMethod);
                isPrivate = false;
            }
            if (token.getIndex() == JetTokens.CLASS_KEYWORD.getIndex()) {
                //ignore nested class
                readUntil(lexer, JetTokens.LBRACE.getIndex());
                int nestedDeep = 0;
                token = lexer.getFlex().advance();
                while (!(token.getIndex() == JetTokens.RBRACE.getIndex() && nestedDeep == 0)) {
                    if (token.getIndex() == JetTokens.LBRACE.getIndex()) {
                        nestedDeep++;
                    }
                    if (token.getIndex() == JetTokens.RBRACE.getIndex()) {
                        nestedDeep--;
                    }
                    token = lexer.getFlex().advance();
                }
                //I detect a var
                isPrivate = false;
            }
            token = lexer.getFlex().advance();
        }
        cacheAspects.put(currentAspect.packageName + "." + currentAspect.name, currentAspect);

    }


    public void readUntilRightBrace(JetLexer lexer) throws IOException {
        IElementType token = lexer.getFlex().advance();
        int deep = 0;
        while (!(token.getIndex() == JetTokens.RBRACE.getIndex() && deep == 0)) {
            if (token.getIndex() == JetTokens.LBRACE.getIndex()) {
                deep++;
            }
            if (token.getIndex() == JetTokens.RBRACE.getIndex()) {
                deep--;
            }
            token = lexer.getFlex().advance();
        }
    }

    public IElementType readUntil(JetLexer lexer, short kind, String txt) throws IOException {
        IElementType token = lexer.getFlex().advance();
        while (!(token.getIndex() == kind && lexer.getTokenText().equals(txt))) {
            token = lexer.getFlex().advance();
        }
        return token;
    }

    public IElementType readBlank(JetLexer lexer) throws IOException {
        IElementType current = lexer.getFlex().advance();
        while (JetTokens.WHITESPACES.contains(current)) {
            current = lexer.getFlex().advance();
        }
        return current;
    }

    public IElementType readUntil(JetLexer lexer, short kind) throws IOException {
        IElementType token = lexer.getFlex().advance();
        while (token.getIndex() != kind) {
            token = lexer.getFlex().advance();
        }
        return token;
    }

    public void collectFiles(File directoryPath, List<File> sourceFileList, String extension) {
        for (String contents : directoryPath.list()) {
            File current = new File(directoryPath + File.separator + contents);
            if (contents.endsWith(extension)) {
                sourceFileList.add(current);
            } else {
                if (current.isDirectory()) {
                    collectFiles(current, sourceFileList, extension);
                }
            }
        }
    }

}
