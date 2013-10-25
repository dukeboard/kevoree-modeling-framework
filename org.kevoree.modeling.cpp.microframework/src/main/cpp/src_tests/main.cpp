
#include <trace/ModelTrace.h>
#include <trace/DefaultTraceConverter.h>
#include <json/Lexer.h>
#include <trace/TraceSequence.h>
#include <json/JSONModelLoader.h>


#include <iostream>
#include <fstream>


/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36

 TODO USE CCPUNIT
 */
int main(int argc,char **argv){
/*

google::dense_hash_map<string,any> dmap;

  dmap.set_empty_key("");



any powet =    new ModelAddTrace("","nodes","nodes[server-node]","org.kevoree.ContainerNode");

   dmap["efef"] = powet;

  any efef =  dmap["efef"]   ;

  ModelAddTrace *tdefef =AnyCast<ModelAddTrace*>(efef);

            	std::cout << tdefef->toString() << endl;    */


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

//delete model_trace;


/* ********************************************************************* */



/* *********************************Test Lexer ************************ */
ifstream myfile;
 myfile.open ("src_tests/trace.example");
 if(!myfile){
     cout << "no file trace" << endl;
 }

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
 file_TraceSequence.open ("src_tests/trace.example");
  TraceSequence *tracesequence = new TraceSequence();

  tracesequence->populateFromStream(file_TraceSequence);
if(tracesequence->exportToString().compare("[{ \"traceType\" : 0 , \"src\" : \"\", \"refname\" : \"generated_KMF_ID\", \"content\" : \"0.168778813909739261382348563259\"},{ \"traceType\" : 1 , \"src\" : \"\", \"refname\" : \"nodes\", \"previouspath\" : \"nodes[server-node]\"}]") == -1){
            	std::cout << "Error file_TraceSequence toString()" << endl;
}

    file_TraceSequence.close();
     delete tracesequence;



 /* ********************************* any ************************ */
     any t  = new ModelAddTrace("","nodes","nodes[server-node]","org.kevoree.ContainerNode");
	if(!t.empty()){
		if(t.type() == typeid(ModelAddTrace*)){
			ModelAddTrace *td =AnyCast<ModelAddTrace*>(t);
			if(td->toString().compare("{ \"traceType\" : 1 , \"src\" : \"\", \"refname\" : \"nodes\", \"previouspath\" : \"nodes[server-node]\"}") == -1){
			   	std::cout << "Error ModelAddTrace AnyCast toString()" << endl;
			}

		}
	}

ifstream myfile_json;
 myfile_json.open ("src_tests/trace.json");
 if(!myfile_json){
     cout << "no file trace" << endl;
 }


	JSONModelLoader jsonloader;

	jsonloader.loadModelFromStream(myfile_json);





/* ******************************************************************* */


    cout << "PASS" << endl;



/* ********************************************************************* */



}
