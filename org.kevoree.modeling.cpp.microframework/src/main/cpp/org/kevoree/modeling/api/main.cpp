
#include "trace/ModelTrace.h"
#include "trace/DefaultTraceConverter.h"
#include "json/Lexer.h"
#include "trace/TraceSequence.h"

#include <iostream>
#include <fstream>

int main(int argc,char **argv){


ModelTrace *model_trace = new ModelAddTrace("","nodes","nodes[server-node]","org.kevoree.ContainerNode");

if(model_trace->toString().compare("{ \"traceType\" : 1 , \"src\" : \"\", \"refname\" : \"nodes\", \"previouspath\" : \"nodes[server-node]\"}") == -1){
	std::cout << "Error ModelAddTrace toString()" << endl;
}
/*
list<ModelTrace*> traces;
  
  traces.push_back(model_trace);
  
   	for (std::list<ModelTrace*>::iterator iterator = traces.begin(), end = traces.end(); iterator != end; ++iterator) 
        {
			ModelTrace * t = *iterator;
			
			cout << t->toString() <<endl;
		}*/
  
/* *********************************Test DefaultTraceConverter ************************ */
DefaultTraceConverter *defaultTraceConvert = new DefaultTraceConverter();


ModelAddTrace *t2 = (ModelAddTrace*)defaultTraceConvert->convert(model_trace);

delete model_trace;


/* ********************************************************************* */ 



/* *********************************Test Lexer ************************ */
ifstream myfile;
 myfile.open ("trace.example");
  
Lexer *lexer = new Lexer(myfile);
int count = 0;
Token token = lexer->nextToken(); 

//cout << lexer->isValueLetter('r') << endl;


 while(token.tokenType != END_OF_FILE){
	 	//std::cout  <<token.tokenType << " - " <<token.value<< endl;
	 	token =lexer->nextToken(); 
	 	count++;
 }
if(count != 41){
	std::cout << "Error Lexer" << count << endl;
}

 if(lexer->isDigit('0') != true){
	 	std::cout << "Error Lexer isDigit" << endl;
 }
 
 
  myfile.close();

/* ********************************************************************* */ 
 
 /* ********************************* TraceSequence ************************ */ 
 
fstream file_TraceSequence;
 file_TraceSequence.open ("trace.example");
  TraceSequence *tracesequence = new TraceSequence();

  tracesequence->populateFromStream(file_TraceSequence);
   tracesequence->exportToString();
  //cout << <<endl;
  
    file_TraceSequence.close();
     delete tracesequence;
     
     
    cout << "FINISH" << endl;
    
    

/* ********************************************************************* */ 



}
