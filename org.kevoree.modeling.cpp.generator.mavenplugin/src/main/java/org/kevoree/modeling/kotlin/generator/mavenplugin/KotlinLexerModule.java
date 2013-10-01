package org.kevoree.modeling.kotlin.generator.mavenplugin;

import com.intellij.lexer.FlexLexer;
import com.intellij.psi.tree.IElementType;
import org.jetbrains.jet.lexer.JetLexer;
import org.jetbrains.jet.lexer.JetTokens;
import org.kevoree.modeling.aspect.AspectClass;
import org.kevoree.modeling.aspect.AspectMethod;
import org.kevoree.modeling.aspect.AspectParam;
import org.kevoree.modeling.aspect.NewMetaClassCreation;

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

    public static void main(String[] args) throws IOException {
        KotlinLexerModule analyzer = new KotlinLexerModule();
        analyzer.analyze(null);//TODO
    }

    HashMap<String, AspectClass> cacheAspects = new HashMap<String, AspectClass>();
    List<NewMetaClassCreation> newMetaClass = new ArrayList<NewMetaClassCreation>();

    private String currentPackageName = "";


    public void analyze(File dir) throws IOException {
        JetLexer baseLexer = new JetLexer();
        //TODO inject loop
        File currentFile = dir;
        baseLexer.start(fromFile("/Users/duke/Documents/dev/smartgrid/lu.snt.smartgrid.model/src/main/java/smartgrid/core/SmartMeterAspect.kt"));
        FlexLexer lexer = baseLexer.getFlex();
        IElementType token = lexer.advance();
        while (token != null) {
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
                if (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && baseLexer.getTokenText().equals("metaclass")) {
                    token = readBlank(baseLexer);
                    if (token.getIndex() == JetTokens.LPAR.getIndex() && baseLexer.getTokenText().equals("(")) {
                        readMetaClassUntilOpenDeclaration(baseLexer, currentFile);
                    }
                } else {
                    if (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && baseLexer.getTokenText().equals("aspect")) {
                        token = readBlank(baseLexer);
                        if (token.getIndex() == JetTokens.TRAIT_KEYWORD.getIndex()) {
                            readAspectClassUntilOpenDeclaration(baseLexer);
                        }
                    }
                }
            }
            token = lexer.advance();
        }
    }


    public CharSequence fromFile(String filename) throws IOException {
        FileInputStream fis = new FileInputStream(filename);
        FileChannel fc = fis.getChannel();
        ByteBuffer bbuf = fc.map(FileChannel.MapMode.READ_ONLY, 0,
                (int) fc.size());
        CharBuffer cbuf = Charset.forName("UTF-8").newDecoder().decode(bbuf);
        return cbuf;
    }


    public void readAspectClassUntilOpenDeclaration(JetLexer lexer) throws IOException {
        readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
        String aspectName = lexer.getTokenText();
        AspectClass aspectClass = new AspectClass();
        aspectClass.name = aspectName;
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
        while (!(token.getIndex() == JetTokens.RBRACE.getIndex() && deep == 0)) {
            if (token.getIndex() == JetTokens.LBRACE.getIndex()) {
                deep++;
            }
            if (token.getIndex() == JetTokens.RBRACE.getIndex()) {
                deep--;
            }
            if (token.getIndex() == JetTokens.VAR_KEYWORD.getIndex()) {
                //I detect a var
            }
            if (token.getIndex() == JetTokens.FUN_KEYWORD.getIndex()) {
                aspectClass.methods.add(readMethodDefinition(lexer));
            }
            token = lexer.getFlex().advance();
        }
        cacheAspects.put(aspectClass.packageName + "." + aspectClass.name, aspectClass);
    }

    public AspectMethod readMethodDefinition(JetLexer lexer) throws IOException {
        AspectMethod method = new AspectMethod();
        readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
        String functionName = lexer.getTokenText();
        method.name = functionName;
        readUntil(lexer, JetTokens.LPAR.getIndex());
        IElementType token = lexer.getFlex().advance();
        while (token.getIndex() != JetTokens.RPAR.getIndex()) {
            AspectParam param = new AspectParam();
            readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
            String paramName = lexer.getTokenText();
            readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
            String typeDefinition = lexer.getTokenText();
            token = lexer.getFlex().advance();
            if (token.getIndex() == JetTokens.COMMA.getIndex()) {
                token = lexer.getFlex().advance();
            }
            param.name = paramName;
            param.type = typeDefinition;
            method.params.add(param);
        }
        token = readBlank(lexer);
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
                System.err.println("===== Bad Format !");
            }
        }
        return method;
    }


    public void readMetaClassUntilOpenDeclaration(JetLexer lexer, File from) throws IOException {

        readUntil(lexer, JetTokens.REGULAR_STRING_PART.getIndex());
        String newMetaClassName = lexer.getTokenText();
        readUntil(lexer, JetTokens.TRAIT_KEYWORD.getIndex());
        readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
        String AspectName = lexer.getTokenText();
        NewMetaClassCreation newMeta = new NewMetaClassCreation();
        newMeta.name = newMetaClassName;
        newMeta.originFile = from;

        IElementType token = readBlank(lexer);
        if (token.getIndex() == JetTokens.COLON.getIndex()) {
            token = lexer.getFlex().advance();
            StringBuffer typeDef = new StringBuffer();
            while (token.getIndex() != JetTokens.LBRACE.getIndex()) {
                typeDef.append(lexer.getTokenText());
                token = lexer.getFlex().advance();
            }
            newMeta.packageName = typeDef.toString().trim();
        } else {
            if (token.getIndex() == JetTokens.LBRACE.getIndex()) {

            } else {
                System.err.println("===== Bad Format !");
            }
        }
        readUntilRightBrace(lexer);

        newMetaClass.add(newMeta);


        System.err.println("----------------------------");
        System.err.println("NewMetaClassCreation " + newMeta.toString());
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

}
