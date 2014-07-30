/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

#ifndef __JSONModelSerializer_H
#define __JSONModelSerializer_H

#include <algorithm>
#include <string>
#include <iostream>
#include <sstream>
#include <microframework/api/KMFContainer.h>
#include <microframework/api/KMFFactory.h>
#include <microframework/api/ModelSerializer.h>
#include <microframework/api/utils/any.h>
#include <microframework/api/utils/ActionType.h>
#include <microframework/api/json/Lexer.h>
#include <string>




class SerializerAttributeVisitor:public ModelAttributeVisitor
{
public:
	SerializerAttributeVisitor (std::string *out)
	{
		this->out = out;
	}

	void  visit(any val,string name,KMFContainer *parent)
	{
		if(!val.empty ())
		{
			out->append(",\n\"" + name + "\":\"");
			string data="";
			if (!val.empty () && val.type () == typeid (string) )
			{
				data =AnyCast < string>(val);
			}else  if(!val.empty () && val.type () == typeid (int))
			{
				data =AnyCast < int>(val);;
			}else  if(!val.empty () && val.type () == typeid (short))
			{
				data =AnyCast <short>(val);;
			} else  if(!val.empty () && val.type () == typeid (bool))
			{
				if(AnyCast<bool>(val) == true)
				{
					data ="true";
				} else
				{
					data  ="false";
				}
			}
			else{
				LOGGER_WRITE(Logger::ERROR,"The SerializerAttributeVisitor::visit the type is not supported of "+name+" his parent his "+parent->path());
			}
			out->append(data);
			out->append("\"");
		}
	}
	std::string *out;
};


class ModelReferenceVisitor :public ModelVisitor
{
public:
	ModelReferenceVisitor(std::string *_out)
	{
		isFirst=true;
		this->out = _out;

	}
	void beginVisitRef(string refName,string refType)
	{
		out->append(",\n\"" + refName + "\":[");
		isFirst = true;
	}
	void endVisitRef(string refName)
	{
		out->append("]");
	}
	void visit(KMFContainer *elem,string refNameInParent, KMFContainer* parent)
	{
		if(!isFirst){
			out->append(",\n");
		} else {
			isFirst = false;
		}
		out->append("\"" + elem->path() + "\"");
	}
private:
	bool isFirst;
	std::string *out;
};

class ModelMasterVisitor :public ModelVisitor
{
public:
	ModelMasterVisitor(std::string *_out)
	{
		isFirstInRef=true;
		out = _out;
		internalReferenceVisitor =new ModelReferenceVisitor(_out);
	}

	void printAttName(KMFContainer *elem,string *out)
	{
		out->append("\n{\n\"eClass\":\"org.kevoree." + elem->metaClassName() + "\"");
		SerializerAttributeVisitor *attributeVisitor = new SerializerAttributeVisitor(out);
		elem->visitAttributes(attributeVisitor);
		delete attributeVisitor;

	}
	void beginVisitElem(KMFContainer *elem)
	{
		if(!isFirstInRef)
		{
			out->append(",\n");
			isFirstInRef = false;
		}


		printAttName(elem, out);
		internalReferenceVisitor->alreadyVisited.clear();
		elem->visit(internalReferenceVisitor, false, false, true);
	}
	void endVisitElem(KMFContainer *elem)
	{
		out->append("}\n");
		isFirstInRef = false;
	}

	void beginVisitRef(string refName,string refType)
	{
		out->append(",\n\"" + refName + "\":[");
		isFirstInRef = true;
	}

	void endVisitRef(string refName)
	{
		out->append("]");
		isFirstInRef = false;
	}

	void visit(KMFContainer *elem,string refNameInParent, KMFContainer* parent)
	{

	}
private:
	bool isFirstInRef;
	std::string *out;
	ModelReferenceVisitor *internalReferenceVisitor;
};

class JSONModelSerializer : public ModelSerializer
{

public:
	void serializeToStream(KMFContainer *model, iostream  raw);
	string serialize(KMFContainer *model);

};

#endif
