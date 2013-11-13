
#include "TraceConverter.h"
#include "DefaultTraceConverter.h"

/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
DefaultTraceConverter::DefaultTraceConverter(){

  metaClassNameEquivalence_1.set_empty_key("");
  metaClassNameEquivalence_2.set_empty_key("");
  attNameEquivalence_1.set_empty_key("");
  attNameEquivalence_2.set_empty_key("");
}

DefaultTraceConverter::~DefaultTraceConverter(){

}

void DefaultTraceConverter::addAttEquivalence (string name1, string name2)
{
  attNameEquivalence_1[name1] =  name2;
  attNameEquivalence_2[name2] =  name2;
}



string DefaultTraceConverter::tryConvertClassName(string previousClassName){
	string result;
	if(!previousClassName.empty ()){
		return result;
	}

	if(metaClassNameEquivalence_1.find(previousClassName) != metaClassNameEquivalence_1.end()){
          return   metaClassNameEquivalence_1[previousClassName];
    }


	if(metaClassNameEquivalence_2.find(previousClassName) != metaClassNameEquivalence_2.end()){
          return   metaClassNameEquivalence_2[previousClassName];
    }

	return previousClassName;
}

string DefaultTraceConverter::tryConvertAttName(string previousAttName){
	string result;
	if(!previousAttName.empty ()){
		return result;
	}
	 string FQNattName = previousAttName; // TODO build FQN att Name using parent Type


	if(metaClassNameEquivalence_1.find(FQNattName) != metaClassNameEquivalence_1.end()){
             return   metaClassNameEquivalence_1[FQNattName];
     }

	if(metaClassNameEquivalence_2.find(FQNattName) != metaClassNameEquivalence_1.end()){
             return   metaClassNameEquivalence_2[FQNattName];
     }

}
