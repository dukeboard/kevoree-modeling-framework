
#include "TraceConverter.h"
#include "DefaultTraceConverter.h"




void DefaultTraceConverter::addAttEquivalence (string name1, string name2)
{
  attNameEquivalence_1.insert (std::pair < std::string,std::string > (name1, name2));
  attNameEquivalence_2.insert (std::pair < std::string,std::string > (name2, name2));
}



string DefaultTraceConverter::tryConvertClassName(string previousClassName){
	string result;
	if(!previousClassName.empty ()){
		return result;
	}
	
    if(metaClassNameEquivalence_1.count(previousClassName) == 1){
		  map<string, string>::iterator p;
			p =  metaClassNameEquivalence_1.find(previousClassName);
			if(p != metaClassNameEquivalence_1.end()) 
				return p->second;
     }
     
     if(metaClassNameEquivalence_2.count(previousClassName) == 1){
		  map<string, string>::iterator p;
			p =  metaClassNameEquivalence_2.find(previousClassName);
			if(p != metaClassNameEquivalence_2.end()) 
				return p->second;
     }
     
     
 
	return previousClassName;
}



string DefaultTraceConverter::tryConvertAttName(string previousAttName){
	string result;
	if(!previousAttName.empty ()){
		return result;
	}
	 string FQNattName = previousAttName; // TODO build FQN att Name using parent Type
	 
    if(metaClassNameEquivalence_1.count(FQNattName) == 1){
		  map<string, string>::iterator p;
			p =  metaClassNameEquivalence_1.find(FQNattName);
			if(p != metaClassNameEquivalence_1.end()) 
				return p->second;
     }
     
     if(metaClassNameEquivalence_2.count(FQNattName) == 1){
		  map<string, string>::iterator p;
			p =  metaClassNameEquivalence_2.find(FQNattName);
			if(p != metaClassNameEquivalence_2.end()) 
				return p->second;
     }
	
}
