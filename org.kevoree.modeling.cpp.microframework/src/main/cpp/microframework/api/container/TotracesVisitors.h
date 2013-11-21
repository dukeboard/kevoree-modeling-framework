#ifndef __ToTracesVisitors_H
#define __ToTracesVisitors_H

#include <list>
#include <microframework/api/trace/ModelTrace.h>

/*
  val attVisitorFill = object : org.kevoree.modeling.api.util.ModelAttributeVisitor {
                       public override fun visit(value: Any?, name: String, parent: org.kevoree.modeling.api.KMFContainer){
                           traces.add(org.kevoree.modeling.api.trace.ModelSetTrace(path()!!,name,null,org.kevoree.modeling.api.util.AttConverter.convFlatAtt(value),null))
                       }
                   }
                   */

class VisitoTotracesrFiller:public ModelAttributeVisitor
{

  public:
    VisitoTotracesrFiller (std::list<ModelTrace*> *_traces,std::string _path)
    {
       this->traces = _traces;
       this->path = _path;
    }

    void  visit(any val,string name,KMFContainer *parent)
    {
    /*
        ModelSetTrace *modelsettraces = new ModelSetTrace(path,name,NULL,)
        traces->insert()    */

    }
 private:
 list<ModelTrace*> *traces;
 std::string path;
};



#endif