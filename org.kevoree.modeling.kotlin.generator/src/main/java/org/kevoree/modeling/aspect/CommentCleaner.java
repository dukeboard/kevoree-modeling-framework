package org.kevoree.modeling.aspect;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 22/08/13
 * Time: 14:04
 */
public class CommentCleaner {

    public static void main(String[] args) throws Exception {
        System.out.println("Tester");
        CommentCleaner cleaner = new CommentCleaner();
        String contentCleaned = cleaner.cleanComment(new File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/fsm/org.kevoree.modeling.sample.fsm.kt/src/main/java/org/jetbrains/annotations/MyAspect.kt"));
          System.out.println(contentCleaned);
    }

    public String cleanComment(File aspectFile) throws Exception {

        StringBuffer buffer = new StringBuffer();
        int ch;
        boolean slashCommentFound = false;
        boolean starCommentFound = false;
        boolean firstSlashFound = false;
        boolean startOfComment = false;
        boolean endOfComment = false;
        boolean startDoubleQuoteFound = false;
        BufferedReader reader =
                new BufferedReader(new FileReader(aspectFile));

        while ((ch = reader.read()) != -1) {
            if (ch == '\"')
                startDoubleQuoteFound = !startDoubleQuoteFound;

            if (startDoubleQuoteFound
                    && (starCommentFound == true
                    || slashCommentFound == true))
                continue;

            if (ch == '/') {
                if (starCommentFound == true
                        && endOfComment == false)
                    continue;

                if (endOfComment
                        && starCommentFound == true) {
                    starCommentFound = false;
                    endOfComment = false;
                    startOfComment = false;
                    continue;
                } else if (firstSlashFound
                        && slashCommentFound == false
                        && starCommentFound == false) {
                    slashCommentFound = true;
                    firstSlashFound = false;
                    continue;
                } else if (slashCommentFound == false
                        && starCommentFound == false
                        && startDoubleQuoteFound == false) {
                    firstSlashFound = true;
                    continue;
                }
            }

            if (ch == '*') {
                if (starCommentFound) {
                    endOfComment = true;
                    continue;
                }

                if (firstSlashFound
                        && starCommentFound == false) {
                    starCommentFound = true;
                    firstSlashFound = false;
                    continue;
                } else if (startOfComment == false
                        && starCommentFound == true) {
                    startOfComment = true;
                    continue;
                }
            }

            if (ch == '\n') {
                if (slashCommentFound) {
                    slashCommentFound = false;
                    startOfComment = false;
                    firstSlashFound = false;
                    starCommentFound = false;
                    buffer.append((char) ch);
                    continue;
                }
            }

            if (starCommentFound == true
                    && endOfComment == false)
                continue;

            if (ch != '/' && ch != '*') {
                if (endOfComment)
                    buffer.append((char) ch);
                endOfComment = false;
                firstSlashFound = false;
                startOfComment = false;
                endOfComment = false;
            }
            if (slashCommentFound == false && starCommentFound == false) {
                buffer.append((char) ch);
            }
        }
        reader.close();
        return buffer.toString();
    }

}
