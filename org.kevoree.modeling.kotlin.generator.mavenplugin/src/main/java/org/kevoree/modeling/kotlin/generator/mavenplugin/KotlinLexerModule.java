package org.kevoree.modeling.kotlin.generator.mavenplugin;

import com.intellij.lexer.FlexLexer;
import com.intellij.psi.tree.IElementType;
import org.jetbrains.jet.lexer.JetLexer;
import org.jetbrains.jet.lexer.JetTokens;
import org.kevoree.modeling.aspect.AspectClass;
import org.kevoree.modeling.aspect.NewMetaClassCreation;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 26/09/13
 * Time: 08:47
 */
public class KotlinLexerModule {

    public static void main(String[] args) throws IOException {
        JetLexer baseLexer = new JetLexer();
        baseLexer.start(fromFile("/Users/duke/Documents/dev/smartgrid/lu.snt.smartgrid.model/src/main/java/smartgrid/core/SmartMeterAspect.kt"));
        FlexLexer lexer = baseLexer.getFlex();
        IElementType token = lexer.advance();
        while (token != null) {
            if (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && baseLexer.getTokenText().equals("metaclass")) {
                token = readBlank(baseLexer);
                if (token.getIndex() == JetTokens.LPAR.getIndex() && baseLexer.getTokenText().equals("(")) {
                    readMetaClassUntilOpenDeclaration(baseLexer);
                }
            } else {
                if (token.getIndex() == JetTokens.IDENTIFIER.getIndex() && baseLexer.getTokenText().equals("aspect")) {
                    token = readBlank(baseLexer);
                    if (token.getIndex() == JetTokens.TRAIT_KEYWORD.getIndex()) {
                        readAspectClassUntilOpenDeclaration(baseLexer);
                    }
                }
            }
            token = lexer.advance();
        }
    }


    public static CharSequence fromFile(String filename) throws IOException {
        FileInputStream fis = new FileInputStream(filename);
        FileChannel fc = fis.getChannel();
        ByteBuffer bbuf = fc.map(FileChannel.MapMode.READ_ONLY, 0,
                (int) fc.size());
        CharBuffer cbuf = Charset.forName("UTF-8").newDecoder().decode(bbuf);
        return cbuf;
    }


    public static void readAspectClassUntilOpenDeclaration(JetLexer lexer) throws IOException {
        readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
        String aspectName = lexer.getTokenText();

        AspectClass aspectClass = new AspectClass();
        aspectClass.name = aspectName;

        readUntil(lexer, JetTokens.COLON.getIndex());
        readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
        String superTypeName = lexer.getTokenText();
        aspectClass.aspectedClass = superTypeName;
        readUntil(lexer, JetTokens.LBRACE.getIndex());
        //Read Until Right Brace
        IElementType token = lexer.getFlex().advance();
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
                readMethodDefinition(lexer);
            }
            token = lexer.getFlex().advance();
        }
        System.err.println("----------------------------");
        System.err.println("AspectClassCreation " + aspectClass.toString());
    }

    public static void readMethodDefinition(JetLexer lexer) throws IOException {
        readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
        String functionName = lexer.getTokenText();
        readUntil(lexer, JetTokens.LPAR.getIndex());
        IElementType token = lexer.getFlex().advance();
        while (token.getIndex() != JetTokens.RPAR.getIndex()) {
            readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
            String paramName = lexer.getTokenText();
            readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
            String typeDefinition = lexer.getTokenText();
            token = lexer.getFlex().advance();
            if(token.getIndex() == JetTokens.COMMA.getIndex()){
                token = lexer.getFlex().advance();
            }
        }

        //

    }


    public static void readMetaClassUntilOpenDeclaration(JetLexer lexer) throws IOException {

        readUntil(lexer, JetTokens.REGULAR_STRING_PART.getIndex());
        String newMetaClassName = lexer.getTokenText();
        readUntil(lexer, JetTokens.TRAIT_KEYWORD.getIndex());
        readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
        String AspectName = lexer.getTokenText();

        NewMetaClassCreation newMeta = new NewMetaClassCreation();
        newMeta.name = newMetaClassName;

        IElementType token = readBlank(lexer);
        if (token.getIndex() == JetTokens.COLON.getIndex()) {
            readUntil(lexer, JetTokens.IDENTIFIER.getIndex());
            String superTypeName = lexer.getTokenText();
            newMeta.packageName = superTypeName;
            readUntil(lexer, JetTokens.LBRACE.getIndex());
        } else {
            if (token.getIndex() == JetTokens.LBRACE.getIndex()) {

            } else {
                System.err.println("===== Bad Format !");
            }
        }

        readUntilRightBrace(lexer);
        System.err.println("----------------------------");
        System.err.println("NewMetaClassCreation " + newMeta.toString());
    }


    public static void readUntilRightBrace(JetLexer lexer) throws IOException {
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

    public static IElementType readUntil(JetLexer lexer, short kind, String txt) throws IOException {
        IElementType token = lexer.getFlex().advance();
        while (!(token.getIndex() == kind && lexer.getTokenText().equals(txt))) {
            token = lexer.getFlex().advance();
        }
        return token;
    }

    public static IElementType readBlank(JetLexer lexer) throws IOException {
        IElementType current = lexer.getFlex().advance();
        while (JetTokens.WHITESPACES.contains(current)) {
            current = lexer.getFlex().advance();
        }
        return current;
    }

    public static IElementType readUntil(JetLexer lexer, short kind) throws IOException {
        IElementType token = lexer.getFlex().advance();
        while (token.getIndex() != kind) {
            token = lexer.getFlex().advance();
        }
        return token;
    }

}
