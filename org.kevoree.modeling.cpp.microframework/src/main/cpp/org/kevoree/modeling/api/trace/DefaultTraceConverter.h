#ifndef DefaultTraceConverter_H
#define DefaultTraceConverter_H

#include <map>
#include <vector>
#include "TraceConverter.h"
#include "ModelTrace.h"
#include <typeinfo>
#include <stdio.h>

using namespace std;

class DefaultTraceConverter : public TraceConverter
{

public:
  DefaultTraceConverter() : TraceConverter(){}
void addAttEquivalence(string name1,string name2);

string tryConvertClassName(string previousClassName);
string tryConvertAttName(string previousAttName);

 virtual ModelTrace* convert(ModelTrace *trace) {
	 
	if(typeid(trace) == typeid(ModelAddTrace))
	{
		  ModelAddTrace *addTrace =(ModelAddTrace*)trace;

		  ModelAddTrace *newTrace = new ModelAddTrace( addTrace->srcPath,addTrace->refName, addTrace->previousPath,tryConvertClassName(addTrace->typeName));
		  return newTrace;

	}else if(typeid(trace) == typeid(ModelSetTrace))
	{
	      ModelSetTrace *setTrace =(ModelSetTrace*)trace;
		  ModelSetTrace *newTrace = new ModelSetTrace( 
                            setTrace->srcPath,
                            setTrace->refName, //TODO need the origin type of the src // (workaround, try to solve directly on model => bad idea)
                            setTrace->objPath,
                            setTrace->content,
                            tryConvertClassName(setTrace->typeName));
		return newTrace;
		
	}else {
		return trace;	
	} 
	
}


private:
 std::map<std::string, std::string> metaClassNameEquivalence_1;
 std::map<std::string, std::string> metaClassNameEquivalence_2;
  
 std::map<std::string, std::string> attNameEquivalence_1;
 std::map<std::string, std::string> attNameEquivalence_2;
  
  
 

};

#endif
