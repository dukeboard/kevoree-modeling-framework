#ifndef DefaultTraceConverter_H
#define DefaultTraceConverter_H
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
#include <map>
#include <vector>
#include "TraceConverter.h"
#include "ModelTrace.h"
#include <typeinfo>
#include <iostream>
#include <google/dense_hash_map>

using std::string;
using std::list;
using std::cout;
using std::endl;

class DefaultTraceConverter : public TraceConverter
{

public:
	DefaultTraceConverter();
	~DefaultTraceConverter();
	
	void addAttEquivalence(string name1,string name2);
	string tryConvertClassName(string previousClassName);
	string tryConvertAttName(string previousAttName);

 virtual ModelTrace* convert(ModelTrace *trace) {
	 
	 //  std::cout << "DefaultTraceConverter convert" <<endl;
	if(typeid(trace) == typeid(ModelAddTrace))
	{
		  ModelAddTrace *addTrace =(ModelAddTrace*)trace;
		  std::cout << "ModelAddTrace" <<endl;
		  ModelAddTrace *newTrace = new ModelAddTrace( addTrace->srcPath,addTrace->refName, addTrace->previousPath,tryConvertClassName(addTrace->typeName));
		  return newTrace;

	}else if(typeid(trace) == typeid(ModelSetTrace))
	{
	      ModelSetTrace *setTrace =(ModelSetTrace*)trace;
	      		  std::cout << "ModelAddTrace" <<endl;
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
  google::dense_hash_map<string, string> metaClassNameEquivalence_1;
  google::dense_hash_map<string, string> metaClassNameEquivalence_2;

  google::dense_hash_map<string, string> attNameEquivalence_1;
  google::dense_hash_map<string, string> attNameEquivalence_2;



};

#endif
