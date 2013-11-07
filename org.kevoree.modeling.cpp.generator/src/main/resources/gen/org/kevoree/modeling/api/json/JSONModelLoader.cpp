/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

#include <json/JSONModelLoader.h>

//factory

JSONModelLoader::JSONModelLoader()
{
factory = NULL;

}


JSONModelLoader::~JSONModelLoader()
{

}


void JSONModelLoader::setFactory(KMFFactory *_factory){
 factory = _factory;
 }

vector<KMFContainer*>* JSONModelLoader::loadModelFromString(string str){
		 std::istringstream ss( str); // convert string to istream
		 return loadModelFromStream(ss);
}

vector<KMFContainer*>* JSONModelLoader::loadModelFromStream( istream &inputStream){
     if(!inputStream){
        PRINTF_ERROR("File no found");
        return NULL;
     }


    return deserialize(inputStream);
}

vector<KMFContainer*>* JSONModelLoader::deserialize(istream &inputStream){
             vector<ResolveCommand*> *resolverCommands = new vector<ResolveCommand*>;
             vector<KMFContainer*> *roots= new  vector<KMFContainer*>;
             Lexer *lexer =new Lexer(inputStream);
             Token currentToken = lexer->nextToken();
             if(currentToken.tokenType == LEFT_BRACE)
             {
                  loadObject(lexer,"",NULL,roots,resolverCommands);
                            for (std::vector<ResolveCommand*>::iterator it = resolverCommands->begin() ; it != resolverCommands->end(); ++it)
                                {
                                    ResolveCommand *cmd = *it;
                                    cmd->run();

                                }
              } else
              {
                        cout << "ERROR JSONModelLoader::deserializeBad Format / { expected" << endl;
              }


       delete resolverCommands;
       delete lexer;
       return roots;
}


void JSONModelLoader::loadObject(Lexer *lexer,string nameInParent,KMFContainer *parent,vector<KMFContainer*> *roots ,vector<ResolveCommand*> *commands)
{
        //   cout <<  "loadObject " << nameInParent << " parent adr = "<< parent  << endl;

      Token currentToken = lexer->nextToken();
      KMFContainer  *currentObject=NULL;
      if(currentToken.tokenType == VALUE){
            if(currentToken.value.compare("eClass") == 0){

                    lexer->nextToken(); //unpop :
                    currentToken = lexer->nextToken(); //Two step for having the name
                    string name = currentToken.value;
                    if(factory == NULL)
                    {
                             cout << "ERROR JSONModelLoader Factory is NULL " << endl;
                             return;
                    }

                    currentObject = factory->create(name);
                             PRINTF("Create " << name << " adr =" <<currentObject);
                    if(currentObject == NULL){
                        cout << "ERROR JSONModelLoader Factory create  " << name << endl;
                        return;
                    }

                    if(parent == NULL){
                        roots->push_back(currentObject);
                    }
                    string currentNameAttOrRef;
                    bool refModel = false;
                    currentToken = lexer->nextToken();

                    while(currentToken.tokenType != EOF){
                          if(currentToken.tokenType == LEFT_BRACE)
                          {
                                  loadObject(lexer, currentNameAttOrRef, currentObject, roots, commands);
                          }
                              /*
                       if(currentToken.tokenType == COMMA){
                        //ignore
                         }      */
                           if(currentToken.tokenType == VALUE){
                                       if(currentNameAttOrRef.empty())
                                       {
                                             currentNameAttOrRef = currentToken.value;
                                        } else
                                        {
                                                 if(refModel)
                                                 {

                                                      ResolveCommand *resolvecommand = new ResolveCommand(roots, currentToken.value, currentObject, currentNameAttOrRef);
                                                      commands->push_back(resolvecommand);
                                                 } else
                                                 {

                                                    any  json =string(unescapeJSON(currentToken.value));
                                                   //         cout << "SET "<< currentNameAttOrRef << " "<< unescapeJSON(currentToken.value)<< endl;
                                                    currentObject->reflexiveMutator(SET, currentNameAttOrRef,json ,false,false)   ;
                                                    currentNameAttOrRef.clear();
                                                 }
                                       }

                           }

                          if(currentToken.tokenType == LEFT_BRACKET){
                            currentToken = lexer->nextToken();
                            if(currentToken.tokenType == LEFT_BRACE){
                                loadObject(lexer, currentNameAttOrRef, currentObject, roots, commands) ;
                            } else {
                                refModel = true; //wait for all ref to be found
                                if(currentToken.tokenType == VALUE){
                                     ResolveCommand *resolvecommand = new ResolveCommand(roots, currentToken.value, currentObject, currentNameAttOrRef);
                                     commands->push_back(resolvecommand);
                                }
                            }
                        }

                         if(currentToken.tokenType == RIGHT_BRACKET){
                                        currentNameAttOrRef.clear();
                                                refModel = false ;
                          }


                    if(currentToken.tokenType == RIGHT_BRACE){
                        if(parent != NULL){
                                  any  json =currentObject;
                                     //   cout << "PARENT ADD"  << " " << currentObject << " " <<  nameInParent << endl;


                                      parent->reflexiveMutator(ADD, nameInParent,json ,false,false)   ;

                        }
                        return; //go out
                    }

                          currentToken = lexer->nextToken();

                     }


            }   else {
                               cout << ("Bad Format / eClass att must be first") <<endl;
                               //TODO save temp att
             }



      }  else {
                        cout <<  ("Bad Format") <<endl;
       }

}

string  JSONModelLoader::unescapeJSON(string src){
             string builder;
             int i=0;
             while(i < src.size()){
                 char c = src[i];
                if(c == '&') {
                  if(builder.empty()) {
                      builder = src.substr(0,i)  ;
                  }
                  if(src[i+1]=='a') {
                      builder +=  "'";
                      i = i+6 ;
                  } else if(src[i+1]=='q') {
                      builder += "\"";
                      i = i+6;
                  } else {
                     cout <<    "Could not unescaped chain:" + src[i] + src[i+1] << endl;
                  }
              } else {
                 if(!builder.empty()) {
                      builder += c;
                  }
                  i++   ;
              }
             }

             if(!builder.empty()) {
                 return builder;
             } else
              {
                 return src;
             }


}
