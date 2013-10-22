
#include "trace/ModelTrace.h"
#include "trace/DefaultTraceConverter.h"
#include "json/Lexer.h"

#include <iostream>
#include <fstream>

int main(int argc,char **argv){


ModelAddTrace *t = new ModelAddTrace("","","","");
DefaultTraceConverter *defaultTraceConvert = new DefaultTraceConverter();


ModelAddTrace *t2 = (ModelAddTrace*)defaultTraceConvert->convert(t);
if(typeid(t) != typeid(t2)){
		std::cout << "Error DefaultTraceConverter" << endl;
}


/* Test Lexer */
ifstream myfile;
 myfile.open ("trace.example");
  
Lexer *lexer = new Lexer(myfile);
int count = 0;
Token token = lexer->nextToken(); 
 while(token.tokenType != LexerType(END_OF_FILE)){
	 	//std::cout  << token.toString()<< endl;
	 	token =lexer->nextToken(); 
	 	count++;
 }
if(count != 4207){
	std::cout << "Error Lexer" << endl;
}
  myfile.close();




}
