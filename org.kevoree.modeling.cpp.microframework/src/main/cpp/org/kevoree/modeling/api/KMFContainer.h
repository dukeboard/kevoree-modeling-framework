
#include <string>
using namespace std;
#include "events/ModelElementListener.h"
#include "trace/ModelTrace.h"
#include <list>

class KMFContainer 
{

public:

    KMFContainer eContainer();
    bool isReadOnly();
    bool isRecursiveReadOnly();
    void setInternalReadOnly();
	void _delete(); // can't use delete 
	
	
	
	bool modelEquals(KMFContainer similarObj);
	
    bool deepModelEquals(KMFContainer similarObj);
    
    
    string getRefInParent();
    KMFContainer findByPath(string query);
    KMFContainer findByID(string relationName,string idP);
	string path();

    string metaClassName();
    void reflexiveMutator(int mutatorType,string refName, void *value, bool setOpposite,bool fireEvent );
   // fun selectByQuery(query : String) : list<Any>
   
    void addModelElementListener(ModelElementListener lst);
    void removeModelElementListener(ModelElementListener lst);
    void removeAllModelElementListeners();
    void addModelTreeListener(ModelElementListener lst);
    void removeModelTreeListener(ModelElementListener lst);
    void removeAllModelTreeListeners();
    
   // void findByPath<A>(query : String, clazz : Class<A>) : A?

  //  void visit(visitor : org.kevoree.modeling.api.util.ModelVisitor, recursive : Boolean, containedReference : Boolean,nonContainedReference : Boolean)
   // void visitAttributes(visitor : org.kevoree.modeling.api.util.ModelAttributeVisitor)

    list<ModelTrace> createTraces(KMFContainer similarObj ,bool isInter ,bool isMerge ,bool onlyReferences,bool onlyAttributes );

};
