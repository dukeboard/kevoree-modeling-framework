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
#include <KMFContainer.h>
#include <KMFFactory.h>
#include <ModelSerializer.h>
#include <utils/any.h>
#include <utils/ActionType.h>
#include <json/Lexer.h>



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
