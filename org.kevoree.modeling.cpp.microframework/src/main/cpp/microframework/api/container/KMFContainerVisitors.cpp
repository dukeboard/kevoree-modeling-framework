#include <microframework/api/container/KMFContainerVisitors.h>



VisitorAtt::~VisitorAtt(){


}
VisitorAtt::VisitorAtt (std::unordered_map<string,string> *_values,list < ModelTrace * > *_traces,string _path,bool _isInter)
{
	    traces = _traces;
	     values = _values;
	     path =_path;
	     isInter = _isInter;
}


void  VisitorAtt::visit(any val,string name,KMFContainer *parent)
{
	      string attVal2 ;
	      if(!val.empty() && val.type() == typeid(string))
	      {
	       attVal2  =AnyCast<string>(val);
	      } else if(!val.empty() && val.type() == typeid(int)){
	       attVal2  =AnyCast<int>(val);
	      }else if(!val.empty() && val.type() == typeid(short)){
	             attVal2  =AnyCast<short>(val);
	      }else if(!val.empty () && val.type () == typeid (bool)){
              if(AnyCast<bool>(val) == true)
              {
                       attVal2 ="true";
              } else {
                      attVal2  ="false";
              }
	      }else
	      {
	        PRINTF_ERROR("VisitorAtt AnyCast no managed") ;
	      }

          string data = (*values)[name];

	      if(data.compare(attVal2) == 0)
	      {

	            if(isInter)
	            {
                    ModelSetTrace *settrace = new ModelSetTrace(path,name,"",attVal2,"");
                    traces->push_back(settrace);

                }

	      } else
	      {
	              if(!isInter)
            	  {
            	                cout << data.compare(attVal2) << "  "  << name << " " << data << " " << attVal2  << endl;
                                ModelSetTrace *settrace = new ModelSetTrace(path,name,"",attVal2,"");
                                traces->push_back(settrace);

                  }

	      }
          if(values->find(name) !=    values->end())
          {
             	//values->set_deleted_key(name);
                values->erase(values->find(name));
                //values->clear_deleted_key();

          }else
          {
           PRINTF_ERROR("WARNING VisitorAtt failed to remove key " << name);
          }


}
