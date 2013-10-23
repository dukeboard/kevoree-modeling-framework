#include "TraceSequence.h"

#include <map>
#include <list>
#include <sstream>
#include "../json/Lexer.h"
#include "../utils/Hashmap.h"
#include <stdlib.h>
using namespace std;



TraceSequence::TraceSequence(){

}
	
TraceSequence::~TraceSequence(){
		for (std::list<ModelTrace*>::iterator iterator = traces.begin(), end = traces.end(); iterator != end; ++iterator) 
        {
			   ModelTrace * t = *iterator;
			   delete t;
		}	
		traces.clear();
}


TraceSequence* TraceSequence::populate(std::list<ModelTrace*> addtraces){  
	     std::copy(addtraces.begin(), addtraces.end(), std::back_insert_iterator<std::list<ModelTrace*> >(traces)); // addAll
        return this;	
}

    
void TraceSequence::append(TraceSequence seq){
	 std::copy(seq.traces.begin(), seq.traces.end(), std::back_insert_iterator<std::list<ModelTrace*> >(traces)); // addAll
}



TraceSequence* TraceSequence::populateFromString(string addtracesTxt){
		 std::istringstream ss( addtracesTxt); // convert string to istream
		 return populateFromStream(ss);	
}


TraceSequence* TraceSequence::populateFromStream(istream &inputStream )
{
	  Lexer *lexer= new Lexer(inputStream);
      Token currentToken = lexer->nextToken();
  
        if(currentToken.tokenType != LEFT_BRACKET){
            throw ("Bad Format : expect [");
        }
        
      currentToken = lexer->nextToken();
      Hashmap<string> *keys = new Hashmap<string>();
      string previousName;
      ModelTrace *modeltrace;
      
      while (currentToken.tokenType != END_OF_FILE && currentToken.tokenType != RIGHT_BRACKET) {
				
	      if(currentToken.tokenType == LEFT_BRACE){
				delete keys;
				keys = new Hashmap<string>();
          }
          
          if(currentToken.tokenType == VALUE){
                if(!previousName.empty()){
                    keys->insert(previousName,currentToken.value);
                    previousName.clear();
                }   else {
                    previousName = currentToken.value;
                }
            }
            
             if(currentToken.tokenType == RIGHT_BRACE){
			
					if(keys->find("traceType") != 0){
						
						string traceType = *(keys->find("traceType"));
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
					
								if(keys->find("src") != 0){
									_src =*(keys->find("src"));
								}
								if(keys->find("src") != 0){
									_src =*(keys->find("src"));
								}
								if(keys->find("refname") != 0){
									_refname =*(keys->find("refname"));
								}		
								if(keys->find("objpath") != 0){
									_objpath =*(keys->find("objpath"));
								}	
								if(keys->find("content") != 0){
									_content =*(keys->find("content"));
								}
								if(keys->find("typename") != 0){
									_typename =*(keys->find("typename"));
								}	
								modeltrace = new ModelSetTrace(_src,_refname,_objpath,_content,_typename);
		
								traces.push_back(modeltrace);
			
							break;
							
							case ADD:
								if(keys->find("src") != 0){
									_src =*(keys->find("src"));
								}
								if(keys->find("refname") != 0){
									_refname =*(keys->find("refname"));
								}	
								if(keys->find("previouspath") != 0){
									_previouspath =*(keys->find("previouspath"));
								}	
								if(keys->find("typename") != 0){
									_typename =*(keys->find("typename"));
								}
								modeltrace =new ModelAddTrace(_src,_refname,_previouspath,_typename);
								traces.push_back(modeltrace);					
							break;
							
							case REMOVE:
							
								if(keys->find("src") != 0){
									_src =*(keys->find("src"));
								}
								if(keys->find("refname") != 0){
									_refname =*(keys->find("refname"));
								}		
								if(keys->find("objpath") != 0){
									_objpath =*(keys->find("objpath"));
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
    delete keys;
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
