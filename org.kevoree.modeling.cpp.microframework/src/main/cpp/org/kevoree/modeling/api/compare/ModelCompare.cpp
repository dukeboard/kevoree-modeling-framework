#include "ModelCompare.h"
#include "../utils/ModelVisitor.h"





class ModelCompareVisitor : public ModelVisitor
{
	
public:
ModelCompareVisitor( Hashmap<any> *_objectsMap )
{
	objectsMap =_objectsMap;
}	

 void visit(KMFContainer *elem,string refNameInParent, KMFContainer* parent){
      string childPath = elem->path();
      if(!childPath.empty()){
                 objectsMap->insert(childPath, elem);
       } else {
           throw "Null child path ";
       }

 }
  Hashmap<any> *objectsMap;
};


class ModelCompareVisitor2 : public ModelVisitor
{
	
public:
ModelCompareVisitor2( Hashmap<any> *_objectsMap,bool _inter,list<ModelTrace*> _traces )
{
	objectsMap =_objectsMap;
	inter =_inter;
	traces = _traces;
}	

 void visit(KMFContainer *elem,string refNameInParent, KMFContainer* parent){
      string childPath = elem->path();
      if(!childPath.empty()){

                    if(objectsMap->find(childPath) != 0){
                        if(inter)
                        {
						   ModelAddTrace *modeladdtrace  = new 	ModelAddTrace(parent->path(), refNameInParent, elem->path(), elem->metaClassName());
                           traces.push_back(modeladdtrace);
                        }
                 objectsMap->find(childPath);
                 
                 //.createTraces(elem, inter,merge, false,true);
                      //    std::copy(addtraces.begin(), addtraces.end(), std::back_insert_iterator<std::list<ModelTrace*> >(traces))
                     //   traces.addAll()
                       // tracesRef.addAll(objectsMap.get(childPath)!!.createTraces(elem, inter,merge, true,false))
                        //objectsMap.remove(childPath) //drop from to process elements
                    } else {
                        if(!inter){
                          //  traces.add(ModelAddTrace(parent.path()!!, refNameInParent, elem.path(), elem.metaClassName()))
                           // traces.addAll(elem.createTraces(elem, true,merge, false,true))
                            //tracesRef.addAll(elem.createTraces(elem, true,merge, true,false))
                        }
                    }
       } else {
           throw "Null child path ";
       }

 }
  Hashmap<any> *objectsMap;
  list<ModelTrace*> traces;
  bool inter;
};





TraceSequence* ModelCompare::createSequence(){
		return new TraceSequence();
}

TraceSequence* ModelCompare::diff(KMFContainer origin,KMFContainer target){
  return createSequence()->populate(internal_diff(origin, target, false, false));	
}


TraceSequence* ModelCompare::merge(KMFContainer origin,KMFContainer target){
	 return createSequence()->populate(internal_diff(origin, target, false, false));	
}


TraceSequence* ModelCompare::inter(KMFContainer origin,KMFContainer target)
{
	  return createSequence()->populate(internal_diff(origin, target, false, false));	
}


std::list<ModelTrace*> ModelCompare::internal_diff(KMFContainer origin,KMFContainer target,bool inter,bool merge){
	
		list<ModelTrace*> traces ;
	    list<ModelTrace*> tracesRef ;
	    
	     Hashmap<any> *objectsMap =  new Hashmap<any>;
	     
	     traces = origin.createTraces(target, inter,merge, false,true);
	     tracesRef = origin.createTraces(target, inter,merge, true,false);
	     
	     ModelCompareVisitor visitor(objectsMap);
	    origin.visit(visitor, true, true, false);


}









