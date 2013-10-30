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
            if (!val.empty () && val.type () == typeid (string) )
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

class VisitorFillRef:public ModelVisitor
{
  public:
    VisitorFillRef (google::dense_hash_map<string,string> *_objectsMap)
    {
	    objectsMap = _objectsMap;
    }

    void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent)
    {
        string concatedKey = refNameInParent +"_"+elem->path() ;
        (*objectsMap)[concatedKey] = "";

    }
    google::dense_hash_map<string,string> *objectsMap;
};



class VisitorRef:public ModelVisitor
{
  public:
    VisitorRef (google::dense_hash_map<string,string> *_objectsMap,list <ModelTrace*> *_traces,string _path,bool _isInter)
    {
	    values = _objectsMap;
	    isInter =_isInter;
	    traces = _traces;
	    path = _path;
    }

    void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent)
    {
        string concatedKey = refNameInParent +"_"+elem->path();

       if((*values).find(concatedKey) !=     (*values).end()){
           if(isInter)
           {
                ModelAddTrace *modeltrace = new ModelAddTrace(path,refNameInParent,elem->path(),"");
                traces->push_back(modeltrace);
           }

       }  else
       {
                if(!isInter)
                {
                         ModelAddTrace *modeltrace = new ModelAddTrace(path,refNameInParent,elem->path(),"");
                       traces->push_back(modeltrace);
                }

       }

     values->erase(concatedKey);

    }
private:
    google::dense_hash_map<string,string> *values;
    bool isInter;
    list <ModelTrace*> *traces;
    string path;
};




class VisitorAtt : public ModelAttributeVisitor
{

  public:
    VisitorAtt (google::dense_hash_map<string,string> *_values,list < ModelTrace * > *_traces,string _path,bool _isInter)
    {
	    traces = _traces;
	     values = _values;
	     path =_path;
	     isInter = _isInter;
    }

    void  visit(any val,string name,KMFContainer *parent)
    {

	      string attVal2 ;
	      if(!val.empty())
	      {
	       attVal2  =AnyCast<string>(val);
	      }

        string data = (*values)[name];
	      if(data.compare(attVal2) == true)
	      {
	            if(isInter)
	            {
                    ModelSetTrace *settrace = new ModelSetTrace(path,name,"",attVal2,"");
                    traces->push_back(settrace);

                }

	      } else {
	              if(!isInter)
            	            {
                                ModelSetTrace *settrace = new ModelSetTrace(path,name,"",attVal2,"");
                                traces->push_back(settrace);

                            }

	      }
	           values->erase(name);

    }
private:
  list < ModelTrace * > *traces;
   google::dense_hash_map<string,string> *values;
   string path;
   bool isInter;
};

class CacheVisitorCleaner :public ModelVisitor
{
  public:
    void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent)
    {
       elem->clean_path_cache();
       cout << "CacheVisitorCleaner " << endl;
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

  string getRefInParent()
  {
          return internal_containmentRefName;
  }

  void  internal_visit(ModelVisitor *visitor,KMFContainer *internalElem,bool recursive,bool containedReference,bool nonContainedReference,string refName)
  {
     //cout << "internal_visit path = "<< internalElem->path() << endl;
      if(internalElem)
      {
             if(nonContainedReference && recursive)
             {
                   string elemPath = internalElem->path();

                   	if(visitor->alreadyVisited.find(elemPath) != visitor->alreadyVisited.end()){

                   	           return;
                   	}
                     visitor->alreadyVisited[elemPath] =internalElem;
             }
             visitor->visit(internalElem,refName,this);
             if(!visitor->visitStopped)
             {
                 if(recursive && visitor->visitChildren){
                      internalElem->visit(visitor,recursive,containedReference,nonContainedReference) ;
                  }
                  visitor->visitChildren = true;
             }
    }
  }

  void setEContainer(KMFContainer *container,RemoveFromContainerCommand *unsetCmd,string refNameInParent){

     if(!internal_readOnlyElem)
     {

        RemoveFromContainerCommand *tempUnsetCmd = internal_unsetCmd;
        internal_unsetCmd = NULL;
        if(tempUnsetCmd != NULL)
        {
            tempUnsetCmd->run();
        }
        internal_eContainer = container;
        internal_unsetCmd = unsetCmd;
        internal_containmentRefName = refNameInParent;
        path_cache = "";
        CacheVisitorCleaner *cleanCacheVisitor = new CacheVisitorCleaner();
        visit(cleanCacheVisitor,true,true,false);
     }
  }

   string path()
   {
        if(!path_cache.empty())
        {
              return path_cache;
        }
        KMFContainer *container = eContainer();
        if(container != NULL) {
            string parentPath = container->path();
            if(parentPath == "")
             {
                 path_cache = "";
             }else
             {
                parentPath += "/";
             }
             path_cache = parentPath + internal_containmentRefName + "[" + internalGetKey() + "]";
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
          //  cout << "findByID -> " << relationName << " " << queryID  << endl;
            KMFContainer *objFound = findByID(relationName,queryID) ;
            if(!subquery.empty() && objFound != NULL)
            {
                 return objFound->findByPath(subquery);
            } else
            {
                 return objFound;
            }
        }
            // TODO FIX ME PUT AWAY
vector<string> split(string str, string delim)
{
      unsigned start = 0;
      unsigned end;
      vector<string> v;

      while( (end = str.find(delim, start)) != string::npos )
      {
            v.push_back(str.substr(start, end-start));
            start = end + delim.length();
      }
      v.push_back(str.substr(start));
      return v;
}

       list<ModelTrace*>* createTraces(KMFContainer *similarObj ,bool isInter ,bool isMerge ,bool onlyReferences,bool onlyAttributes )
       {

             list <ModelTrace*> *traces= new   list <ModelTrace *>;

             google::dense_hash_map<string,string> *values = new google::dense_hash_map<string,string>;
             values->set_empty_key("");

             if(onlyAttributes)
             {
                    VisitorFiller *attVisitorFill= new VisitorFiller (values);
                    visitAttributes(attVisitorFill);

                    VisitorAtt  *attVisitor= new VisitorAtt(values,traces,path(),isInter);
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

                if(onlyReferences)
                {
                    string payload ="";
                    VisitorFillRef *refVisitorFill = new VisitorFillRef(values);         // TODO FIXE ME ? payload
                    visit(refVisitorFill,false,false,true);

                    VisitorRef *refvisitor = new VisitorRef(values,traces,path(),isInter);
                    if(similarObj)
                    {
                       similarObj->visit(refvisitor,false,false,true);

                    }

                    if(!isInter && !isMerge && (values->size() != 0))
                    {

                    for ( google::dense_hash_map<string,string>::const_iterator it = (*values).begin();  it != (*values).end(); ++it)
                    {
                        string hashLoopRes =  it->second;

                        vector<string> result =   split(hashLoopRes,"_");
                        ModelRemoveTrace *removetrace = new ModelRemoveTrace(path(),result.at(0),result.at(1));
                        traces->push_back(removetrace);
                    }

                    }



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