#ifndef _ModelAttributeVisitor_H
#define _ModelAttributeVisitor_H
#include <microframework/api/utils/any.h>
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

#include <string>
using std::string;

class KMFContainer;
class ModelAttributeVisitor {
public:
	virtual void visit(any value,string name,KMFContainer *parent){}
};


#endif
