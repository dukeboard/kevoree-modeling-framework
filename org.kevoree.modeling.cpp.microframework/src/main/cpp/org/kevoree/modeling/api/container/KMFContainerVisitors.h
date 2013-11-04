#ifndef KMFContainerVisitors_IMPL_H
#define KMFContainerVisitors_IMPL_H

#include <string>
#include <KMFContainer.h>
/**
 * Author: jedartois@gmail.com
 * Date: 31/11/13
 * Time: 9:14
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
     values->set_deleted_key(concatedKey);
     values->erase(values->find(concatedKey));

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
    VisitorAtt (google::dense_hash_map<string,string> *_values,list < ModelTrace * > *_traces,string _path,bool _isInter);
    ~VisitorAtt();
    void  visit(any val,string name,KMFContainer *parent);


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
       // TODO DELETE MEMORY
     //  cout << "CacheVisitorCleaner " << endl;
    }
};


#endif