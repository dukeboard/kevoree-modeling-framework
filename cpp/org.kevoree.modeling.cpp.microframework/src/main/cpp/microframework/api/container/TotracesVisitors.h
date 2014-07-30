#ifndef __ToTracesVisitors_H
#define __ToTracesVisitors_H

#include <list>
#include <microframework/api/trace/ModelTrace.h>


class ToTracesattVisitorFill :public ModelAttributeVisitor
{

public:
	ToTracesattVisitorFill (std::string _path,list<ModelTrace*> *_traces)
	{
		traces = _traces;
		path = _path;
	}

	void  visit(any val,string name,KMFContainer *parent)
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
			LOGGER_WRITE(Logger::ERROR,"The KMFContainerImpl::ToTracesattVisitorFill the type is not supported of "+name+" his parent his "+parent->path());
		}
		ModelSetTrace *modelsettraces = new ModelSetTrace(path,name,"",attVal2,"");
		traces->push_back(modelsettraces);

	}
	list<ModelTrace*> *traces;
	std::string path;
};

class ToTracesrefVisitorFill :public ModelVisitor
{
public:
	ToTracesrefVisitorFill (std::string _path,list<ModelTrace*> *_traces)
	{
		traces = _traces;
		path = _path;
	}

	void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent)
	{
		ModelAddTrace *modelsettraces = new ModelAddTrace(path,refNameInParent,elem->path(),"");	
		traces->push_back(modelsettraces);
	}
private:
	list<ModelTrace*> *traces;
	std::string path;
};


#endif
