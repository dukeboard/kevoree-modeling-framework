#ifndef KMFContainerVisitors_IMPL_H
#define KMFContainerVisitors_IMPL_H


#include <microframework/api/KMFContainer.h>
#include <string>
#include <map>
/**
 * Author: jedartois@gmail.com
 * Date: 31/11/13
 * Time: 9:14
 */

class VisitorFiller:public ModelAttributeVisitor
{

public:
	VisitorFiller (std::map<string,string> *_objectsMap)
	{
		objectsMap = _objectsMap;
	}

	void  visit(any val,string name,KMFContainer *parent)
	{
		std::string data;
		if (!val.empty () && val.type () == typeid (string) )
		{
			data =AnyCast < string>(val);
			if(!data.empty()){
				(*objectsMap)[name] = data;
			}

		}else  if(!val.empty () && val.type () == typeid (int))
		{
			data =AnyCast < int>(val);;
			(*objectsMap)[name] =  data;

		}else  if(!val.empty () && val.type () == typeid (short))
		{
			data =AnyCast <short>(val);;
			(*objectsMap)[name] =  data;

		} else  if(!val.empty () && val.type () == typeid (bool))
		{

			if(AnyCast<bool>(val) == true)
			{
				data ="true";
			} else
			{
				data  ="false";
			}
			(*objectsMap)[name] =  data;
		}
		else{
			LOGGER_WRITE(Logger::ERROR,"The KMFContainerVisitors::VisitorFiller the type is not supported of "+name+" his parent his "+parent->path());
		}

	}
	std::map<string,string> *objectsMap;
};

class VisitorFillRef:public ModelVisitor
{
public:
	VisitorFillRef (std::map<string,string> *_objectsMap)
	{
		objectsMap = _objectsMap;
	}

	void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent)
	{
		if(elem != NULL)
		{
			std::string concatedKey = refNameInParent +"_"+elem->path() ;
			(*objectsMap)[concatedKey] = "";
		}else 
		{
			LOGGER_WRITE(Logger::ERROR,"The ref visitor vist a null element "+refNameInParent);
		}

	}
	std::map<string,string> *objectsMap;
};



class VisitorRef:public ModelVisitor
{
public:
	VisitorRef (std::map<string,string> *_objectsMap,list <ModelTrace*> *_traces,string _path,bool _isInter)
	{
		values = _objectsMap;
		isInter =_isInter;
		traces = _traces;
		path = _path;
	}

	void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent)
	{
		if(elem != NULL){
			LOGGER_WRITE(Logger::DEBUG_MODEL,"BEGIN -- VisitorRef");
			string concatedKey = refNameInParent +"_"+elem->path();
			if((*values).find(concatedKey) !=  (*values).end())
			{
				if(isInter)
				{
					ModelAddTrace *modeltrace = new ModelAddTrace(path,refNameInParent,elem->path(),"");
					traces->push_back(modeltrace);
				}
				values->erase(values->find(concatedKey));
			}
			else
			{
				if(!isInter)
				{
					ModelAddTrace *modeltrace = new ModelAddTrace(path,refNameInParent,elem->path(),"");
					traces->push_back(modeltrace);
				}
			}
			LOGGER_WRITE(Logger::DEBUG_MODEL,"END -- VisitorRef");
		}else {
			LOGGER_WRITE(Logger::ERROR,"The ref visitor vist a null element "+refNameInParent);	
		}
	}
private:
	std::map<string,string> *values;
	bool isInter;
	list <ModelTrace*> *traces;
	string path;
};




class VisitorAtt : public ModelAttributeVisitor
{

public:
	VisitorAtt (std::map<string,string> *_values,list < ModelTrace * > *_traces,string _path,bool _isInter);
	~VisitorAtt();
	void  visit(any val,string name,KMFContainer *parent);


	list < ModelTrace * > *traces;
	std::map<string,string> *values;
	string path;
	bool isInter;
};

class CacheVisitorCleaner :public ModelVisitor
{
public:
	void visit (KMFContainer * elem, string refNameInParent,KMFContainer * parent)
	{
		if(elem !=NULL){
			elem->clean_path_cache();
		}
	}
};


#endif
