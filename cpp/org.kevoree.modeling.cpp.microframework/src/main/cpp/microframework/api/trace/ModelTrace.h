#ifndef MODEL_TRACE_H
#define MODEL_TRACE_H
#include <string>
#include <list>
#include <iostream>
#include <microframework/api/utils/ActionType.h>

using std::string;
using std::list;
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
class ModelTrace
{

public:
	virtual ~ModelTrace(){}
	virtual string toString ()
	{
		return "";
	}
	string srcPath;
	string refName;
};

class ModelAddTrace : public ModelTrace
{

public:
	ModelAddTrace(string _srcPath, string _refName, string _previousPath,string _typeName);
	~ModelAddTrace();
	virtual std::string toString ();

	string previousPath;
	string typeName;

};

class ModelSetTrace:public ModelTrace
{
public: 
	ModelSetTrace (string _srcPath, string _refName, string _objPath, string _content, string _typeName);
	~ModelSetTrace();
	virtual std::string toString ();

	string objPath;
	string content;
	string typeName;

};



class ModelAddAllTrace:public ModelTrace
{
public:
	ModelAddAllTrace (string _srcPath, string _refName,list < string > &_previousPath, list < string > &_typeName);
	~ModelAddAllTrace();
	virtual std::string toString ();
	std::string mkString (list < string > ss);
	list < string > previousPath;
	list < string > typeName;
};




class ModelRemoveTrace:public ModelTrace
{
public:
	ModelRemoveTrace (string _srcPath, string _refName, string _objPath);
	~ModelRemoveTrace();
	virtual std::string toString ();
	string objPath;
};



class ModelRemoveAllTrace:public ModelTrace
{
public:
	ModelRemoveAllTrace (string _srcPath, string _refName);
	~ModelRemoveAllTrace();
	virtual std::string toString ();
};





#endif
