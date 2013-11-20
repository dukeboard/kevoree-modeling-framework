// todo
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */


 #ifndef __XMIModelLoader_H
 #define __XMIModelLoader_H

 #include <algorithm>
 #include <string>
 #include <vector>
 #include <iostream>
 #include <sstream>
 #include <microframework/api/KMFContainer.h>
 #include <microframework/api/KMFFactory.h>
 #include <microframework/api/ModelLoader.h>
 #include <microframework/api/utils/any.h>
 #include <microframework/api/utils/ActionType.h>
 #include <microframework/api/json/Lexer.h>
 #include <microframework/api/json/ResolveCommand.h>

 /**
  * Author: jedartois@gmail.com
  * Date: 24/10/13
  * Time: 19:36
  */

 class XMIModelLoader : public ModelLoader
 {

 public:
   XMIModelLoader();
   ~XMIModelLoader();
   KMFFactory *factory;
   virtual vector<KMFContainer*>& loadModelFromString(string str);
   virtual vector<KMFContainer*>& loadModelFromStream(istream &inputStream);

 };

 #endif
