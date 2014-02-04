package org.kevoree.modeling.api.trace

import java.util.HashMap
import org.kevoree.modeling.api.compare.ModelCompare
import java.util.ArrayList

/**
 * Created by duke on 09/08/13.
 */

class DefaultTraceConverter(): TraceConverter {

    private var metaClassNameEquivalence_1 = HashMap<String, String>()
    private var metaClassNameEquivalence_2 = HashMap<String, String>()

    private var attNameEquivalence_1 = HashMap<String, String>()
    private var attNameEquivalence_2 = HashMap<String, String>()

    fun addMetaClassEquivalence(name1: String, name2: String) {
        metaClassNameEquivalence_1.put(name1, name2)
        metaClassNameEquivalence_2.put(name2, name2)
    }


    fun addAttEquivalence(name1: String, name2: String) {
        //TODO
        var fqnArray_1 = name1.split("#")
        var fqnArray_2 = name1.split("#")
        //TODO
        attNameEquivalence_1.put(name1, name2)
        attNameEquivalence_2.put(name2, name2)
    }


    override fun convert(trace: ModelTrace): ModelTrace {

            when(trace){
                is ModelAddTrace -> {
                    val addTrace = trace as ModelAddTrace
                    val newTrace = ModelAddTrace(
                            addTrace.srcPath,
                            addTrace.refName, //TODO need the origin type of the src // (workaround, try to solve directly on model => bad idea)
                            addTrace.previousPath,
                            tryConvertClassName(addTrace.typeName)
                    )
                    return newTrace;
                }
                is ModelSetTrace -> {
                    val setTrace = trace as ModelSetTrace
                    val newTrace = ModelSetTrace(
                            setTrace.srcPath,
                            setTrace.refName, //TODO need the origin type of the src // (workaround, try to solve directly on model => bad idea)
                            setTrace.objPath,
                            setTrace.content,
                            tryConvertClassName(setTrace.typeName)
                    )
                    return newTrace;
                }
                else -> {
                     return trace
                }
            }

    }


    private fun tryConvertPath(previousPath: String?): String? {
        if(previousPath == null){
            return null;
        }
        //TODO, analyze the path and convert attribute
        return previousPath;
    }

    private fun tryConvertClassName(previousClassName: String?): String? {
        if(previousClassName == null){
            return null;
        }
        if(metaClassNameEquivalence_1.containsKey(previousClassName)){
            return metaClassNameEquivalence_1.get(previousClassName)!!;
        }
        if(metaClassNameEquivalence_2.containsKey(previousClassName)){
            return metaClassNameEquivalence_2.get(previousClassName)!!;
        }
        return previousClassName;
    }

    private fun tryConvertAttName(previousAttName: String?): String? {
        if(previousAttName == null){
            return null;
        }
        val FQNattName = previousAttName // TODO build FQN att Name using parent Type
        if(attNameEquivalence_1.containsKey(FQNattName)){
            return attNameEquivalence_1.get(FQNattName)!!;
        }
        if(attNameEquivalence_2.containsKey(FQNattName)){
            return attNameEquivalence_2.get(FQNattName)!!;
        }
        return previousAttName;
    }



}
