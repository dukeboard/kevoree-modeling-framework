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
#include <microframework/api/container/KMFContainerImpl.h>


#include <microframework/api/KMFFactory.h>
#include <microframework/api/ModelLoader.h>
#include <microframework/api/utils/any.h>
#include <microframework/api/utils/ActionType.h>
#include <microframework/api/json/Lexer.h>
#include <microframework/api/json/ResolveCommand.h>


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
	vector<KMFContainer*>* loadModelFromString(string str);
	vector<KMFContainer*>* loadModelFromStream(istream &inputStream);

private:
	vector<KMFContainer*>* deserialize(istream &inputStream);
	void loadObject(Lexer *lexer,string nameInParent,KMFContainer *parent,vector<KMFContainer*> *roots ,vector<ResolveCommand*> *commands);
	string  unescapeJSON(string src);


};

#endif
