
#include "ModelTraceApplicator.h"
#include "ModelTrace.h"
#include <string>
#include <microframework/api/utils/any.h>


ModelTraceApplicator::ModelTraceApplicator(ContainerRoot* _targetModel, KMFFactory* _factory){
	targetModel = _targetModel ;
	factory = _factory ;
	pendingObj = NULL;
	pendingParent = NULL;
	pendingParentRefName ="";
	pendingObjPath ="" ;
	fireEvents = true ;


}

ModelTraceApplicator::~ModelTraceApplicator(){

}


void ModelTraceApplicator::createOrAdd(string previousPath , KMFContainer* target, string refName, string potentialTypeName)
{

	KMFContainer* targetElm = NULL ;
	if(!previousPath.empty()){
		targetElm = targetModel->findByPath(previousPath);
	}
	if(targetElm != NULL)
	{
		LOGGER_WRITE(Logger::DEBUG,"createOrAdd targetElm found in target model "+previousPath);
		target->reflexiveMutator(ADD,refName,targetElm, true, fireEvents) ;
	}else{
		if(!potentialTypeName.empty()){
			LOGGER_WRITE(Logger::DEBUG,string("createOrAdd instance of "+potentialTypeName));
			if(factory !=NULL){
				pendingObj = factory->create("org.kevoree." +potentialTypeName);
				if(pendingObj == NULL){
					throw string("The factory cannot create an instance of "+potentialTypeName);
				}
			}else {
				throw string("createOrAdd, the factory is null");
			}
		}
		pendingObjPath = previousPath ;
		pendingParentRefName = refName ;
		pendingParent = target ;
	}
}


void ModelTraceApplicator::tryClosePending(string srcPath){
	if((pendingObj != NULL) && (pendingObjPath.compare(srcPath) !=0)){
		if(pendingParent != NULL){
			LOGGER_WRITE(Logger::DEBUG,"tryClosePending in "+pendingParent->metaClassName()+" ParentRefName "+pendingParentRefName+" obj "+pendingObj->internalGetKey());
			pendingParent->reflexiveMutator(ADD, pendingParentRefName, pendingObj, true, fireEvents) ;
			pendingObj = NULL;
			pendingParent = NULL;
			pendingParentRefName = "";
			pendingObjPath = "";
		}else {
			LOGGER_WRITE(Logger::DEBUG,"tryClosePending not found ");
		}
	}
}

void ModelTraceApplicator::applyTraceOnModel(TraceSequence *seq){

	for (std::list<ModelTrace*>::const_iterator iterator = seq->traces.begin(), end = seq->traces.end(); iterator != end; ++iterator)
	{
		KMFContainer* target = targetModel ;
		ModelTrace* mt = *iterator ;

		if(dynamic_cast<ModelAddTrace*>(mt) != 0){
			ModelAddTrace *addtrace = (ModelAddTrace*)mt;
			//LOGGER_WRITE(Logger::DEBUG,"ModelAddTrace "+addtrace->toString());
			tryClosePending("");
			if(!addtrace->srcPath.empty())
			{
				KMFContainer *resolvedTarget=targetModel->findByPath(addtrace->srcPath);
				if(resolvedTarget == NULL)
				{
					throw string("Add Trace source not found for path : " + addtrace->srcPath + " pending " + pendingObjPath + "\n" + addtrace->toString());
				}
			}
			createOrAdd(addtrace->previousPath, target, mt->refName, addtrace->typeName);
		}else if(dynamic_cast<ModelAddAllTrace*>(mt) != 0){
			tryClosePending("");
			int i = 0 ;
			if( !((ModelAddAllTrace*)mt)->previousPath.empty())
			{
				std::list<string> prevPath = ((ModelAddAllTrace*)mt)->previousPath  ;
				for(std::list<string>::const_iterator it = prevPath.begin() , end = prevPath.end(); it != end; ++it) {
					string path = *it ;
					std::list<string>::iterator it2 = ((ModelAddAllTrace*)mt)->typeName.begin() ;
					std::advance(it2,i) ;
					if(!(*it2).empty())
					{
						string type_name = *it2;
						createOrAdd(path,target, mt->refName, type_name);
					}
					i++ ;
				}
			}
		}else if(dynamic_cast<ModelRemoveTrace*>(mt) != 0){
			tryClosePending(mt->srcPath);
			KMFContainer* tmpTarget = targetModel ;

			if(mt->srcPath.compare("") != 0){
				tmpTarget = targetModel->findByPath(mt->srcPath) ;
			}
			if(tmpTarget != NULL){
				tmpTarget->reflexiveMutator(REMOVE,mt->refName, targetModel->findByPath(((ModelRemoveTrace*)mt)->objPath), true, fireEvents);
			}
		}else if(dynamic_cast<ModelRemoveAllTrace*>(mt) != 0){
			tryClosePending(mt->srcPath);
			KMFContainer* tmpTarget = targetModel ;

			if(mt->srcPath.compare("") != 0){
				tmpTarget = targetModel->findByPath(mt->srcPath) ;
			}
			if(tmpTarget != NULL){
				tmpTarget->reflexiveMutator(REMOVE_ALL,mt->refName,NULL, true, fireEvents);
			}
		}else if(dynamic_cast<ModelSetTrace*> (mt) != 0){
			ModelSetTrace *settrace = (ModelSetTrace*)mt;
//			LOGGER_WRITE(Logger::DEBUG,"ModelSetTrace "+settrace->toString());

			tryClosePending(settrace->srcPath);
			if(!mt->srcPath.empty() && settrace->srcPath.compare(pendingObjPath) != 0){
				KMFContainer* target = targetModel->findByPath(settrace->srcPath) ;
				if(target == NULL)
				{
					throw string("Set Trace source not found for path : " + settrace->srcPath + " pending " + pendingObjPath + "\n" + settrace->toString()) ;
				}
			}else {
				if(settrace->srcPath.compare(pendingObjPath) == 0 && pendingObj != NULL){
					target = pendingObj ;
				}
			}
			if(!settrace->content.empty()){
				target->reflexiveMutator(SET, settrace->refName, settrace->content, true, fireEvents) ;
			}else
			{
				KMFContainer* targetContentPath ;
				if(!settrace->objPath.empty()){
					targetContentPath = targetModel->findByPath(settrace->objPath) ;
				}else
				{
					targetContentPath = NULL ;
				}
				if(targetContentPath != NULL){
					target->reflexiveMutator(SET, settrace->refName, targetContentPath, true , fireEvents );
				}else {
					if(!(settrace->typeName.empty()) && !(settrace->typeName.empty()) ){

						createOrAdd(settrace->objPath, target, settrace->refName,settrace->typeName) ;
					}else
					{
						any path = string("");
						target->reflexiveMutator(SET,settrace->refName,path, true, fireEvents );
					}
				}

			}
		}
	}
	tryClosePending("");
}
