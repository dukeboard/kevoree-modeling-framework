#ifndef KMFContainer_IMPL_H
#define KMFContainer_IMPL_H

#include <KMFContainer.h>
#include <container/RemoveFromContainerCommand.h>

using std::string;
using std::list;

/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

class VisitorFiller:public ModelAttributeVisitor
{

  public:
    VisitorFiller (google::dense_hash_map<string,string> *_objectsMap)
    {
	objectsMap = _objectsMap;
    }

    void  visit(any val,string name,KMFContainer *parent)
    {
    	    string data;
            if (!val.empty () && val.type () == typeid (KMFContainer *) )
    		{
    		    data =AnyCast < string>(val);
    		    (*objectsMap)[name] = data;
    		}else
    	    {
    		    cout << "AnyCast KMFContainer " << endl;
    		}


    }
    google::dense_hash_map<string,string> *objectsMap;
};


class VisitorAtt : public ModelAttributeVisitor
{

  public:
    VisitorAtt (list < ModelTrace * > *_traces)
    {
	    traces = _traces;
    }

    void  visit(any val,string name,KMFContainer *parent)
    {
	    cout << "TODO" << endl;    /*
	          var attVal2 : String?
                                if(value != null){
                                    attVal2 = value.toString()
                                } else {
                                    attVal2 = null
                                }
                                if(values.get(name) == attVal2){
                                    if(isInter) {
                                        traces.add(org.kevoree.modeling.api.trace.ModelSetTrace(path()!!,name,null,attVal2,null))
                                    }
                                } else {
                                    if(!isInter) {
                                        traces.add(org.kevoree.modeling.api.trace.ModelSetTrace(path()!!,name,null,attVal2,null))
                                    }
                                }
                                values.remove(name)*/
    }
private:
  list < ModelTrace * > *traces;
};

class CacheVisitorCleaner :public ModelVisitor
{

  public:
    CacheVisitorCleaner ()
    {

    }

    void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent)
    {
       elem->clean_path_cache();
       cout << "visiting" << endl;
    }

};

class KMFContainerImpl : public KMFContainer
{

public:


KMFContainerImpl(){
    internal_readOnlyElem = false;
    internal_recursive_readOnlyElem=false;
}

  KMFContainer* eContainer()
  {
         return internal_eContainer;
  }

  template <class A>
  A* findByPath(string query,A clazz)
  {
    KMFContainer* result= findByPath(query);
    if(result !=NULL){
        if(typeid(*result) == typeid(clazz)){
            return result;
        }                 else {
        return NULL;
        }
    }               else {
    return NULL;
    }
  }

//    internal_visit(visitor,current,recursive,"interventions");
  void  internal_visit(ModelVisitor visitor,KMFContainer *internalElem,bool recursive,bool containedReference,bool nonContainedReference,string refName){
      if(internalElem)
      {
             if(nonContainedReference && recursive)
             {
                   string elemPath = internalElem->path();
                   //   if(visitor.alreadyVisited != null && visitor.alreadyVisited!!.containsKey(elemPath)){return}

             }

             visitor.visit(internalElem,refName,this);
    }

  }
  /*
      fun internal_visit(visitor : org.kevoree.modeling.api.util.ModelVisitor,internalElem : org.kevoree.modeling.api.KMFContainer?,recursive:Boolean,containedReference : Boolean,nonContainedReference : Boolean, refName : String){
          if(internalElem != null){
              if(nonContainedReference && recursive){
                  var elemPath = internalElem.path()!!
                  if(visitor.alreadyVisited != null && visitor.alreadyVisited!!.containsKey(elemPath)){return}
                  if(visitor.alreadyVisited == null){
                      visitor.alreadyVisited = java.util.HashMap<String,org.kevoree.modeling.api.KMFContainer>()
                  }
                  visitor.alreadyVisited!!.put(elemPath,internalElem)
              }
              visitor.visit(internalElem,refName,this)
              if(!visitor.visitStopped){
                  if(recursive && visitor.visitChildren){
                      internalElem.visit(visitor,recursive,containedReference,nonContainedReference)
                  }
                  visitor.visitChildren = true
              }
          }
      }
           */

  void setEContainer(KMFContainer *container,RemoveFromContainerCommand *unsetCmd,string refNameInParent){

     if(!internal_readOnlyElem)
     {
        RemoveFromContainerCommand *tempUnsetCmd = internal_unsetCmd;
        internal_unsetCmd = NULL;
        if(tempUnsetCmd != NULL){
            tempUnsetCmd->run();
        }
        internal_eContainer = container;
        internal_unsetCmd = unsetCmd;
        internal_containmentRefName = refNameInParent;
        path_cache = "";
        CacheVisitorCleaner cleanCacheVisitor;
        visit(cleanCacheVisitor,true,true,false) ;
     }
  }

   string path() {
        if(!path_cache.empty())
        {
              return path_cache;
        }
        KMFContainer *container = eContainer();
        if(container != NULL) {
            string parentPath = container->path();
            if(parentPath.empty()){
                return "";
            } else
            {
                if(parentPath == "")
                {
                    path_cache = "";
                }else{
                parentPath += "/";
                }
                parentPath += internal_containmentRefName + "[" + internalGetKey() + "]";
            }
        } else
        {
            path_cache =  "";
        }
        return path_cache;
    }



    KMFContainer* findByPath(string query)
    {
            int firstSepIndex = query.find('[',0);
            if(firstSepIndex == -1)
            {
                if(query.empty())
                {
                  return this;
                }
                else
                {
                  return NULL;
                }
            }
            string queryID = "";
            int extraReadChar = 2;
            string relationName = query.substr(0,query.find('[',0)) ;
            if(query.find('{',0) == firstSepIndex + 1)
            {
                queryID = query.substr(query.find('{',0) + 1, query.find('}',0));
                extraReadChar = extraReadChar + 2 ;
            } else
            {
                int indexFirstClose = query.find(']',0);

                while( indexFirstClose + 1 < query.size() && query.at(indexFirstClose + 1) != '/')
                {
                    indexFirstClose = query.find(']',indexFirstClose + 1);
                }

                int id_size =   indexFirstClose - query.find('[',0)-1;
                queryID = query.substr(query.find('[',0) + 1, id_size);
            }
            int v =    (relationName.size() + queryID.size() + extraReadChar);
            int size = query.size() -v;


            string subquery = query.substr(relationName.size() + queryID.size() + extraReadChar, size);

            if (subquery.find('/',0) != -1)
            {
                subquery = subquery.substr(subquery.find('/',0) + 1, subquery.size()-subquery.find('/',0));
            }
            cout << "findByID -> " << relationName << " " << queryID  << endl;
            KMFContainer *objFound = findByID(relationName,queryID) ;
            if(!subquery.empty() && objFound != NULL)
            {
                 return objFound->findByPath(subquery);
            } else
            {
                 return objFound;
            }
        }

       list<ModelTrace*>* createTraces(KMFContainer *similarObj ,bool isInter ,bool isMerge ,bool onlyReferences,bool onlyAttributes ) {
             list < ModelTrace * > *traces= new   list < ModelTrace * >;

             google::dense_hash_map<string,string> *values = new google::dense_hash_map<string,string>;

             if(onlyAttributes)
             {
                    VisitorFiller attVisitorFill (values);
                    visitAttributes(attVisitorFill);
                    VisitorAtt  attVisitor(traces);
                    if(similarObj!=NULL)
                    {
                       similarObj->visitAttributes(attVisitor);
                    }
                    if(!isInter && !isMerge && values->size() != 0){

                      for ( google::dense_hash_map<string,string>::const_iterator it = (*values).begin();  it != (*values).end(); ++it) {

                            string  hashLoopRes= it->second;
                             ModelSetTrace *modelsettrace = new ModelSetTrace(path(),hashLoopRes,"","","");
                             traces->push_back(modelsettrace);
                      }

                    }
             }

                if(onlyReferences){
                cout << "TODO "<< endl;
                        /*       val payload = "";
                                      val refVisitorFill = object : org.kevoree.modeling.api.util.ModelVisitor() {
                                          public override fun visit(elem: org.kevoree.modeling.api.KMFContainer, refNameInParent: String, parent: org.kevoree.modeling.api.KMFContainer) {
                                              val concatedKey = refNameInParent+"_"+elem.path()
                                              values.put(concatedKey,payload)
                                          }
                                      }
                                      this.visit(refVisitorFill,false,false,true)
                                      val refVisitor = object : org.kevoree.modeling.api.util.ModelVisitor() {
                                          public override fun visit(elem: org.kevoree.modeling.api.KMFContainer, refNameInParent: String, parent: org.kevoree.modeling.api.KMFContainer) {
                                              val concatedKey = refNameInParent+"_"+elem.path()
                                              if(values.get(concatedKey) != null){
                                                  if(isInter){
                                                      traces.add(org.kevoree.modeling.api.trace.ModelAddTrace(path()!!,refNameInParent,elem.path()!!,null))
                                                  }
                                              } else {
                                                 if(!isInter){
                                                      traces.add(org.kevoree.modeling.api.trace.ModelAddTrace(path()!!,refNameInParent,elem.path()!!,null))
                                                 }
                                              }
                                              values.remove(concatedKey)
                                          }
                                      }
                                      if(similarObj!=null){similarObj.visit(refVisitor,false,false,true)}
                                      if(!isInter && !isMerge && values.size!= 0){
                                          for(hashLoopRes in values.keySet()){
                                              val splittedVal = hashLoopRes.split("_");
                                              traces.add(org.kevoree.modeling.api.trace.ModelRemoveTrace(path()!!,splittedVal.get(0),splittedVal.get(1)))
                                          }
                                      }*/
                }

          return traces;
       }





void clean_path_cache(){
 path_cache = "";
}


protected :
RemoveFromContainerCommand *internal_unsetCmd;
KMFContainer *internal_eContainer;
std::string internal_containmentRefName;
bool internal_readOnlyElem;
bool internal_recursive_readOnlyElem;
list<ModelElementListener> internal_modelElementListeners;
list<ModelElementListener> internal_modelTreeListeners;
std::string path_cache;


};

#endif