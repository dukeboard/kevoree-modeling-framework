#ifndef MODEL_TRACE_H
#define MODEL_TRACE_H
#include <string>
#include <list>
#include "../utils/ActionType.h"

using namespace std;

class ModelTrace
{
  public:	
	virtual string toString () {};

};


class ModelAddTrace : public ModelTrace
{
	
public:
  ModelAddTrace(string _srcPath, string _refName, string _previousPath,string _typeName){
  }
  string srcPath;
  string refName;
  string previousPath;
  string typeName;
  
  virtual std::string toString ()
  {
    string buffer = "";

    buffer.append ("{ \"traceType\" : " + ActionType (ADD) +
		   " , \"src\" : \"" + srcPath + "\", \"refname\" : \"" +
		   refName + "\"");
    if (!previousPath.empty ())
      {
	buffer.append (", \"previouspath\" : \"" + previousPath + "\"");
      }
    if (typeName.empty ())
      {
	buffer.append (", \"typename\" : \"" + typeName + "\"");
      }
    buffer.append ("}");
    return buffer;
  }


};



class ModelAddAllTrace:public ModelTrace
{
  ModelAddAllTrace (string _srcPath, string _refName,
		    list < string > _previousPath, list < string > _typeName)
  {
    srcPath = _srcPath;
    refName = _refName;
    previousPath = _previousPath;
    typeName = _typeName;
  }

  std::string mkString (list < string > ss)
  {
    string buffer;
    if (!ss.empty ())
      {
	return buffer;
      }
    std::list < std::string >::iterator it;
    bool isFirst = true;
    for (it = ss.begin (); it != ss.end (); ++it)
      {
	if (!isFirst)
	  {
	    buffer.append (",");
	  }
	buffer.append (*it);
	isFirst = false;
      }
    return buffer;
  }
  std::string toString ()
  {
    string buffer;
    buffer.append ("{ \"traceType\" : " + ActionType (ADD_ALL) +
		   " , \"src\" : \"" + srcPath + "\", \"refname\" : \"" +
		   refName + "\"");
    if (!previousPath.empty ())
      {
	buffer.append (", \"previouspath\" : \"" + mkString (previousPath) +
		       "\"");
      }
    if (typeName.empty ())
      {
	buffer.append (", \"typename\" : \"" + mkString (typeName) + "\"");
      }
    buffer.append ("}");
    return buffer;
  }
  
  string srcPath;
  string refName;
  list < string > previousPath;
  list < string > typeName;
};




class ModelRemoveTrace:public ModelTrace
{
  ModelRemoveTrace (string _srcPath, string _refName, string _objPath)
  {
    srcPath = _srcPath;
    refName = _refName;
    objPath = _objPath;
  }
  virtual std::string toString ()
  {
    return "{ \"traceType\" : " + ActionType (REMOVE) + " , \"src\" : \"" +
      srcPath + "\", \"refname\" : \"" + refName + "\", \"objpath\" : \"" +
      objPath + "\" }";
  }
private:
  string srcPath;
  string refName;
  string objPath;
};



class ModelRemoveAllTrace:public ModelTrace
{
  ModelRemoveAllTrace (string _srcPath, string _refName)
  {
    srcPath = _srcPath;
    refName = _refName;
  }
  virtual std::string toString ()
  {
    return "{ \"traceType\" : " + ActionType (REMOVE_ALL) +
      " , \"src\" : \"" + srcPath + "\", \"refname\" : \"" + refName + "\" }";
  }
  
  string srcPath;
  string refName;
};


class ModelSetTrace:public ModelTrace
{
public:
  string srcPath;
  string refName;
  string objPath;
  string content;
  string typeName;
 
  ModelSetTrace (string _srcPath, string _refName, string _objPath, string _content, string _typeName)
  {
    srcPath = _srcPath;
    refName = _refName;
    typeName = _typeName;
    content = _content;
    typeName = _typeName;
  }
  virtual std::string toString ()
  {
    string buffer = "";
    buffer.append ("{ \"traceType\" : " + ActionType (SET) +
		   " , \"src\" : \"" + srcPath + "\", \"refname\" : \"" +
		   refName + "\"");
    if (!objPath.empty ())
      {
	buffer.append (", \"objpath\" : \"" + objPath + "\"");
      }
    if (!content.empty ())
      {
	buffer.append (", \"content\" : \"" + content + "\"");
      }
    if (!typeName.empty ())
      {
	buffer.append (", \"typename\" : \"" + typeName + "\"");
      }
    buffer.append ("}");

    return buffer;

  }

};


#endif
