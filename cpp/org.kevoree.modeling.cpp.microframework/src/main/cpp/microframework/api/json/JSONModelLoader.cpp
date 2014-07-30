/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

#include <microframework/api/json/JSONModelLoader.h>

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
	if(!inputStream)
	{
		Logger::Write(Logger::ERROR,"JSONModelLoader::loadModelFromStream the file is not available ");
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
			delete cmd;

		}
	} else
	{
		delete roots;
		roots = NULL;
		Logger::Write(Logger::ERROR,"JSONModelLoader::deserializeBad Format / { expected");
	}


	delete resolverCommands;
	delete lexer;
	return roots;
}


void JSONModelLoader::loadObject(Lexer *lexer,string nameInParent,KMFContainer *parent,vector<KMFContainer*> *roots ,vector<ResolveCommand*> *commands)
{
	Logger::Write(Logger::DEBUG_MICROFRAMEWORK, "loadObject "+nameInParent);
	Token currentToken = lexer->nextToken();
	KMFContainer  *currentObject=NULL;
	if(currentToken.tokenType == VALUE)
	{
		if(currentToken.value.compare("eClass") == 0){

			lexer->nextToken(); //unpop :
			currentToken = lexer->nextToken(); //Two step for having the name
			string name = currentToken.value;
			if(factory == NULL)
			{
				Logger::Write(Logger::ERROR," JSONModelLoader::loadObject the Default Factory is NULL WTF");
				throw std::string( " JSONModelLoader::loadObject the Default Factory is NULL WTF" );
			}

			currentObject = factory->create(name);
			Logger::Write(Logger::DEBUG_MICROFRAMEWORK, "Create "+name);
			if(currentObject == NULL)
			{
				throw std::string(" JSONModelLoader::loadObject the Default Factory failed to build "+name );
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
					if(parent != NULL)
					{
						any  json =currentObject;
						Logger::Write(Logger::DEBUG_MICROFRAMEWORK, "PARENT ADD" +nameInParent);
						parent->reflexiveMutator(ADD, nameInParent,json ,false,false)   ;
					}
					return; //go out
				}

				currentToken = lexer->nextToken();

			}


		}else
		{
			throw std::string("Bad Format / eClass att must be first");
			//TODO save temp att
		}



	}  else
	{
		throw std::string("Bad Format");
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
			} else
			{
				Logger::Write(Logger::ERROR,"JSONModelLoader::unescapeJSON Could not unescaped chain:" + src[i] + src[i+1] );
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
