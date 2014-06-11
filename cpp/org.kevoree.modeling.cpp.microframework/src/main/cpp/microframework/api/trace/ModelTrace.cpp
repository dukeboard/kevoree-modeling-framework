#include <microframework/api/trace/ModelTrace.h>

/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
ModelSetTrace::ModelSetTrace (string _srcPath, string _refName, string _objPath, string _content, string _typeName)
{
	srcPath = _srcPath;
	refName = _refName;
	typeName = _typeName;
	content = _content;
	typeName = _typeName;
}


ModelSetTrace::~ModelSetTrace(){

}
std::string ModelSetTrace::toString ()
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
	buffer.append ("}\n");

	return buffer;

}  


ModelAddTrace::~ModelAddTrace(){

}
ModelAddTrace::ModelAddTrace(string _srcPath, string _refName, string _previousPath,string _typeName)
{
	srcPath  =_srcPath;
	refName=_refName;
	previousPath =_previousPath;
	typeName=_typeName;
}

std::string ModelAddTrace::toString ()
{
	string buffer = "";

	buffer.append ("{ \"traceType\" : " + ActionType (ADD) +
			" , \"src\" : \"" + srcPath + "\", \"refname\" : \"" +
			refName + "\"");
	if (!previousPath.empty ())
	{
		buffer.append (", \"previouspath\" : \"" + previousPath + "\"");
	}
	if (!typeName.empty ())
	{
		buffer.append (", \"typename\" : \"" + typeName + "\"");
	}
	buffer.append ("}\n");
	return buffer;
}


ModelAddAllTrace::~ModelAddAllTrace(){

}

ModelAddAllTrace::ModelAddAllTrace (string _srcPath, string _refName,list < string > &_previousPath, list < string > &_typeName)
{
	srcPath = _srcPath;
	refName = _refName;
	previousPath = _previousPath;
	typeName = _typeName;

}

std::string ModelAddAllTrace::toString ()
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
	buffer.append ("}\n");
	return buffer;
}

std::string ModelAddAllTrace::mkString (list < string > ss){

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


ModelRemoveTrace::ModelRemoveTrace (string _srcPath, string _refName, string _objPath)
{
	srcPath = _srcPath;
	refName = _refName;
	objPath = _objPath;
}


ModelRemoveTrace::~ModelRemoveTrace(){

}
std::string ModelRemoveTrace::toString ()
{
	return "{ \"traceType\" : " + ActionType (REMOVE) + " , \"src\" : \"" + srcPath + "\", \"refname\" : \"" + refName + "\", \"objpath\" : \"" + objPath + "\" }\n";
}

ModelRemoveAllTrace::~ModelRemoveAllTrace(){

}


ModelRemoveAllTrace::ModelRemoveAllTrace (string _srcPath, string _refName)
{
	srcPath = _srcPath;
	refName = _refName;
}


std::string ModelRemoveAllTrace::toString ()
{
	return "{ \"traceType\" : " + ActionType (REMOVE_ALL) + " , \"src\" : \"" + srcPath + "\", \"refname\" : \"" + refName + "\" }\n";
}
