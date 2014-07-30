/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

#include <microframework/api/json/JSONModelSerializer.h>




void JSONModelSerializer::serializeToStream(KMFContainer *model, iostream  raw)
{



}

string JSONModelSerializer::serialize(KMFContainer *model)
{
	std::string out="";
	ModelMasterVisitor *masterVisitor = new  ModelMasterVisitor(&out);
	model->visit(masterVisitor, true, true, false);
	delete masterVisitor;
	return out;
}
