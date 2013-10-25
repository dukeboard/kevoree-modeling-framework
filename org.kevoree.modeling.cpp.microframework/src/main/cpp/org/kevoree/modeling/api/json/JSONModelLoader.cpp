/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

#include <json/JSONModelLoader.h>

//factory

JSONModelLoader::JSONModelLoader()
{
      factory = new KMFFactory();
}


JSONModelLoader::~JSONModelLoader()
{
       delete factory;
}


vector<KMFContainer*>& JSONModelLoader::loadModelFromString(string str){
		 std::istringstream ss( str); // convert string to istream
		 return loadModelFromStream(ss);
}

vector<KMFContainer*>& JSONModelLoader::loadModelFromStream( istream &inputStream){
    return deserialize(inputStream);
}

vector<KMFContainer*>& JSONModelLoader::deserialize(istream &inputStream){
             vector<ResolveCommand*> *resolverCommands = new vector<ResolveCommand*>;
             vector<KMFContainer*> *roots= new  vector<KMFContainer*>;
             Lexer *lexer =new Lexer(inputStream);
             Token currentToken = lexer->nextToken();
             if(currentToken.tokenType == LEFT_BRACE){
                  loadObject(lexer,"",NULL,roots,resolverCommands);
              } else
              {
                        throw "Bad Format / { expected";
              }

              for (std::vector<ResolveCommand*>::iterator it = resolverCommands->begin() ; it != resolverCommands->end(); ++it)
              {
                    ResolveCommand *cmd = *it;
                    cmd->run();

              }

       return *roots;
}


void JSONModelLoader::loadObject(Lexer *lexer,string nameInParent,KMFContainer *parent,vector<KMFContainer*> *roots ,vector<ResolveCommand*> *commands)
{
      Token currentToken = lexer->nextToken();

      if(currentToken.tokenType == VALUE){

            if(currentToken.value.compare("eClass")){
                    lexer->nextToken(); //unpop :
                    currentToken = lexer->nextToken(); //Two step for having the name
                    string name = currentToken.value;


            }



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
