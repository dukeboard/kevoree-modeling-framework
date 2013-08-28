package org.kevoree.test

import java.io.ByteArrayInputStream
import java.io.InputStream
import org.kevoree.modeling.api.KMFContainer
import java.util.ArrayList
import org.kevoree.factory.MainFactory
import java.util.LinkedList
import org.kevoree.modeling.api.util.ActionType

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 13:08
 */
public class JSONModelLoader  {

    var factory = MainFactory()

    fun loadModelFromString(str: String): List<KMFContainer>? {
        return deserialize(ByteArrayInputStream(str.toByteArray()))
    }

    fun loadModelFromStream(inputStream: InputStream): List<KMFContainer>? {
        return deserialize(inputStream)
    }

    private fun deserialize(instream: InputStream): List<KMFContainer> {

        var resolverCommands = ArrayList<ResolveCommand>()
        var roots = ArrayList<KMFContainer>()
        var currentRoot: KMFContainer? = null
        var lexer: Lexer = Lexer(instream)
        var currentRefName: LinkedList<String> = LinkedList<String>()
        var currentToken = lexer.nextToken()
        var parentToAdd: KMFContainer? = null

        while(currentToken.tokenType != org.kevoree.loader.Type.EOF){
            if(currentToken.tokenType == org.kevoree.loader.Type.LEFT_BRACE){
            }
            if(currentToken.tokenType == org.kevoree.loader.Type.RIGHT_BRACKET){
                System.out.println("Pop "+currentRefName.peek());
                currentRefName.poll()
            }
            if(currentToken.tokenType == org.kevoree.loader.Type.RIGHT_BRACE){
                if(parentToAdd != null && currentRoot != null){
                    parentToAdd!!.reflexiveMutator(ActionType.ADD, currentRefName.peek()!!, currentRoot)
                    parentToAdd = null
                    currentRoot = parentToAdd
                }
            }
            if(currentToken.tokenType == org.kevoree.loader.Type.VALUE){
                if(currentToken.value == "eClass"){
                    lexer.nextToken()
                    currentToken = lexer.nextToken() //Two step for having the name
                    val name = currentToken.value?.toString()!!.replace(":", ".")
                    parentToAdd = currentRoot
                    currentRoot = factory.create(name)
                    System.out.println("Create "+name);
                    if(parentToAdd == null){
                        roots.add(currentRoot!!)
                    }
                } else {
                    if(currentRoot != null){
                        val tempName = currentToken.value.toString()
                        lexer.nextToken() //pop :
                        currentToken = lexer.nextToken()
                        if(currentToken.tokenType == org.kevoree.loader.Type.LEFT_BRACKET){
                            currentToken = lexer.nextToken()
                            if(currentToken.tokenType == org.kevoree.loader.Type.LEFT_BRACE){
                                System.out.println("Push "+tempName);
                                currentRefName.add(0, tempName) //pop and go out
                            } else {
                                //Set of ref
                                while(currentToken.tokenType != org.kevoree.loader.Type.EOF && currentToken.tokenType != org.kevoree.loader.Type.RIGHT_BRACKET){
                                    if(currentToken.tokenType == org.kevoree.loader.Type.VALUE){
                                        resolverCommands.add(ResolveCommand(roots, currentToken.value!!.toString(), currentRoot!!, tempName))
                                    } else {
                                        if(currentToken.tokenType == org.kevoree.loader.Type.COLON){
                                        } else {
                                            throw Exception("Bad format " + currentToken)
                                        }
                                    }
                                    System.out.println(currentToken)
                                    currentToken = lexer.nextToken()
                                }
                                if(currentToken.tokenType == org.kevoree.loader.Type.RIGHT_BRACKET){
                                    currentToken = lexer.nextToken()
                                }
                            }
                        } else {
                            if(currentToken.tokenType == org.kevoree.loader.Type.VALUE){
                                currentRoot!!.reflexiveMutator(ActionType.SET, tempName, currentToken.value)
                            } else {
                                throw Exception("Bad format " + currentToken)
                            }
                        }
                    }
                }
            }
            currentToken = lexer.nextToken()
        }
        for(resol in resolverCommands){
            resol.run()
        }
        return roots
    }

}

class ResolveCommand(val roots: ArrayList<KMFContainer>, val ref: String, val currentRootElem: KMFContainer, val refName: String) {
    fun run() {
        var referencedElement: Any? = null
        var i = 0
        while(referencedElement == null && i < roots.size()) {
            referencedElement = roots.get(i++).findByPath(ref)
        }
        if(referencedElement != null) {
            currentRootElem.reflexiveMutator(ActionType.ADD, refName, referencedElement)
        }
    }
}
