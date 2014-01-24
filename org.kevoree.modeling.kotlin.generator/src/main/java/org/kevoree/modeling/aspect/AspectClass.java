package org.kevoree.modeling.aspect;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 21/08/13
 * Time: 10:17
 */
public class AspectClass {

    public String name;

    public String packageName;

    public String aspectedClass;

    public AspectMethodList<AspectMethod> methods = new AspectMethodList<AspectMethod>();

    public File from = null;

    public List<String> imports = new ArrayList<String>();

    public List<AspectVar> vars = new ArrayList<AspectVar>();


    @Override
    public String toString() {
        StringBuffer buffer = new StringBuffer();
        buffer.append("Aspect " + packageName + "." + name + " for " + aspectedClass + " [\n");
        boolean isFirst = true;
        for (AspectMethod me : methods) {
            if (!isFirst) {
                buffer.append(",");
            }
            buffer.append(me.toString()+"\n");
            isFirst = false;
        }

        for (AspectVar me : vars) {
            buffer.append("var "+me.name+" : "+me.typeName+"\n");
        }
        buffer.append("]\n");
        return buffer.toString();
    }

    public String getContent(AspectMethod method) throws Exception {
        if(from == null){
            return "throw Exception(\"not implemented yet!\")";
        } else {
            RandomAccessFile raf = new RandomAccessFile(from.getAbsolutePath(), "r");
            raf.seek(method.startOffset);
            StringBuffer buffer = new StringBuffer();
            for (int i = 0; i < (method.endOffset - method.startOffset); i++) {
                buffer.append((char) raf.read());
            }
            return buffer.toString();
        }
    }


}
