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
#include <container/KMFContainerImpl.h>


#include <KMFFactory.h>
#include <ModelLoader.h>
#include <utils/any.h>
#include <utils/ActionType.h>
#include <json/Lexer.h>
#include <json/ResolveCommand.h>


/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

class JSONModelLoader : public ModelLoader
{

public:
  JSONModelLoader();
  ~JSONModelLoader();
  KMFFactory *factory;
  void setFactory(KMFFactory *factory);
  virtual vector<KMFContainer*>* loadModelFromString(string str);
  virtual vector<KMFContainer*>* loadModelFromStream(istream &inputStream);

private:
vector<KMFContainer*>* deserialize(istream &inputStream);
void loadObject(Lexer *lexer,string nameInParent,KMFContainer *parent,vector<KMFContainer*> *roots ,vector<ResolveCommand*> *commands);
string  unescapeJSON(string src);


};

#endif
