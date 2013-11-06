#include <KMFContainerVisitors.h>



VisitorAtt::~VisitorAtt(){


}
VisitorAtt::VisitorAtt (google::dense_hash_map<string,string> *_values,list < ModelTrace * > *_traces,string _path,bool _isInter)
{
	    traces = _traces;
	     values = _values;
	     path =_path;
	     isInter = _isInter;
}


void  VisitorAtt::visit(any val,string name,KMFContainer *parent)
{
	      string attVal2 ;
	      if(!val.empty())
	      {
	       attVal2  =AnyCast<string>(val);
	      }

          string data = (*values)[name];

	      if(data.compare(attVal2) == 0)
	      {
	           //       cout << data.compare(attVal2) << "  "  << name << " " << data << " " << attVal2  << endl;
	            if(isInter)
	            {
                    ModelSetTrace *settrace = new ModelSetTrace(path,name,"",attVal2,"");
                    traces->push_back(settrace);

                }

	      } else
	      {
	              if(!isInter)
            	            {
                                ModelSetTrace *settrace = new ModelSetTrace(path,name,"",attVal2,"");
                                traces->push_back(settrace);

                            }

	      }
          if(values->find(name) !=    values->end())
          {
             	values->set_deleted_key(name);
                values->erase(values->find(name));
                values->clear_deleted_key();

          }else
          {
           PRINTF_ERROR("WARNING VisitorAtt failed to remove key " << name);
          }


}