#include <microframework/api/container/KMFContainerImpl.h>

/**
 * Author: jedartois@gmail.com
 * Date: 31/11/13
 * Time: 8:45
 */



KMFContainerImpl::KMFContainerImpl()
{
	internal_readOnlyElem = false;
	internal_recursive_readOnlyElem=false;
	internal_unsetCmd=NULL;
	internal_eContainer=NULL;
}

KMFContainerImpl::~KMFContainerImpl()
{
	if(internal_unsetCmd){
		delete internal_unsetCmd;
	}
}

KMFContainer* KMFContainerImpl::eContainer()
{
	return internal_eContainer;
}

string KMFContainerImpl::getRefInParent()
{
	return internal_containmentRefName;
}


list<ModelTrace*> * KMFContainerImpl::toTraces(bool attributes,bool references){
	list<ModelTrace*> *traces = new  list<ModelTrace*>;
	if(attributes)
	{
		ToTracesattVisitorFill *attVisitorFill= new ToTracesattVisitorFill(path(),traces);
		this->visitAttributes(attVisitorFill);
		delete attVisitorFill;
	}

	if(references){
		ToTracesrefVisitorFill *refVisitorFill = new ToTracesrefVisitorFill(path(),traces);
		this->visit(refVisitorFill,false,true,true);
		delete refVisitorFill;
	}

	return traces;
}
void KMFContainerImpl::setEContainer(KMFContainerImpl *container,RemoveFromContainerCommand *unsetCmd,string refNameInParent){

	LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"BEGIN --KMFContainerImpl::setEContainer "+refNameInParent);
	if(!internal_readOnlyElem)
	{
		RemoveFromContainerCommand *tempUnsetCmd = internal_unsetCmd;
		if(internal_unsetCmd !=NULL){
			internal_unsetCmd = NULL;
		}

		if(tempUnsetCmd != NULL)
		{
			tempUnsetCmd->run();
			delete  tempUnsetCmd;
		}

		internal_eContainer = container;
		internal_unsetCmd = unsetCmd;
		internal_containmentRefName = refNameInParent;

		path_cache.clear();

		CacheVisitorCleaner *cleanCacheVisitor = new CacheVisitorCleaner();
		visit(cleanCacheVisitor,true,true,false);
		delete  cleanCacheVisitor;

	}

	LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"END --KMFContainerImpl:setEContainer");
}

void  KMFContainerImpl::internal_visit(ModelVisitor *visitor,KMFContainer *internalElem,bool recursive,bool containedReference,bool nonContainedReference,string refName)
{
	LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"BEGIN --KMFContainerImpl::internal_visit path nonContainedReference");
	if(internalElem != NULL)
	{
		if(nonContainedReference && recursive)
		{
			string elemPath = internalElem->path();

			if(visitor->alreadyVisited.find(elemPath) != visitor->alreadyVisited.end())
			{
				LOGGER_WRITE(Logger::DEBUG_MODEL,"already visited "+elemPath);
				return;
			}
			visitor->alreadyVisited[elemPath] =internalElem;
		}
		LOGGER_WRITE(Logger::DEBUG_MODEL,"Visiting "+refName);
		visitor->visit(internalElem,refName,this);
		if(!visitor->visitStopped)
		{
			if(recursive && (visitor->visitChildren || visitor->visitReferences))
			{
				bool visitSubReferences =   nonContainedReference &&  visitor->visitReferences;
				bool visitSubChilds =   containedReference &&  visitor->visitChildren;

				internalElem->visit(visitor,recursive,visitSubChilds,visitSubReferences) ;
			}
			visitor->visitChildren =   true;
			visitor->visitReferences = true;
		}
	}
	LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"END --KMFContainerImpl::internal_visit");
}


string KMFContainerImpl::path()
{
	LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"REQUEST -- KMFContainerImpl::path");
	if(!path_cache.empty())
	{
		LOGGER_WRITE(Logger::DEBUG_MODEL,"RESULT -- KMFContainerImpl::path "+path_cache);
		return path_cache;
	}
	KMFContainer *container = eContainer();
	if(container != NULL) {

		string parentPath = container->path();

		if(parentPath == "")
		{
			path_cache = "";
		}else
		{
			parentPath += "/";
		}
		path_cache = parentPath + internal_containmentRefName + "[" + internalGetKey() + "]";

	} else
	{
		path_cache =  "";
	}
	LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"END --KMFContainerImpl::path");
	return path_cache;
}

KMFContainer* KMFContainerImpl::findByPath(string query)
{
	int firstSepIndex = query.find('[',0);
	if(firstSepIndex == -1)
	{
		if(query.empty())
		{
			return this;
		}
		else
		{
			//   return this->findByID(query,"");
			return NULL;
		}
	}
	string queryID = "";
	int extraReadChar = 2;
	string relationName = query.substr(0,query.find('[',0)) ;
	if(query.find('{',0) == firstSepIndex + 1)
	{
		queryID = query.substr(query.find('{',0) + 1, query.find('}',0));
		extraReadChar = extraReadChar + 2 ;
	} else
	{
		int indexFirstClose = query.find(']',0);

		while( indexFirstClose + 1 < query.size() && query.at(indexFirstClose + 1) != '/')
		{
			indexFirstClose = query.find(']',indexFirstClose + 1);
		}

		int id_size =   indexFirstClose - query.find('[',0)-1;
		queryID = query.substr(query.find('[',0) + 1, id_size);
	}
	int v =    (relationName.size() + queryID.size() + extraReadChar);
	int size = query.size() -v;


	string subquery = query.substr(relationName.size() + queryID.size() + extraReadChar, size);

	if (subquery.find('/',0) != -1)
	{
		subquery = subquery.substr(subquery.find('/',0) + 1, subquery.size()-subquery.find('/',0));
	}


	KMFContainer *objFound = findByID(relationName,queryID) ;
	if(!subquery.empty() && objFound != NULL)
	{
		return objFound->findByPath(subquery);
	} else
	{
		return objFound;
	}
}


void KMFContainerImpl::clean_path_cache(){
	path_cache.clear();
}

list<ModelTrace*>* KMFContainerImpl::createTraces(KMFContainer *similarObj ,bool isInter ,bool isMerge ,bool onlyReferences,bool onlyAttributes )
{
	LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"\t begin -- createTraces "+similarObj->path());
	list <ModelTrace*> *traces= new   list <ModelTrace *>;
	std::map<string,string> values;
	LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"begin visit attributes");
	if(onlyAttributes)
	{

		VisitorFiller *attVisitorFill= new VisitorFiller (&values);
		visitAttributes(attVisitorFill);
		delete   attVisitorFill;

		if(similarObj!=NULL)
		{
			VisitorAtt  *attVisitor= new VisitorAtt(&values,traces,path(),isInter);
			similarObj->visitAttributes(attVisitor);
			delete attVisitor;
		}

		if(!isInter && !isMerge && values.size() != 0)
		{

			for ( std::map<string,string>::const_iterator it = (values).begin();  it != (values).end(); ++it) {

				string  hashLoopRes= it->first;
				ModelSetTrace *modelsettrace = new ModelSetTrace(path(),hashLoopRes,"","","");
				traces->push_back(modelsettrace);
			}

		}
	}
	LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"end visit attributes");

	if(onlyReferences)
	{
		LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"begin visiting references");
		string payload ="";
		VisitorFillRef *refVisitorFill = new VisitorFillRef(&values);         // TODO FIXE ME ? payload
		visit(refVisitorFill,false,false,true);
		delete refVisitorFill;

		if(similarObj)
		{
			VisitorRef *refvisitor = new VisitorRef(&values,traces,path(),isInter);
			similarObj->visit(refvisitor,false,false,true);
			delete refvisitor;
		}

		if(!isInter && !isMerge && (values.size() != 0))
		{

			for ( std::map<string,string>::const_iterator it = (values).begin();  it != (values).end(); ++it)
			{
				string hashLoopRes =  it->first;
				vector<string> result;
				Utils::split(result, hashLoopRes, "_");
				if(result.size() ==2){		
					ModelRemoveTrace *removetrace = new ModelRemoveTrace(path(),result.at(0),result.at(1));
					traces->push_back(removetrace);
				}
				else
				{
					LOGGER_WRITE(Logger::ERROR,"hashLoopRes "+hashLoopRes);
				}
			}
		}
		LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"end visiting references");
	}
	values.clear();
	LOGGER_WRITE(Logger::DEBUG_MICROFRAMEWORK,"\t end -- createTraces "+similarObj->path());
	return traces;
}
template <class A>
A* KMFContainerImpl::findByPath(string query,A clazz)
{
	KMFContainer* result= findByPath(query);
	if(result !=NULL){
		if(typeid(*result) == typeid(clazz)){
			return result;
		}                 else {
			return NULL;
		}
	}
	else
	{
		return NULL;
	}
}
