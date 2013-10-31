#ifndef __ModelCompareVisitors_H
#define __ModelCompareVisitors_H

/**
 * Author: jedartois@gmail.com
 * Date: 31/11/13
 * Time: 9:14
 */
 #include <string>
 #include <KMFContainer.h>

class ModelCompareVisitorFiller:public ModelVisitor
{

  public:
    ModelCompareVisitorFiller (google::dense_hash_map<string,KMFContainer*> *_objectsMap);
    ~ModelCompareVisitorFiller();
 void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent);

private:
    google::dense_hash_map<string,KMFContainer*> *objectsMap;
};


class ModelCompareVisitorCreateTraces:public ModelVisitor
{

  public:
  ModelCompareVisitorCreateTraces (google::dense_hash_map<string,KMFContainer*> *_objectsMap, bool _inter,bool _merge,list<ModelTrace *> *_traces,list<ModelTrace *> *_tracesRef);
  ~ModelCompareVisitorCreateTraces();
  void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent);
private:
    google::dense_hash_map<string,KMFContainer*> *objectsMap;
    list < ModelTrace * > *traces;
    list < ModelTrace * > *tracesRef;
    bool inter;
    bool merge;
};
#endif