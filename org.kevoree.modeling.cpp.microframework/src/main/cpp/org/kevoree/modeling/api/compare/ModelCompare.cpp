#include "ModelCompare.h"
#include "../utils/ModelVisitor.h"
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class ModelCompareVisitor:public ModelVisitor
{

  public:
    ModelCompareVisitor (google::dense_hash_map<string,any> *_objectsMap)
    {
	objectsMap = _objectsMap;
    }

    void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent)
    {
	string childPath = elem->path ();

	if (!childPath.empty ())
	  {
	    (*objectsMap)[childPath] = any (elem);
	  }
	else
	  {
	      throw "Null child path ";
	  }

    }
    google::dense_hash_map<string,any> *objectsMap;
};


class ModelCompareVisitor2:public ModelVisitor
{

  public:
    ModelCompareVisitor2 (google::dense_hash_map<string,any> *_objectsMap, bool _inter,bool _merge,list<ModelTrace *> _traces,list<ModelTrace *>  _tracesRef)
    {
		objectsMap = _objectsMap;
		inter = _inter;
		traces = _traces;
		merge = _merge;
		tracesRef =_tracesRef;
    }

    void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent)
    {
	string childPath = elem->path ();

	if (!childPath.empty ())
	  {

	    if((*objectsMap).find(childPath) !=     (*objectsMap).end())
		{

				if (inter)
		      {
				  ModelAddTrace *modeladdtrace = new ModelAddTrace (parent->path (), refNameInParent,elem->path (), elem->metaClassName ());
				  traces.push_back (modeladdtrace);
				}

		    any val = (*objectsMap)[childPath];
		    KMFContainer *ptr_elem;

			  if (!val.empty () && val.type () == typeid (KMFContainer *) )
		      {
				 ptr_elem =AnyCast < KMFContainer * >(val);
		      }else 
		      {
				  	      throw "AnyCast KMFContainer *";
			  }
				
				 // traces attributes
				  list<ModelTrace*> result_atttributes = ptr_elem->createTraces (*elem, inter, merge,false, true);
				 std::copy(result_atttributes.begin(), result_atttributes.end(), std::back_insert_iterator<std::list<ModelTrace*> >(traces));
				 // traces references
				 list<ModelTrace*> result_references = ptr_elem->createTraces (*elem, inter, merge,true, false);
				 std::copy(result_references.begin(), result_references.end(), std::back_insert_iterator<std::list<ModelTrace*> >(tracesRef));
				 (*objectsMap).erase(childPath); //drop from to process elements

		}
	      else
		{
		    if (!inter)
		      {
				 ModelAddTrace *modeladdtrace = new ModelAddTrace (parent->path (), refNameInParent,elem->path (), elem->metaClassName ());
				  traces.push_back (modeladdtrace);
				  
				  // traces attributes
				 list<ModelTrace*> result_atttributes = elem->createTraces (*elem, true, merge,false, true);
				 std::copy(result_atttributes.begin(), result_atttributes.end(), std::back_insert_iterator<std::list<ModelTrace*> >(traces));
				 // traces references
				 list<ModelTrace*> result_references = elem->createTraces (*elem, true, merge,true, false);
				 std::copy(result_references.begin(), result_references.end(), std::back_insert_iterator<std::list<ModelTrace*> >(tracesRef));
		      }
		}
	  }
	else
	  {
	      throw "Null child path ";
	  }

    }
    google::dense_hash_map<string,any> *objectsMap;
    list < ModelTrace * >traces;
    list < ModelTrace * >tracesRef;
    bool inter;
    bool merge;
};


TraceSequence *ModelCompare::createSequence ()
{
    return new TraceSequence ();
}

TraceSequence *ModelCompare::diff (KMFContainer origin, KMFContainer target)
{
    return	createSequence ()->populate (internal_diff(origin, target, false, false));
}


TraceSequence *ModelCompare::merge (KMFContainer origin, KMFContainer target)
{
    return	createSequence ()->populate(internal_diff(origin, target, false, false));
}


TraceSequence *ModelCompare::inter (KMFContainer origin, KMFContainer target)
{
    return
	createSequence ()->populate (internal_diff(origin, target, false, false));
}


std::list < ModelTrace * >ModelCompare::internal_diff (KMFContainer origin,KMFContainer target,bool inter, bool merge)
{

    list < ModelTrace * >traces;
    list < ModelTrace * >tracesRef;
    google::dense_hash_map<string,any> *objectsMap = new           google::dense_hash_map<string,any>;

    traces = origin.createTraces (target, inter, merge, false, true);
    tracesRef = origin.createTraces (target, inter, merge, true, false);

	// visitors 
    ModelCompareVisitor visitor (objectsMap);
    ModelCompareVisitor2 visitor2(objectsMap,inter,merge,traces,tracesRef);

    origin.visit(visitor, true, true, false);
    target.visit(visitor2, true, true, false);


        if(!inter){
            //if diff
            if(!merge)
            {
                for ( google::dense_hash_map<string,any>::const_iterator it = (*objectsMap).begin();  it != (*objectsMap).end(); ++it) {

                      KMFContainer *diffChild;
                      string src;
                      string refNameInParent;
                      if (!it->second.empty () && it->second.type () == typeid (KMFContainer *) )
                      {
                         diffChild =AnyCast < KMFContainer * >(it->second);
                      }else
                      {
                                  throw "AnyCast KMFContainer *";
                      }


                       src =   diffChild-> eContainer().path();                        //  TODO FIX IF NULL
                       refNameInParent = diffChild-> getRefInParent();             //  TODO FIX IF NULL

                       ModelRemoveTrace *modelremovetrace= new ModelRemoveTrace(src,refNameInParent,diffChild->path());

                       traces.push_back(modelremovetrace);

                }
            }
        }
return traces;
}
