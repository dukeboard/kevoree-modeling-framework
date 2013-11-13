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
 #include <KMFContainer.h>
 #include <KMFFactory.h>
 #include <ModelLoader.h>
 #include <utils/any.h>
 #include <utils/ActionType.h>
 #include <json/Lexer.h>
 #include <json/ResolveCommand.h>

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
