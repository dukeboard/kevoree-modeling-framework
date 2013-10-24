#ifndef __ModelVisitor_H
#define __ModelVisitor_H


#include "any.h"
#include <string>
#include <google/dense_hash_map>

using std::string;
class KMFContainer;
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class ModelVisitor {

  public:
  ModelVisitor(){
	  visitStopped = false;
	  visitChildren = true;
  }

  bool visitStopped; // false
  bool visitChildren; // true
  google::dense_hash_map<string,any> alreadyVisited;
  
  
	void stopVisit(){
        visitStopped = true;
    }
    
    void noChildrenVisit(){
        visitChildren = true;
    }
    
	 virtual void visit(KMFContainer *elem,string refNameInParent, KMFContainer* parent){}
     virtual void beginVisitElem(KMFContainer *elem){}
     virtual void endVisitElem(KMFContainer *elem){}
     virtual void beginVisitRef(string refName,string refType){}
     virtual void endVisitRef(string refName){}
};


#endif
