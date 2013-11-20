/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

#ifndef __JSONModelLoader_H
#define __JSONModelLoader_H

#include <algorithm>
#include <string>
#include <vector>
#include <iostream>
#include <sstream>
#include <microframework/api/KMFContainer.h>
#include <microframework/api/KMFFactory.h>
#include <microframework/api/ModelSerializer.h>
#include <microframework/api/utils/any.h>
#include <microframework/api/utils/ActionType.h>
#include <microframework/api/json/Lexer.h>



class ModelReferenceVisitor :public ModelVisitor
{
public:
ModelReferenceVisitor(){ isFirst=true;}
     void beginVisitRef(string refName,string refType)
     {
        //out.print(",\"" + refName + "\":[")
              isFirst = true;
     }
    void visit(KMFContainer *elem,string refNameInParent, KMFContainer* parent)
    {
        if(!isFirst){
           // out.print(",")
        } else {
            isFirst = false;
        }
      //  out.print("\"" + elem.path() + "\"")
    }
private:
bool isFirst;
};



/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

class JSONModelSerializer : public ModelSerializer
{

public:
    void serializeToStream(KMFContainer *model, iostream  raw);
    string serialize(KMFContainer *model);

};

#endif
