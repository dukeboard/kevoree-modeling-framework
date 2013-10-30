#ifndef __ModelVisitor_H
#define __ModelVisitor_H

#include <utils/any.h>
#include <string>
#include <google/dense_hash_map>

using std::string;
class KMFContainer;
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class ModelVisitor
{

  public:
  ModelVisitor();
  void stopVisit();
  void noChildrenVisit();
  virtual void visit(KMFContainer *elem,string refNameInParent, KMFContainer* parent){}
  virtual void beginVisitElem(KMFContainer *elem){}
  virtual void endVisitElem(KMFContainer *elem){}
  virtual void beginVisitRef(string refName,string refType){}
  virtual void endVisitRef(string refName){}

  bool visitStopped; // false
  bool visitChildren; // true
  google::dense_hash_map<string,KMFContainer*> alreadyVisited;
};





#endif
