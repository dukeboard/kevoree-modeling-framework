#ifndef DefaultTraceConverter_H
#define DefaultTraceConverter_H
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
#include <map>
#include <vector>
#include <microframework/api/trace/TraceConverter.h>
#include <microframework/api/trace/ModelTrace.h>
#include <typeinfo>
#include <iostream>


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
	std::map<string, string> metaClassNameEquivalence_1;
	std::map<string, string> metaClassNameEquivalence_2;

	std::map<string, string> attNameEquivalence_1;
	std::map<string, string> attNameEquivalence_2;



};

#endif
