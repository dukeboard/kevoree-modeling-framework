#include "TraceSequence.h"

#include <map>
#include <list>
#include <sstream>
#include <microframework/api/json/Lexer.h>
#include <stdlib.h>
using std::string;
using std::list;
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
TraceSequence::TraceSequence(){

}

TraceSequence::~TraceSequence(){
	for (std::list<ModelTrace*>::iterator iterator = traces.begin(), end = traces.end(); iterator != end; ++iterator)
	{
		delete *iterator;
	}
	traces.clear();
}


TraceSequence* TraceSequence::populate(std::list<ModelTrace*> *addtraces)
{
	std::copy(addtraces->begin(), addtraces->end(), std::back_insert_iterator<std::list<ModelTrace*> >(traces)); // addAll
	delete addtraces;
	return this;
}


void TraceSequence::append(TraceSequence *seq){
	std::copy(seq->traces.begin(), seq->traces.end(), std::back_insert_iterator<std::list<ModelTrace*> >(traces)); // addAll
}



TraceSequence* TraceSequence::populateFromString(string addtracesTxt){
	std::istringstream ss( addtracesTxt); // convert string to istream
	return populateFromStream(ss);
}


TraceSequence* TraceSequence::populateFromStream(istream &inputStream )
{
	Lexer *lexer= new Lexer(inputStream);
	Token currentToken = lexer->nextToken();

	if(currentToken.tokenType != LEFT_BRACKET)
	{
		LOGGER_WRITE(Logger::ERROR,"TraceSequence::populateFromStream Bad Format : expect [");
		throw ("Bad Format : expect [");
	}

	currentToken = lexer->nextToken();

	std::map<string, string> keys;
	string previousName;
	ModelTrace *modeltrace;

	while (currentToken.tokenType != END_OF_FILE && currentToken.tokenType != RIGHT_BRACKET) {

		if(currentToken.tokenType == LEFT_BRACE){
			keys.clear();
		}

		if(currentToken.tokenType == VALUE){
			if(!previousName.empty()){
				keys[previousName] = currentToken.value;
				previousName.clear();
			}   else {
				previousName = currentToken.value;
			}
		}

		if(currentToken.tokenType == RIGHT_BRACE){

			if(keys.find("traceType") != keys.end()){

				string traceType = keys["traceType"];
				string _src = "";
				string _refname = "";
				string _objpath = "";
				string _content = "";
				string _typename = "";
				string _previouspath = "";
				list < string > _l_previousPath;
				list < string > _l_typeName;

				switch(atoi(traceType.c_str())){

				case SET:

					if(keys.find("src") != keys.end()){
						_src =keys["src"];
					}
					if(keys.find("refname") != keys.end()){
						_refname =keys["refname"];
					}
					if(keys.find("objpath") != keys.end()){
						_objpath =keys["objpath"];
					}
					if(keys.find("content") != keys.end()){
						_content =keys["content"];
					}
					if(keys.find("typename") != keys.end()){
						_typename =keys["typename"];
					}

					modeltrace = new ModelSetTrace(_src,_refname,_objpath,_content,_typename);

					traces.push_back(modeltrace);

					break;

				case ADD:
					if(keys.find("src") != keys.end()){
						_src =keys["src"];
					}
					if(keys.find("refname") != keys.end()){
						_refname =keys["refname"];
					}
					if(keys.find("previouspath") != keys.end()){
						_previouspath =keys["previouspath"];
					}

					if(keys.find("typename") != keys.end()){
						_typename =keys["typename"];
					}
					modeltrace =new ModelAddTrace(_src,_refname,_previouspath,_typename);
					traces.push_back(modeltrace);
					break;

				case REMOVE:

					if(keys.find("src") != keys.end()){
						_src =keys["src"];
					}
					if(keys.find("refname") != keys.end()){
						_refname =keys["refname"];
					}
					if(keys.find("objpath") != keys.end()){
						_objpath =keys["objpath"];
					}
					modeltrace= new ModelRemoveTrace(_src,_refname,_objpath);
					traces.push_back(modeltrace);
					break;

				case ADD_ALL:
					/*
								if(keys->find("src") != 0){
									_src =*(keys->find("src"));
								}
								if(keys->find("refname") != 0){
									_refname =*(keys->find("refname"));
								}	
								if(keys->find("content") != 0){
									_content =*(keys->find("content"));
								}	
					 */
					cout << "TODO ADD_ALL !!!" <<endl;
					break;

				case REMOVE_ALL:
					cout << "TODO REMOVE_ALL !!!" <<endl;

					break;

				case RENEW_INDEX:
					cout << "TODO RENEW_INDEX !!!" <<endl;
					break;

				default :
					cout << "TRACE LOST !!!" <<endl;
					break;
				}
			}
		}
		currentToken = lexer->nextToken();
	}
	delete lexer;

	return this;
}

string TraceSequence::exportToString(){
	string buffer;
	buffer.append("[");
	bool isFirst = true;
	for (std::list<ModelTrace*>::const_iterator iterator = traces.begin(), end = traces.end(); iterator != end; ++iterator)
	{
		if(!isFirst){
			buffer.append(",");
		}
		ModelTrace *t = *iterator;
		buffer.append(t->toString());
		isFirst = false;
	}
	buffer.append("]");
	return buffer;
}


string TraceSequence::toString()  {
	return exportToString();
}

void TraceSequence::reverse(){
	traces.reverse();
}
