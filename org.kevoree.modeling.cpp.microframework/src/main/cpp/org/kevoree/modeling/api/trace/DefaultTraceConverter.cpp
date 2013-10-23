
#include "TraceConverter.h"
#include "DefaultTraceConverter.h"


DefaultTraceConverter::DefaultTraceConverter(){
  metaClassNameEquivalence_1 = new Hashmap<string>();
  metaClassNameEquivalence_2 = new Hashmap<string>();
  attNameEquivalence_1 = new Hashmap<string>();
  attNameEquivalence_2 = new Hashmap<string>();
}

DefaultTraceConverter::~DefaultTraceConverter(){
	delete metaClassNameEquivalence_1;
	delete metaClassNameEquivalence_2;
	delete attNameEquivalence_1;
	delete attNameEquivalence_2;
}

void DefaultTraceConverter::addAttEquivalence (string name1, string name2)
{
  attNameEquivalence_1->insert (name1, name2);
  attNameEquivalence_2->insert (name2, name2);
}



string DefaultTraceConverter::tryConvertClassName(string previousClassName){
	string result;
	if(!previousClassName.empty ()){
		return result;
	}
	if(metaClassNameEquivalence_1->find(previousClassName) != 0){
		return *(metaClassNameEquivalence_1->find(previousClassName));
	}
		
	if(metaClassNameEquivalence_2->find(previousClassName) != 0){
		return *(metaClassNameEquivalence_2->find(previousClassName));
	}						
	return previousClassName;
}

string DefaultTraceConverter::tryConvertAttName(string previousAttName){
	string result;
	if(!previousAttName.empty ()){
		return result;
	}
	 string FQNattName = previousAttName; // TODO build FQN att Name using parent Type

    if(metaClassNameEquivalence_1->find(FQNattName) != 0){
		return *(metaClassNameEquivalence_1->find(FQNattName));
	}
	
	if(metaClassNameEquivalence_2->find(FQNattName) != 0){
		return *(metaClassNameEquivalence_2->find(FQNattName));
	}	
}
