#ifndef KMFContainer_H
#define KMFContainer_H

#include <microframework/api/events/ModelElementListener.h>
#include <microframework/api/trace/ModelTrace.h>
#include <microframework/api/utils/any.h>
#include <microframework/api/utils/ModelVisitor.h>
#include <microframework/api/utils/ModelAttributeVisitor.h>
#include <microframework/api/utils/Logger.h>
#include <ctime>
#include <list>
#include <string>
using std::string;
using std::list;

/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

#ifdef ENABLE_LOGGER
    #define LOGGER_START(MIN_PRIORITY, FILE) Logger::Start(MIN_PRIORITY, FILE);
    #define LOGGER_STOP() Logger::Stop();
    #define LOGGER_WRITE(PRIORITY, MESSAGE) Logger::Write(PRIORITY, MESSAGE);
#else
    #define LOGGER_START(MIN_PRIORITY, FILE)
    #define LOGGER_STOP()
    #define LOGGER_WRITE(PRIORITY, MESSAGE)
#endif


class KMFContainer 
{
public:
    virtual ~KMFContainer(){}
    virtual KMFContainer* eContainer(){return NULL;}
    virtual bool isReadOnly(){return false;}
    virtual bool isRecursiveReadOnly(){return false;}
    virtual void setInternalReadOnly(){}
    virtual void deleteContainer(){} // can't use delete reserve c++
    virtual bool modelEquals(KMFContainer similarObj){return false;}
    virtual bool deepModelEquals(KMFContainer similarObj){return false;}
    virtual string getRefInParent(){return "";}
    virtual KMFContainer* findByPath(string query){return NULL;}
    virtual KMFContainer* findByID(string relationName,string idP){return NULL;}
    virtual string path(){return "";}
    virtual string metaClassName(){return "";}
    virtual void reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent ){}
    virtual void addModelElementListener(ModelElementListener lst){}
    virtual void removeModelElementListener(ModelElementListener lst){}
    virtual void removeAllModelElementListeners(){}
    virtual void addModelTreeListener(ModelElementListener lst){}
    virtual void removeModelTreeListener(ModelElementListener lst){}
    virtual void removeAllModelTreeListeners(){}
    virtual list<ModelTrace*> * toTraces(bool attributes,bool references){return NULL;}
    template <class A> // http://www.cplusplus.com/doc/tutorial/templates
	A* findByPath(string query,A clazz);
	virtual string internalGetKey(){return "";};

    virtual void visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference){ }
    virtual void visitAttributes(ModelAttributeVisitor *visitor ){}
    virtual list<ModelTrace*> *createTraces(KMFContainer *similarObj ,bool isInter ,bool isMerge ,bool onlyReferences,bool onlyAttributes ) {return NULL;}
    virtual void clean_path_cache(){}

};

#endif
