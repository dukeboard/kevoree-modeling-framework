#include "kevoree.h"
std::string ComponentInstance::internalGetKey(){
return name;
}
Port* ComponentInstance::findprovidedByID(std::string id){
PRINTF("END -- findByID " <<provided[id] << " ");
return provided[id];
}
Port* ComponentInstance::findrequiredByID(std::string id){
PRINTF("END -- findByID " <<required[id] << " ");
return required[id];
}




void ComponentInstance::addprovided(Port *ptr)
{
    PRINTF("BEGIN -- ComponentInstance addprovided");
    Port  *container = (Port *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addprovided " << endl;
    }else
    {

        if(provided.find(container->internalGetKey()) == provided.end())
        {
            PRINTF("KEY -- ComponentInstance provided  "<< container->internalGetKey() );
            provided[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ComponentInstance  addprovided");
}






void ComponentInstance::addrequired(Port *ptr)
{
    PRINTF("BEGIN -- ComponentInstance addrequired");
    Port  *container = (Port *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addrequired " << endl;
    }else
    {

        if(required.find(container->internalGetKey()) == required.end())
        {
            PRINTF("KEY -- ComponentInstance required  "<< container->internalGetKey() );
            required[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ComponentInstance  addrequired");
}


void ComponentInstance::add_namespace(_Namespace *ptr){
_namespace =ptr;
}





void ComponentInstance::removeprovided(Port *ptr)
{
    PRINTF("BEGIN -- ComponentInstance removeprovided");
    Port *container = (Port*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for provided");
    }
    else
    {
        PRINTF("KEY -- ComponentInstance provided  "<< container->internalGetKey() );
        provided.set_deleted_key(container->internalGetKey());
        provided.erase( provided.find(container->internalGetKey()));
        provided.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ComponentInstance removeprovided");
}






void ComponentInstance::removerequired(Port *ptr)
{
    PRINTF("BEGIN -- ComponentInstance removerequired");
    Port *container = (Port*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for required");
    }
    else
    {
        PRINTF("KEY -- ComponentInstance required  "<< container->internalGetKey() );
        required.set_deleted_key(container->internalGetKey());
        required.erase( required.find(container->internalGetKey()));
        required.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ComponentInstance removerequired");
}


void ComponentInstance::remove_namespace(_Namespace *ptr){
delete ptr;
}

string ComponentInstance::metaClassName() {
return "ComponentInstance";
}
void ComponentInstance::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator ComponentInstance"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("metaData")==0){
metaData= AnyCast<string>(value);
} else if(refName.compare("started")==0){
if(AnyCast<string>(value).compare("true") == 0){
started= true;
}else { 
started= false;
}
}

if(refName.compare("typeDefinition")==0){
if(mutatorType ==ADD){
addtypeDefinition((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removetypeDefinition((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
} else if(refName.compare("dictionary")==0){
if(mutatorType ==ADD){
adddictionary((Dictionary*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionary((Dictionary*)AnyCast<Dictionary*>(value));
}
} else if(refName.compare("provided")==0){
if(mutatorType ==ADD){
addprovided((Port*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeprovided((Port*)AnyCast<Port*>(value));
}
} else if(refName.compare("required")==0){
if(mutatorType ==ADD){
addrequired((Port*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removerequired((Port*)AnyCast<Port*>(value));
}
} else if(refName.compare("_namespace")==0){
if(mutatorType ==ADD){
add_namespace((_Namespace*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
remove_namespace((_Namespace*)AnyCast<_Namespace*>(value));
}
}

PRINTF("END -- reflexiveMutator ComponentInstance "); 
}

KMFContainer* ComponentInstance::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID ComponentInstance" << relationName << " " << idP);
if(relationName.compare("typeDefinition")== 0){
return typeDefinition;
}

if(relationName.compare("dictionary")== 0){
return dictionary;
}

if(relationName.compare("provided")== 0){
return (KMFContainer*)findprovidedByID(idP);
}

if(relationName.compare("required")== 0){
return (KMFContainer*)findrequiredByID(idP);
}

if(relationName.compare("_namespace")== 0){
return _namespace;
}

PRINTF("END -- findByID ComponentInstance");
return NULL;

}





void ComponentInstance::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("ComponentInstance --> Visiting class ComponentInstance");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("provided","org.kevoree.Port");
for ( google::dense_hash_map<string,Port*>::iterator it = provided.begin();  it != provided.end(); ++it)
{
    Port * current =(Port*) it->second;
    PRINTF("ComponentInstance --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"provided");
}
visitor->endVisitRef("provided");



visitor->beginVisitRef("required","org.kevoree.Port");
for ( google::dense_hash_map<string,Port*>::iterator it = required.begin();  it != required.end(); ++it)
{
    Port * current =(Port*) it->second;
    PRINTF("ComponentInstance --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"required");
}
visitor->endVisitRef("required");
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void ComponentInstance::visitAttributes(ModelAttributeVisitor *visitor){
}
ComponentInstance::ComponentInstance(){

provided.set_empty_key("");
required.set_empty_key("");

}

ComponentInstance::~ComponentInstance(){






for ( google::dense_hash_map<string,Port*>::iterator it = provided.begin();  it != provided.end(); ++it)
{
Port * current = it->second;
if(current != NULL)
{
    delete current;
}

}

provided.clear();





for ( google::dense_hash_map<string,Port*>::iterator it = required.begin();  it != required.end(); ++it)
{
Port * current = it->second;
if(current != NULL)
{
    delete current;
}

}

required.clear();


}

std::string ComponentType::internalGetKey(){
return name;
}
PortTypeRef* ComponentType::findrequiredByID(std::string id){
PRINTF("END -- findByID " <<required[id] << " ");
return required[id];
}
IntegrationPattern* ComponentType::findintegrationPatternsByID(std::string id){
PRINTF("END -- findByID " <<integrationPatterns[id] << " ");
return integrationPatterns[id];
}
PortTypeRef* ComponentType::findprovidedByID(std::string id){
PRINTF("END -- findByID " <<provided[id] << " ");
return provided[id];
}




void ComponentType::addrequired(PortTypeRef *ptr)
{
    PRINTF("BEGIN -- ComponentType addrequired");
    PortTypeRef  *container = (PortTypeRef *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addrequired " << endl;
    }else
    {

        if(required.find(container->internalGetKey()) == required.end())
        {
            PRINTF("KEY -- ComponentType required  "<< container->internalGetKey() );
            required[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ComponentType  addrequired");
}






void ComponentType::addintegrationPatterns(IntegrationPattern *ptr)
{
    PRINTF("BEGIN -- ComponentType addintegrationPatterns");
    IntegrationPattern  *container = (IntegrationPattern *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addintegrationPatterns " << endl;
    }else
    {

        if(integrationPatterns.find(container->internalGetKey()) == integrationPatterns.end())
        {
            PRINTF("KEY -- ComponentType integrationPatterns  "<< container->internalGetKey() );
            integrationPatterns[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ComponentType  addintegrationPatterns");
}


void ComponentType::addextraFonctionalProperties(ExtraFonctionalProperty *ptr){
extraFonctionalProperties =ptr;
}





void ComponentType::addprovided(PortTypeRef *ptr)
{
    PRINTF("BEGIN -- ComponentType addprovided");
    PortTypeRef  *container = (PortTypeRef *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addprovided " << endl;
    }else
    {

        if(provided.find(container->internalGetKey()) == provided.end())
        {
            PRINTF("KEY -- ComponentType provided  "<< container->internalGetKey() );
            provided[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ComponentType  addprovided");
}






void ComponentType::removerequired(PortTypeRef *ptr)
{
    PRINTF("BEGIN -- ComponentType removerequired");
    PortTypeRef *container = (PortTypeRef*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for required");
    }
    else
    {
        PRINTF("KEY -- ComponentType required  "<< container->internalGetKey() );
        required.set_deleted_key(container->internalGetKey());
        required.erase( required.find(container->internalGetKey()));
        required.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ComponentType removerequired");
}






void ComponentType::removeintegrationPatterns(IntegrationPattern *ptr)
{
    PRINTF("BEGIN -- ComponentType removeintegrationPatterns");
    IntegrationPattern *container = (IntegrationPattern*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for integrationPatterns");
    }
    else
    {
        PRINTF("KEY -- ComponentType integrationPatterns  "<< container->internalGetKey() );
        integrationPatterns.set_deleted_key(container->internalGetKey());
        integrationPatterns.erase( integrationPatterns.find(container->internalGetKey()));
        integrationPatterns.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ComponentType removeintegrationPatterns");
}


void ComponentType::removeextraFonctionalProperties(ExtraFonctionalProperty *ptr){
delete ptr;
}





void ComponentType::removeprovided(PortTypeRef *ptr)
{
    PRINTF("BEGIN -- ComponentType removeprovided");
    PortTypeRef *container = (PortTypeRef*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for provided");
    }
    else
    {
        PRINTF("KEY -- ComponentType provided  "<< container->internalGetKey() );
        provided.set_deleted_key(container->internalGetKey());
        provided.erase( provided.find(container->internalGetKey()));
        provided.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ComponentType removeprovided");
}


string ComponentType::metaClassName() {
return "ComponentType";
}
void ComponentType::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator ComponentType"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("factoryBean")==0){
factoryBean= AnyCast<string>(value);
} else if(refName.compare("bean")==0){
bean= AnyCast<string>(value);
} else if(refName.compare("abstract")==0){
if(AnyCast<string>(value).compare("true") == 0){
abstract= true;
}else { 
abstract= false;
}
} else if(refName.compare("startMethod")==0){
startMethod= AnyCast<string>(value);
} else if(refName.compare("stopMethod")==0){
stopMethod= AnyCast<string>(value);
} else if(refName.compare("updateMethod")==0){
updateMethod= AnyCast<string>(value);
}

if(refName.compare("deployUnits")==0){
if(mutatorType ==ADD){
adddeployUnits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedeployUnits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("dictionaryType")==0){
if(mutatorType ==ADD){
adddictionaryType((DictionaryType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionaryType((DictionaryType*)AnyCast<DictionaryType*>(value));
}
} else if(refName.compare("superTypes")==0){
if(mutatorType ==ADD){
addsuperTypes((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesuperTypes((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
} else if(refName.compare("required")==0){
if(mutatorType ==ADD){
addrequired((PortTypeRef*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removerequired((PortTypeRef*)AnyCast<PortTypeRef*>(value));
}
} else if(refName.compare("integrationPatterns")==0){
if(mutatorType ==ADD){
addintegrationPatterns((IntegrationPattern*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeintegrationPatterns((IntegrationPattern*)AnyCast<IntegrationPattern*>(value));
}
} else if(refName.compare("extraFonctionalProperties")==0){
if(mutatorType ==ADD){
addextraFonctionalProperties((ExtraFonctionalProperty*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeextraFonctionalProperties((ExtraFonctionalProperty*)AnyCast<ExtraFonctionalProperty*>(value));
}
} else if(refName.compare("provided")==0){
if(mutatorType ==ADD){
addprovided((PortTypeRef*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeprovided((PortTypeRef*)AnyCast<PortTypeRef*>(value));
}
}

PRINTF("END -- reflexiveMutator ComponentType "); 
}

KMFContainer* ComponentType::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID ComponentType" << relationName << " " << idP);
if(relationName.compare("deployUnits")== 0){
return (KMFContainer*)finddeployUnitsByID(idP);
}

if(relationName.compare("dictionaryType")== 0){
return dictionaryType;
}

if(relationName.compare("superTypes")== 0){
return (KMFContainer*)findsuperTypesByID(idP);
}

if(relationName.compare("required")== 0){
return (KMFContainer*)findrequiredByID(idP);
}

if(relationName.compare("integrationPatterns")== 0){
return (KMFContainer*)findintegrationPatternsByID(idP);
}

if(relationName.compare("extraFonctionalProperties")== 0){
return extraFonctionalProperties;
}

if(relationName.compare("provided")== 0){
return (KMFContainer*)findprovidedByID(idP);
}

PRINTF("END -- findByID ComponentType");
return NULL;

}





void ComponentType::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("ComponentType --> Visiting class ComponentType");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("required","org.kevoree.PortTypeRef");
for ( google::dense_hash_map<string,PortTypeRef*>::iterator it = required.begin();  it != required.end(); ++it)
{
    PortTypeRef * current =(PortTypeRef*) it->second;
    PRINTF("ComponentType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"required");
}
visitor->endVisitRef("required");



visitor->beginVisitRef("integrationPatterns","org.kevoree.IntegrationPattern");
for ( google::dense_hash_map<string,IntegrationPattern*>::iterator it = integrationPatterns.begin();  it != integrationPatterns.end(); ++it)
{
    IntegrationPattern * current =(IntegrationPattern*) it->second;
    PRINTF("ComponentType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"integrationPatterns");
}
visitor->endVisitRef("integrationPatterns");



visitor->beginVisitRef("provided","org.kevoree.PortTypeRef");
for ( google::dense_hash_map<string,PortTypeRef*>::iterator it = provided.begin();  it != provided.end(); ++it)
{
    PortTypeRef * current =(PortTypeRef*) it->second;
    PRINTF("ComponentType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"provided");
}
visitor->endVisitRef("provided");
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("deployUnits","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("ComponentType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"deployUnits");
}
visitor->endVisitRef("deployUnits");



visitor->beginVisitRef("superTypes","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = superTypes.begin();  it != superTypes.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("ComponentType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"superTypes");
}
visitor->endVisitRef("superTypes");
    }
    visitor->endVisitElem(this);
}


void ComponentType::visitAttributes(ModelAttributeVisitor *visitor){
}
ComponentType::ComponentType(){

required.set_empty_key("");
integrationPatterns.set_empty_key("");
provided.set_empty_key("");

}

ComponentType::~ComponentType(){






for ( google::dense_hash_map<string,PortTypeRef*>::iterator it = required.begin();  it != required.end(); ++it)
{
PortTypeRef * current = it->second;
if(current != NULL)
{
    delete current;
}

}

required.clear();





for ( google::dense_hash_map<string,IntegrationPattern*>::iterator it = integrationPatterns.begin();  it != integrationPatterns.end(); ++it)
{
IntegrationPattern * current = it->second;
if(current != NULL)
{
    delete current;
}

}

integrationPatterns.clear();





for ( google::dense_hash_map<string,PortTypeRef*>::iterator it = provided.begin();  it != provided.end(); ++it)
{
PortTypeRef * current = it->second;
if(current != NULL)
{
    delete current;
}

}

provided.clear();


}

std::string ContainerNode::internalGetKey(){
return name;
}
ComponentInstance* ContainerNode::findcomponentsByID(std::string id){
PRINTF("END -- findByID " <<components[id] << " ");
return components[id];
}
ContainerNode* ContainerNode::findhostsByID(std::string id){
PRINTF("END -- findByID " <<hosts[id] << " ");
return hosts[id];
}
Group* ContainerNode::findgroupsByID(std::string id){
PRINTF("END -- findByID " <<groups[id] << " ");
return groups[id];
}




void ContainerNode::addcomponents(ComponentInstance *ptr)
{
    PRINTF("BEGIN -- ContainerNode addcomponents");
    ComponentInstance  *container = (ComponentInstance *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addcomponents " << endl;
    }else
    {

        if(components.find(container->internalGetKey()) == components.end())
        {
            PRINTF("KEY -- ContainerNode components  "<< container->internalGetKey() );
            components[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerNode  addcomponents");
}






void ContainerNode::addhosts(ContainerNode *ptr)
{
    PRINTF("BEGIN -- ContainerNode addhosts");
    ContainerNode  *container = (ContainerNode *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addhosts " << endl;
    }else
    {

        if(hosts.find(container->internalGetKey()) == hosts.end())
        {
            PRINTF("KEY -- ContainerNode hosts  "<< container->internalGetKey() );
            hosts[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"hosts",ptr_any);
container->setEContainer(this,cmd,"hosts");

        }
    }
    PRINTF("END -- ContainerNode  addhosts");
}


void ContainerNode::addhost(ContainerNode *ptr){
host =ptr;
}





void ContainerNode::addgroups(Group *ptr)
{
    PRINTF("BEGIN -- ContainerNode addgroups");
    Group  *container = (Group *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addgroups " << endl;
    }else
    {

        if(groups.find(container->internalGetKey()) == groups.end())
        {
            PRINTF("KEY -- ContainerNode groups  "<< container->internalGetKey() );
            groups[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"groups",ptr_any);
container->setEContainer(this,cmd,"groups");

        }
    }
    PRINTF("END -- ContainerNode  addgroups");
}






void ContainerNode::removecomponents(ComponentInstance *ptr)
{
    PRINTF("BEGIN -- ContainerNode removecomponents");
    ComponentInstance *container = (ComponentInstance*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for components");
    }
    else
    {
        PRINTF("KEY -- ContainerNode components  "<< container->internalGetKey() );
        components.set_deleted_key(container->internalGetKey());
        components.erase( components.find(container->internalGetKey()));
        components.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerNode removecomponents");
}






void ContainerNode::removehosts(ContainerNode *ptr)
{
    PRINTF("BEGIN -- ContainerNode removehosts");
    ContainerNode *container = (ContainerNode*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for hosts");
    }
    else
    {
        PRINTF("KEY -- ContainerNode hosts  "<< container->internalGetKey() );
        hosts.set_deleted_key(container->internalGetKey());
        hosts.erase( hosts.find(container->internalGetKey()));
        hosts.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerNode removehosts");
}


void ContainerNode::removehost(ContainerNode *ptr){
delete ptr;
}





void ContainerNode::removegroups(Group *ptr)
{
    PRINTF("BEGIN -- ContainerNode removegroups");
    Group *container = (Group*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for groups");
    }
    else
    {
        PRINTF("KEY -- ContainerNode groups  "<< container->internalGetKey() );
        groups.set_deleted_key(container->internalGetKey());
        groups.erase( groups.find(container->internalGetKey()));
        groups.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerNode removegroups");
}


string ContainerNode::metaClassName() {
return "ContainerNode";
}
void ContainerNode::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator ContainerNode"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("metaData")==0){
metaData= AnyCast<string>(value);
} else if(refName.compare("started")==0){
if(AnyCast<string>(value).compare("true") == 0){
started= true;
}else { 
started= false;
}
}

if(refName.compare("typeDefinition")==0){
if(mutatorType ==ADD){
addtypeDefinition((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removetypeDefinition((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
} else if(refName.compare("dictionary")==0){
if(mutatorType ==ADD){
adddictionary((Dictionary*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionary((Dictionary*)AnyCast<Dictionary*>(value));
}
} else if(refName.compare("components")==0){
if(mutatorType ==ADD){
addcomponents((ComponentInstance*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removecomponents((ComponentInstance*)AnyCast<ComponentInstance*>(value));
}
} else if(refName.compare("hosts")==0){
if(mutatorType ==ADD){
addhosts((ContainerNode*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removehosts((ContainerNode*)AnyCast<ContainerNode*>(value));
}
} else if(refName.compare("host")==0){
if(mutatorType ==ADD){
addhost((ContainerNode*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removehost((ContainerNode*)AnyCast<ContainerNode*>(value));
}
} else if(refName.compare("groups")==0){
if(mutatorType ==ADD){
addgroups((Group*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removegroups((Group*)AnyCast<Group*>(value));
}
}

PRINTF("END -- reflexiveMutator ContainerNode "); 
}

KMFContainer* ContainerNode::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID ContainerNode" << relationName << " " << idP);
if(relationName.compare("typeDefinition")== 0){
return typeDefinition;
}

if(relationName.compare("dictionary")== 0){
return dictionary;
}

if(relationName.compare("components")== 0){
return (KMFContainer*)findcomponentsByID(idP);
}

if(relationName.compare("hosts")== 0){
return (KMFContainer*)findhostsByID(idP);
}

if(relationName.compare("host")== 0){
return host;
}

if(relationName.compare("groups")== 0){
return (KMFContainer*)findgroupsByID(idP);
}

PRINTF("END -- findByID ContainerNode");
return NULL;

}





void ContainerNode::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("ContainerNode --> Visiting class ContainerNode");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("components","org.kevoree.ComponentInstance");
for ( google::dense_hash_map<string,ComponentInstance*>::iterator it = components.begin();  it != components.end(); ++it)
{
    ComponentInstance * current =(ComponentInstance*) it->second;
    PRINTF("ContainerNode --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"components");
}
visitor->endVisitRef("components");
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("hosts","org.kevoree.ContainerNode");
for ( google::dense_hash_map<string,ContainerNode*>::iterator it = hosts.begin();  it != hosts.end(); ++it)
{
    ContainerNode * current =(ContainerNode*) it->second;
    PRINTF("ContainerNode --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"hosts");
}
visitor->endVisitRef("hosts");



visitor->beginVisitRef("groups","org.kevoree.Group");
for ( google::dense_hash_map<string,Group*>::iterator it = groups.begin();  it != groups.end(); ++it)
{
    Group * current =(Group*) it->second;
    PRINTF("ContainerNode --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"groups");
}
visitor->endVisitRef("groups");
    }
    visitor->endVisitElem(this);
}


void ContainerNode::visitAttributes(ModelAttributeVisitor *visitor){
}
ContainerNode::ContainerNode(){

components.set_empty_key("");
hosts.set_empty_key("");
groups.set_empty_key("");

}

ContainerNode::~ContainerNode(){






for ( google::dense_hash_map<string,ComponentInstance*>::iterator it = components.begin();  it != components.end(); ++it)
{
ComponentInstance * current = it->second;
if(current != NULL)
{
    delete current;
}

}

components.clear();


}

std::string ContainerRoot::internalGetKey(){
return generated_KMF_ID;
}
ContainerNode* ContainerRoot::findnodesByID(std::string id){
PRINTF("END -- findByID " <<nodes[id] << " ");
return nodes[id];
}
TypeDefinition* ContainerRoot::findtypeDefinitionsByID(std::string id){
PRINTF("END -- findByID " <<typeDefinitions[id] << " ");
return typeDefinitions[id];
}
Repository* ContainerRoot::findrepositoriesByID(std::string id){
PRINTF("END -- findByID " <<repositories[id] << " ");
return repositories[id];
}
TypedElement* ContainerRoot::finddataTypesByID(std::string id){
PRINTF("END -- findByID " <<dataTypes[id] << " ");
return dataTypes[id];
}
TypeLibrary* ContainerRoot::findlibrariesByID(std::string id){
PRINTF("END -- findByID " <<libraries[id] << " ");
return libraries[id];
}
Channel* ContainerRoot::findhubsByID(std::string id){
PRINTF("END -- findByID " <<hubs[id] << " ");
return hubs[id];
}
MBinding* ContainerRoot::findmBindingsByID(std::string id){
PRINTF("END -- findByID " <<mBindings[id] << " ");
return mBindings[id];
}
DeployUnit* ContainerRoot::finddeployUnitsByID(std::string id){
PRINTF("END -- findByID " <<deployUnits[id] << " ");
return deployUnits[id];
}
NodeNetwork* ContainerRoot::findnodeNetworksByID(std::string id){
PRINTF("END -- findByID " <<nodeNetworks[id] << " ");
return nodeNetworks[id];
}
Group* ContainerRoot::findgroupsByID(std::string id){
PRINTF("END -- findByID " <<groups[id] << " ");
return groups[id];
}
AdaptationPrimitiveType* ContainerRoot::findadaptationPrimitiveTypesByID(std::string id){
PRINTF("END -- findByID " <<adaptationPrimitiveTypes[id] << " ");
return adaptationPrimitiveTypes[id];
}




void ContainerRoot::addnodes(ContainerNode *ptr)
{
    PRINTF("BEGIN -- ContainerRoot addnodes");
    ContainerNode  *container = (ContainerNode *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addnodes " << endl;
    }else
    {

        if(nodes.find(container->internalGetKey()) == nodes.end())
        {
            PRINTF("KEY -- ContainerRoot nodes  "<< container->internalGetKey() );
            nodes[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerRoot  addnodes");
}






void ContainerRoot::addtypeDefinitions(TypeDefinition *ptr)
{
    PRINTF("BEGIN -- ContainerRoot addtypeDefinitions");
    TypeDefinition  *container = (TypeDefinition *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addtypeDefinitions " << endl;
    }else
    {

        if(typeDefinitions.find(container->internalGetKey()) == typeDefinitions.end())
        {
            PRINTF("KEY -- ContainerRoot typeDefinitions  "<< container->internalGetKey() );
            typeDefinitions[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerRoot  addtypeDefinitions");
}






void ContainerRoot::addrepositories(Repository *ptr)
{
    PRINTF("BEGIN -- ContainerRoot addrepositories");
    Repository  *container = (Repository *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addrepositories " << endl;
    }else
    {

        if(repositories.find(container->internalGetKey()) == repositories.end())
        {
            PRINTF("KEY -- ContainerRoot repositories  "<< container->internalGetKey() );
            repositories[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerRoot  addrepositories");
}






void ContainerRoot::adddataTypes(TypedElement *ptr)
{
    PRINTF("BEGIN -- ContainerRoot adddataTypes");
    TypedElement  *container = (TypedElement *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY adddataTypes " << endl;
    }else
    {

        if(dataTypes.find(container->internalGetKey()) == dataTypes.end())
        {
            PRINTF("KEY -- ContainerRoot dataTypes  "<< container->internalGetKey() );
            dataTypes[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerRoot  adddataTypes");
}






void ContainerRoot::addlibraries(TypeLibrary *ptr)
{
    PRINTF("BEGIN -- ContainerRoot addlibraries");
    TypeLibrary  *container = (TypeLibrary *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addlibraries " << endl;
    }else
    {

        if(libraries.find(container->internalGetKey()) == libraries.end())
        {
            PRINTF("KEY -- ContainerRoot libraries  "<< container->internalGetKey() );
            libraries[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerRoot  addlibraries");
}






void ContainerRoot::addhubs(Channel *ptr)
{
    PRINTF("BEGIN -- ContainerRoot addhubs");
    Channel  *container = (Channel *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addhubs " << endl;
    }else
    {

        if(hubs.find(container->internalGetKey()) == hubs.end())
        {
            PRINTF("KEY -- ContainerRoot hubs  "<< container->internalGetKey() );
            hubs[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerRoot  addhubs");
}






void ContainerRoot::addmBindings(MBinding *ptr)
{
    PRINTF("BEGIN -- ContainerRoot addmBindings");
    MBinding  *container = (MBinding *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addmBindings " << endl;
    }else
    {

        if(mBindings.find(container->internalGetKey()) == mBindings.end())
        {
            PRINTF("KEY -- ContainerRoot mBindings  "<< container->internalGetKey() );
            mBindings[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerRoot  addmBindings");
}






void ContainerRoot::adddeployUnits(DeployUnit *ptr)
{
    PRINTF("BEGIN -- ContainerRoot adddeployUnits");
    DeployUnit  *container = (DeployUnit *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY adddeployUnits " << endl;
    }else
    {

        if(deployUnits.find(container->internalGetKey()) == deployUnits.end())
        {
            PRINTF("KEY -- ContainerRoot deployUnits  "<< container->internalGetKey() );
            deployUnits[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerRoot  adddeployUnits");
}






void ContainerRoot::addnodeNetworks(NodeNetwork *ptr)
{
    PRINTF("BEGIN -- ContainerRoot addnodeNetworks");
    NodeNetwork  *container = (NodeNetwork *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addnodeNetworks " << endl;
    }else
    {

        if(nodeNetworks.find(container->internalGetKey()) == nodeNetworks.end())
        {
            PRINTF("KEY -- ContainerRoot nodeNetworks  "<< container->internalGetKey() );
            nodeNetworks[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerRoot  addnodeNetworks");
}






void ContainerRoot::addgroups(Group *ptr)
{
    PRINTF("BEGIN -- ContainerRoot addgroups");
    Group  *container = (Group *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addgroups " << endl;
    }else
    {

        if(groups.find(container->internalGetKey()) == groups.end())
        {
            PRINTF("KEY -- ContainerRoot groups  "<< container->internalGetKey() );
            groups[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerRoot  addgroups");
}






void ContainerRoot::addadaptationPrimitiveTypes(AdaptationPrimitiveType *ptr)
{
    PRINTF("BEGIN -- ContainerRoot addadaptationPrimitiveTypes");
    AdaptationPrimitiveType  *container = (AdaptationPrimitiveType *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addadaptationPrimitiveTypes " << endl;
    }else
    {

        if(adaptationPrimitiveTypes.find(container->internalGetKey()) == adaptationPrimitiveTypes.end())
        {
            PRINTF("KEY -- ContainerRoot adaptationPrimitiveTypes  "<< container->internalGetKey() );
            adaptationPrimitiveTypes[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ContainerRoot  addadaptationPrimitiveTypes");
}






void ContainerRoot::removenodes(ContainerNode *ptr)
{
    PRINTF("BEGIN -- ContainerRoot removenodes");
    ContainerNode *container = (ContainerNode*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for nodes");
    }
    else
    {
        PRINTF("KEY -- ContainerRoot nodes  "<< container->internalGetKey() );
        nodes.set_deleted_key(container->internalGetKey());
        nodes.erase( nodes.find(container->internalGetKey()));
        nodes.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerRoot removenodes");
}






void ContainerRoot::removetypeDefinitions(TypeDefinition *ptr)
{
    PRINTF("BEGIN -- ContainerRoot removetypeDefinitions");
    TypeDefinition *container = (TypeDefinition*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for typeDefinitions");
    }
    else
    {
        PRINTF("KEY -- ContainerRoot typeDefinitions  "<< container->internalGetKey() );
        typeDefinitions.set_deleted_key(container->internalGetKey());
        typeDefinitions.erase( typeDefinitions.find(container->internalGetKey()));
        typeDefinitions.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerRoot removetypeDefinitions");
}






void ContainerRoot::removerepositories(Repository *ptr)
{
    PRINTF("BEGIN -- ContainerRoot removerepositories");
    Repository *container = (Repository*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for repositories");
    }
    else
    {
        PRINTF("KEY -- ContainerRoot repositories  "<< container->internalGetKey() );
        repositories.set_deleted_key(container->internalGetKey());
        repositories.erase( repositories.find(container->internalGetKey()));
        repositories.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerRoot removerepositories");
}






void ContainerRoot::removedataTypes(TypedElement *ptr)
{
    PRINTF("BEGIN -- ContainerRoot removedataTypes");
    TypedElement *container = (TypedElement*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for dataTypes");
    }
    else
    {
        PRINTF("KEY -- ContainerRoot dataTypes  "<< container->internalGetKey() );
        dataTypes.set_deleted_key(container->internalGetKey());
        dataTypes.erase( dataTypes.find(container->internalGetKey()));
        dataTypes.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerRoot removedataTypes");
}






void ContainerRoot::removelibraries(TypeLibrary *ptr)
{
    PRINTF("BEGIN -- ContainerRoot removelibraries");
    TypeLibrary *container = (TypeLibrary*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for libraries");
    }
    else
    {
        PRINTF("KEY -- ContainerRoot libraries  "<< container->internalGetKey() );
        libraries.set_deleted_key(container->internalGetKey());
        libraries.erase( libraries.find(container->internalGetKey()));
        libraries.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerRoot removelibraries");
}






void ContainerRoot::removehubs(Channel *ptr)
{
    PRINTF("BEGIN -- ContainerRoot removehubs");
    Channel *container = (Channel*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for hubs");
    }
    else
    {
        PRINTF("KEY -- ContainerRoot hubs  "<< container->internalGetKey() );
        hubs.set_deleted_key(container->internalGetKey());
        hubs.erase( hubs.find(container->internalGetKey()));
        hubs.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerRoot removehubs");
}






void ContainerRoot::removemBindings(MBinding *ptr)
{
    PRINTF("BEGIN -- ContainerRoot removemBindings");
    MBinding *container = (MBinding*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for mBindings");
    }
    else
    {
        PRINTF("KEY -- ContainerRoot mBindings  "<< container->internalGetKey() );
        mBindings.set_deleted_key(container->internalGetKey());
        mBindings.erase( mBindings.find(container->internalGetKey()));
        mBindings.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerRoot removemBindings");
}






void ContainerRoot::removedeployUnits(DeployUnit *ptr)
{
    PRINTF("BEGIN -- ContainerRoot removedeployUnits");
    DeployUnit *container = (DeployUnit*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for deployUnits");
    }
    else
    {
        PRINTF("KEY -- ContainerRoot deployUnits  "<< container->internalGetKey() );
        deployUnits.set_deleted_key(container->internalGetKey());
        deployUnits.erase( deployUnits.find(container->internalGetKey()));
        deployUnits.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerRoot removedeployUnits");
}






void ContainerRoot::removenodeNetworks(NodeNetwork *ptr)
{
    PRINTF("BEGIN -- ContainerRoot removenodeNetworks");
    NodeNetwork *container = (NodeNetwork*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for nodeNetworks");
    }
    else
    {
        PRINTF("KEY -- ContainerRoot nodeNetworks  "<< container->internalGetKey() );
        nodeNetworks.set_deleted_key(container->internalGetKey());
        nodeNetworks.erase( nodeNetworks.find(container->internalGetKey()));
        nodeNetworks.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerRoot removenodeNetworks");
}






void ContainerRoot::removegroups(Group *ptr)
{
    PRINTF("BEGIN -- ContainerRoot removegroups");
    Group *container = (Group*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for groups");
    }
    else
    {
        PRINTF("KEY -- ContainerRoot groups  "<< container->internalGetKey() );
        groups.set_deleted_key(container->internalGetKey());
        groups.erase( groups.find(container->internalGetKey()));
        groups.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerRoot removegroups");
}






void ContainerRoot::removeadaptationPrimitiveTypes(AdaptationPrimitiveType *ptr)
{
    PRINTF("BEGIN -- ContainerRoot removeadaptationPrimitiveTypes");
    AdaptationPrimitiveType *container = (AdaptationPrimitiveType*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for adaptationPrimitiveTypes");
    }
    else
    {
        PRINTF("KEY -- ContainerRoot adaptationPrimitiveTypes  "<< container->internalGetKey() );
        adaptationPrimitiveTypes.set_deleted_key(container->internalGetKey());
        adaptationPrimitiveTypes.erase( adaptationPrimitiveTypes.find(container->internalGetKey()));
        adaptationPrimitiveTypes.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ContainerRoot removeadaptationPrimitiveTypes");
}


string ContainerRoot::metaClassName() {
return "ContainerRoot";
}
void ContainerRoot::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator ContainerRoot"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

if(refName.compare("nodes")==0){
if(mutatorType ==ADD){
addnodes((ContainerNode*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removenodes((ContainerNode*)AnyCast<ContainerNode*>(value));
}
} else if(refName.compare("typeDefinitions")==0){
if(mutatorType ==ADD){
addtypeDefinitions((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removetypeDefinitions((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
} else if(refName.compare("repositories")==0){
if(mutatorType ==ADD){
addrepositories((Repository*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removerepositories((Repository*)AnyCast<Repository*>(value));
}
} else if(refName.compare("dataTypes")==0){
if(mutatorType ==ADD){
adddataTypes((TypedElement*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedataTypes((TypedElement*)AnyCast<TypedElement*>(value));
}
} else if(refName.compare("libraries")==0){
if(mutatorType ==ADD){
addlibraries((TypeLibrary*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removelibraries((TypeLibrary*)AnyCast<TypeLibrary*>(value));
}
} else if(refName.compare("hubs")==0){
if(mutatorType ==ADD){
addhubs((Channel*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removehubs((Channel*)AnyCast<Channel*>(value));
}
} else if(refName.compare("mBindings")==0){
if(mutatorType ==ADD){
addmBindings((MBinding*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removemBindings((MBinding*)AnyCast<MBinding*>(value));
}
} else if(refName.compare("deployUnits")==0){
if(mutatorType ==ADD){
adddeployUnits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedeployUnits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("nodeNetworks")==0){
if(mutatorType ==ADD){
addnodeNetworks((NodeNetwork*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removenodeNetworks((NodeNetwork*)AnyCast<NodeNetwork*>(value));
}
} else if(refName.compare("groups")==0){
if(mutatorType ==ADD){
addgroups((Group*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removegroups((Group*)AnyCast<Group*>(value));
}
} else if(refName.compare("adaptationPrimitiveTypes")==0){
if(mutatorType ==ADD){
addadaptationPrimitiveTypes((AdaptationPrimitiveType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeadaptationPrimitiveTypes((AdaptationPrimitiveType*)AnyCast<AdaptationPrimitiveType*>(value));
}
}

PRINTF("END -- reflexiveMutator ContainerRoot "); 
}

KMFContainer* ContainerRoot::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID ContainerRoot" << relationName << " " << idP);
if(relationName.compare("nodes")== 0){
return (KMFContainer*)findnodesByID(idP);
}

if(relationName.compare("typeDefinitions")== 0){
return (KMFContainer*)findtypeDefinitionsByID(idP);
}

if(relationName.compare("repositories")== 0){
return (KMFContainer*)findrepositoriesByID(idP);
}

if(relationName.compare("dataTypes")== 0){
return (KMFContainer*)finddataTypesByID(idP);
}

if(relationName.compare("libraries")== 0){
return (KMFContainer*)findlibrariesByID(idP);
}

if(relationName.compare("hubs")== 0){
return (KMFContainer*)findhubsByID(idP);
}

if(relationName.compare("mBindings")== 0){
return (KMFContainer*)findmBindingsByID(idP);
}

if(relationName.compare("deployUnits")== 0){
return (KMFContainer*)finddeployUnitsByID(idP);
}

if(relationName.compare("nodeNetworks")== 0){
return (KMFContainer*)findnodeNetworksByID(idP);
}

if(relationName.compare("groups")== 0){
return (KMFContainer*)findgroupsByID(idP);
}

if(relationName.compare("adaptationPrimitiveTypes")== 0){
return (KMFContainer*)findadaptationPrimitiveTypesByID(idP);
}

PRINTF("END -- findByID ContainerRoot");
return NULL;

}





void ContainerRoot::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("ContainerRoot --> Visiting class ContainerRoot");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("nodes","org.kevoree.ContainerNode");
for ( google::dense_hash_map<string,ContainerNode*>::iterator it = nodes.begin();  it != nodes.end(); ++it)
{
    ContainerNode * current =(ContainerNode*) it->second;
    PRINTF("ContainerRoot --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"nodes");
}
visitor->endVisitRef("nodes");



visitor->beginVisitRef("typeDefinitions","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = typeDefinitions.begin();  it != typeDefinitions.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("ContainerRoot --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"typeDefinitions");
}
visitor->endVisitRef("typeDefinitions");



visitor->beginVisitRef("repositories","org.kevoree.Repository");
for ( google::dense_hash_map<string,Repository*>::iterator it = repositories.begin();  it != repositories.end(); ++it)
{
    Repository * current =(Repository*) it->second;
    PRINTF("ContainerRoot --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"repositories");
}
visitor->endVisitRef("repositories");



visitor->beginVisitRef("dataTypes","org.kevoree.TypedElement");
for ( google::dense_hash_map<string,TypedElement*>::iterator it = dataTypes.begin();  it != dataTypes.end(); ++it)
{
    TypedElement * current =(TypedElement*) it->second;
    PRINTF("ContainerRoot --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"dataTypes");
}
visitor->endVisitRef("dataTypes");



visitor->beginVisitRef("libraries","org.kevoree.TypeLibrary");
for ( google::dense_hash_map<string,TypeLibrary*>::iterator it = libraries.begin();  it != libraries.end(); ++it)
{
    TypeLibrary * current =(TypeLibrary*) it->second;
    PRINTF("ContainerRoot --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"libraries");
}
visitor->endVisitRef("libraries");



visitor->beginVisitRef("hubs","org.kevoree.Channel");
for ( google::dense_hash_map<string,Channel*>::iterator it = hubs.begin();  it != hubs.end(); ++it)
{
    Channel * current =(Channel*) it->second;
    PRINTF("ContainerRoot --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"hubs");
}
visitor->endVisitRef("hubs");



visitor->beginVisitRef("mBindings","org.kevoree.MBinding");
for ( google::dense_hash_map<string,MBinding*>::iterator it = mBindings.begin();  it != mBindings.end(); ++it)
{
    MBinding * current =(MBinding*) it->second;
    PRINTF("ContainerRoot --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"mBindings");
}
visitor->endVisitRef("mBindings");



visitor->beginVisitRef("deployUnits","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("ContainerRoot --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"deployUnits");
}
visitor->endVisitRef("deployUnits");



visitor->beginVisitRef("nodeNetworks","org.kevoree.NodeNetwork");
for ( google::dense_hash_map<string,NodeNetwork*>::iterator it = nodeNetworks.begin();  it != nodeNetworks.end(); ++it)
{
    NodeNetwork * current =(NodeNetwork*) it->second;
    PRINTF("ContainerRoot --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"nodeNetworks");
}
visitor->endVisitRef("nodeNetworks");



visitor->beginVisitRef("groups","org.kevoree.Group");
for ( google::dense_hash_map<string,Group*>::iterator it = groups.begin();  it != groups.end(); ++it)
{
    Group * current =(Group*) it->second;
    PRINTF("ContainerRoot --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"groups");
}
visitor->endVisitRef("groups");



visitor->beginVisitRef("adaptationPrimitiveTypes","org.kevoree.AdaptationPrimitiveType");
for ( google::dense_hash_map<string,AdaptationPrimitiveType*>::iterator it = adaptationPrimitiveTypes.begin();  it != adaptationPrimitiveTypes.end(); ++it)
{
    AdaptationPrimitiveType * current =(AdaptationPrimitiveType*) it->second;
    PRINTF("ContainerRoot --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"adaptationPrimitiveTypes");
}
visitor->endVisitRef("adaptationPrimitiveTypes");
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void ContainerRoot::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("ContainerRoot --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
ContainerRoot::ContainerRoot(){

nodes.set_empty_key("");
typeDefinitions.set_empty_key("");
repositories.set_empty_key("");
dataTypes.set_empty_key("");
libraries.set_empty_key("");
hubs.set_empty_key("");
mBindings.set_empty_key("");
deployUnits.set_empty_key("");
nodeNetworks.set_empty_key("");
groups.set_empty_key("");
adaptationPrimitiveTypes.set_empty_key("");

}

ContainerRoot::~ContainerRoot(){






for ( google::dense_hash_map<string,ContainerNode*>::iterator it = nodes.begin();  it != nodes.end(); ++it)
{
ContainerNode * current = it->second;
if(current != NULL)
{
    delete current;
}

}

nodes.clear();





for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = typeDefinitions.begin();  it != typeDefinitions.end(); ++it)
{
TypeDefinition * current = it->second;
if(current != NULL)
{
    delete current;
}

}

typeDefinitions.clear();





for ( google::dense_hash_map<string,Repository*>::iterator it = repositories.begin();  it != repositories.end(); ++it)
{
Repository * current = it->second;
if(current != NULL)
{
    delete current;
}

}

repositories.clear();





for ( google::dense_hash_map<string,TypedElement*>::iterator it = dataTypes.begin();  it != dataTypes.end(); ++it)
{
TypedElement * current = it->second;
if(current != NULL)
{
    delete current;
}

}

dataTypes.clear();





for ( google::dense_hash_map<string,TypeLibrary*>::iterator it = libraries.begin();  it != libraries.end(); ++it)
{
TypeLibrary * current = it->second;
if(current != NULL)
{
    delete current;
}

}

libraries.clear();





for ( google::dense_hash_map<string,Channel*>::iterator it = hubs.begin();  it != hubs.end(); ++it)
{
Channel * current = it->second;
if(current != NULL)
{
    delete current;
}

}

hubs.clear();





for ( google::dense_hash_map<string,MBinding*>::iterator it = mBindings.begin();  it != mBindings.end(); ++it)
{
MBinding * current = it->second;
if(current != NULL)
{
    delete current;
}

}

mBindings.clear();





for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
DeployUnit * current = it->second;
if(current != NULL)
{
    delete current;
}

}

deployUnits.clear();





for ( google::dense_hash_map<string,NodeNetwork*>::iterator it = nodeNetworks.begin();  it != nodeNetworks.end(); ++it)
{
NodeNetwork * current = it->second;
if(current != NULL)
{
    delete current;
}

}

nodeNetworks.clear();





for ( google::dense_hash_map<string,Group*>::iterator it = groups.begin();  it != groups.end(); ++it)
{
Group * current = it->second;
if(current != NULL)
{
    delete current;
}

}

groups.clear();





for ( google::dense_hash_map<string,AdaptationPrimitiveType*>::iterator it = adaptationPrimitiveTypes.begin();  it != adaptationPrimitiveTypes.end(); ++it)
{
AdaptationPrimitiveType * current = it->second;
if(current != NULL)
{
    delete current;
}

}

adaptationPrimitiveTypes.clear();


}

std::string PortType::internalGetKey(){
return name;
}
string PortType::metaClassName() {
return "PortType";
}
void PortType::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator PortType"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("factoryBean")==0){
factoryBean= AnyCast<string>(value);
} else if(refName.compare("bean")==0){
bean= AnyCast<string>(value);
} else if(refName.compare("abstract")==0){
if(AnyCast<string>(value).compare("true") == 0){
abstract= true;
}else { 
abstract= false;
}
} else if(refName.compare("synchrone")==0){
if(AnyCast<string>(value).compare("true") == 0){
synchrone= true;
}else { 
synchrone= false;
}
}

if(refName.compare("deployUnits")==0){
if(mutatorType ==ADD){
adddeployUnits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedeployUnits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("dictionaryType")==0){
if(mutatorType ==ADD){
adddictionaryType((DictionaryType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionaryType((DictionaryType*)AnyCast<DictionaryType*>(value));
}
} else if(refName.compare("superTypes")==0){
if(mutatorType ==ADD){
addsuperTypes((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesuperTypes((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
}

PRINTF("END -- reflexiveMutator PortType "); 
}

KMFContainer* PortType::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID PortType" << relationName << " " << idP);
if(relationName.compare("deployUnits")== 0){
return (KMFContainer*)finddeployUnitsByID(idP);
}

if(relationName.compare("dictionaryType")== 0){
return dictionaryType;
}

if(relationName.compare("superTypes")== 0){
return (KMFContainer*)findsuperTypesByID(idP);
}

PRINTF("END -- findByID PortType");
return NULL;

}





void PortType::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("PortType --> Visiting class PortType");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("deployUnits","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("PortType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"deployUnits");
}
visitor->endVisitRef("deployUnits");



visitor->beginVisitRef("superTypes","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = superTypes.begin();  it != superTypes.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("PortType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"superTypes");
}
visitor->endVisitRef("superTypes");
    }
    visitor->endVisitElem(this);
}


void PortType::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("PortType --> Visiting attribute -> synchrone");
visitor->visit(any(synchrone),"synchrone",this);
}
PortType::PortType(){


}

PortType::~PortType(){



}

std::string Port::internalGetKey(){
return generated_KMF_ID;
}
MBinding* Port::findbindingsByID(std::string id){
PRINTF("END -- findByID " <<bindings[id] << " ");
return bindings[id];
}




void Port::addbindings(MBinding *ptr)
{
    PRINTF("BEGIN -- Port addbindings");
    MBinding  *container = (MBinding *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addbindings " << endl;
    }else
    {

        if(bindings.find(container->internalGetKey()) == bindings.end())
        {
            PRINTF("KEY -- Port bindings  "<< container->internalGetKey() );
            bindings[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"bindings",ptr_any);
container->setEContainer(this,cmd,"bindings");

        }
    }
    PRINTF("END -- Port  addbindings");
}


void Port::addportTypeRef(PortTypeRef *ptr){
portTypeRef =ptr;
}





void Port::removebindings(MBinding *ptr)
{
    PRINTF("BEGIN -- Port removebindings");
    MBinding *container = (MBinding*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for bindings");
    }
    else
    {
        PRINTF("KEY -- Port bindings  "<< container->internalGetKey() );
        bindings.set_deleted_key(container->internalGetKey());
        bindings.erase( bindings.find(container->internalGetKey()));
        bindings.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- Port removebindings");
}


void Port::removeportTypeRef(PortTypeRef *ptr){
delete ptr;
}

string Port::metaClassName() {
return "Port";
}
void Port::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator Port"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

if(refName.compare("bindings")==0){
if(mutatorType ==ADD){
addbindings((MBinding*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removebindings((MBinding*)AnyCast<MBinding*>(value));
}
} else if(refName.compare("portTypeRef")==0){
if(mutatorType ==ADD){
addportTypeRef((PortTypeRef*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeportTypeRef((PortTypeRef*)AnyCast<PortTypeRef*>(value));
}
}

PRINTF("END -- reflexiveMutator Port "); 
}

KMFContainer* Port::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID Port" << relationName << " " << idP);
if(relationName.compare("bindings")== 0){
return (KMFContainer*)findbindingsByID(idP);
}

if(relationName.compare("portTypeRef")== 0){
return portTypeRef;
}

PRINTF("END -- findByID Port");
return NULL;

}





void Port::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("Port --> Visiting class Port");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("bindings","org.kevoree.MBinding");
for ( google::dense_hash_map<string,MBinding*>::iterator it = bindings.begin();  it != bindings.end(); ++it)
{
    MBinding * current =(MBinding*) it->second;
    PRINTF("Port --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"bindings");
}
visitor->endVisitRef("bindings");
    }
    visitor->endVisitElem(this);
}


void Port::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("Port --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
Port::Port(){

bindings.set_empty_key("");

}

Port::~Port(){



}

std::string _Namespace::internalGetKey(){
return name;
}
_Namespace* _Namespace::findchildsByID(std::string id){
PRINTF("END -- findByID " <<childs[id] << " ");
return childs[id];
}




void _Namespace::addchilds(_Namespace *ptr)
{
    PRINTF("BEGIN -- _Namespace addchilds");
    _Namespace  *container = (_Namespace *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addchilds " << endl;
    }else
    {

        if(childs.find(container->internalGetKey()) == childs.end())
        {
            PRINTF("KEY -- _Namespace childs  "<< container->internalGetKey() );
            childs[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- _Namespace  addchilds");
}


void _Namespace::addparent(_Namespace *ptr){
parent =ptr;
}





void _Namespace::removechilds(_Namespace *ptr)
{
    PRINTF("BEGIN -- _Namespace removechilds");
    _Namespace *container = (_Namespace*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for childs");
    }
    else
    {
        PRINTF("KEY -- _Namespace childs  "<< container->internalGetKey() );
        childs.set_deleted_key(container->internalGetKey());
        childs.erase( childs.find(container->internalGetKey()));
        childs.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- _Namespace removechilds");
}


void _Namespace::removeparent(_Namespace *ptr){
delete ptr;
}

string _Namespace::metaClassName() {
return "_Namespace";
}
void _Namespace::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator _Namespace"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
}

if(refName.compare("childs")==0){
if(mutatorType ==ADD){
addchilds((_Namespace*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removechilds((_Namespace*)AnyCast<_Namespace*>(value));
}
} else if(refName.compare("parent")==0){
if(mutatorType ==ADD){
addparent((_Namespace*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeparent((_Namespace*)AnyCast<_Namespace*>(value));
}
}

PRINTF("END -- reflexiveMutator _Namespace "); 
}

KMFContainer* _Namespace::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID _Namespace" << relationName << " " << idP);
if(relationName.compare("childs")== 0){
return (KMFContainer*)findchildsByID(idP);
}

if(relationName.compare("parent")== 0){
return parent;
}

PRINTF("END -- findByID _Namespace");
return NULL;

}





void _Namespace::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("_Namespace --> Visiting class _Namespace");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("childs","org.kevoree._Namespace");
for ( google::dense_hash_map<string,_Namespace*>::iterator it = childs.begin();  it != childs.end(); ++it)
{
    _Namespace * current =(_Namespace*) it->second;
    PRINTF("_Namespace --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"childs");
}
visitor->endVisitRef("childs");
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void _Namespace::visitAttributes(ModelAttributeVisitor *visitor){
}
_Namespace::_Namespace(){

childs.set_empty_key("");

}

_Namespace::~_Namespace(){






for ( google::dense_hash_map<string,_Namespace*>::iterator it = childs.begin();  it != childs.end(); ++it)
{
_Namespace * current = it->second;
if(current != NULL)
{
    delete current;
}

}

childs.clear();


}

std::string Dictionary::internalGetKey(){
return generated_KMF_ID;
}
DictionaryValue* Dictionary::findvaluesByID(std::string id){
PRINTF("END -- findByID " <<values[id] << " ");
return values[id];
}




void Dictionary::addvalues(DictionaryValue *ptr)
{
    PRINTF("BEGIN -- Dictionary addvalues");
    DictionaryValue  *container = (DictionaryValue *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addvalues " << endl;
    }else
    {

        if(values.find(container->internalGetKey()) == values.end())
        {
            PRINTF("KEY -- Dictionary values  "<< container->internalGetKey() );
            values[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- Dictionary  addvalues");
}






void Dictionary::removevalues(DictionaryValue *ptr)
{
    PRINTF("BEGIN -- Dictionary removevalues");
    DictionaryValue *container = (DictionaryValue*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for values");
    }
    else
    {
        PRINTF("KEY -- Dictionary values  "<< container->internalGetKey() );
        values.set_deleted_key(container->internalGetKey());
        values.erase( values.find(container->internalGetKey()));
        values.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- Dictionary removevalues");
}


string Dictionary::metaClassName() {
return "Dictionary";
}
void Dictionary::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator Dictionary"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

if(refName.compare("values")==0){
if(mutatorType ==ADD){
addvalues((DictionaryValue*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removevalues((DictionaryValue*)AnyCast<DictionaryValue*>(value));
}
}

PRINTF("END -- reflexiveMutator Dictionary "); 
}

KMFContainer* Dictionary::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID Dictionary" << relationName << " " << idP);
if(relationName.compare("values")== 0){
return (KMFContainer*)findvaluesByID(idP);
}

PRINTF("END -- findByID Dictionary");
return NULL;

}





void Dictionary::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("Dictionary --> Visiting class Dictionary");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("values","org.kevoree.DictionaryValue");
for ( google::dense_hash_map<string,DictionaryValue*>::iterator it = values.begin();  it != values.end(); ++it)
{
    DictionaryValue * current =(DictionaryValue*) it->second;
    PRINTF("Dictionary --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"values");
}
visitor->endVisitRef("values");
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void Dictionary::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("Dictionary --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
Dictionary::Dictionary(){

values.set_empty_key("");

}

Dictionary::~Dictionary(){






for ( google::dense_hash_map<string,DictionaryValue*>::iterator it = values.begin();  it != values.end(); ++it)
{
DictionaryValue * current = it->second;
if(current != NULL)
{
    delete current;
}

}

values.clear();


}

std::string DictionaryType::internalGetKey(){
return generated_KMF_ID;
}
DictionaryAttribute* DictionaryType::findattributesByID(std::string id){
PRINTF("END -- findByID " <<attributes[id] << " ");
return attributes[id];
}
DictionaryValue* DictionaryType::finddefaultValuesByID(std::string id){
PRINTF("END -- findByID " <<defaultValues[id] << " ");
return defaultValues[id];
}




void DictionaryType::addattributes(DictionaryAttribute *ptr)
{
    PRINTF("BEGIN -- DictionaryType addattributes");
    DictionaryAttribute  *container = (DictionaryAttribute *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addattributes " << endl;
    }else
    {

        if(attributes.find(container->internalGetKey()) == attributes.end())
        {
            PRINTF("KEY -- DictionaryType attributes  "<< container->internalGetKey() );
            attributes[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- DictionaryType  addattributes");
}






void DictionaryType::adddefaultValues(DictionaryValue *ptr)
{
    PRINTF("BEGIN -- DictionaryType adddefaultValues");
    DictionaryValue  *container = (DictionaryValue *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY adddefaultValues " << endl;
    }else
    {

        if(defaultValues.find(container->internalGetKey()) == defaultValues.end())
        {
            PRINTF("KEY -- DictionaryType defaultValues  "<< container->internalGetKey() );
            defaultValues[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- DictionaryType  adddefaultValues");
}






void DictionaryType::removeattributes(DictionaryAttribute *ptr)
{
    PRINTF("BEGIN -- DictionaryType removeattributes");
    DictionaryAttribute *container = (DictionaryAttribute*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for attributes");
    }
    else
    {
        PRINTF("KEY -- DictionaryType attributes  "<< container->internalGetKey() );
        attributes.set_deleted_key(container->internalGetKey());
        attributes.erase( attributes.find(container->internalGetKey()));
        attributes.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- DictionaryType removeattributes");
}






void DictionaryType::removedefaultValues(DictionaryValue *ptr)
{
    PRINTF("BEGIN -- DictionaryType removedefaultValues");
    DictionaryValue *container = (DictionaryValue*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for defaultValues");
    }
    else
    {
        PRINTF("KEY -- DictionaryType defaultValues  "<< container->internalGetKey() );
        defaultValues.set_deleted_key(container->internalGetKey());
        defaultValues.erase( defaultValues.find(container->internalGetKey()));
        defaultValues.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- DictionaryType removedefaultValues");
}


string DictionaryType::metaClassName() {
return "DictionaryType";
}
void DictionaryType::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator DictionaryType"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

if(refName.compare("attributes")==0){
if(mutatorType ==ADD){
addattributes((DictionaryAttribute*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeattributes((DictionaryAttribute*)AnyCast<DictionaryAttribute*>(value));
}
} else if(refName.compare("defaultValues")==0){
if(mutatorType ==ADD){
adddefaultValues((DictionaryValue*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedefaultValues((DictionaryValue*)AnyCast<DictionaryValue*>(value));
}
}

PRINTF("END -- reflexiveMutator DictionaryType "); 
}

KMFContainer* DictionaryType::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID DictionaryType" << relationName << " " << idP);
if(relationName.compare("attributes")== 0){
return (KMFContainer*)findattributesByID(idP);
}

if(relationName.compare("defaultValues")== 0){
return (KMFContainer*)finddefaultValuesByID(idP);
}

PRINTF("END -- findByID DictionaryType");
return NULL;

}





void DictionaryType::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("DictionaryType --> Visiting class DictionaryType");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("attributes","org.kevoree.DictionaryAttribute");
for ( google::dense_hash_map<string,DictionaryAttribute*>::iterator it = attributes.begin();  it != attributes.end(); ++it)
{
    DictionaryAttribute * current =(DictionaryAttribute*) it->second;
    PRINTF("DictionaryType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"attributes");
}
visitor->endVisitRef("attributes");



visitor->beginVisitRef("defaultValues","org.kevoree.DictionaryValue");
for ( google::dense_hash_map<string,DictionaryValue*>::iterator it = defaultValues.begin();  it != defaultValues.end(); ++it)
{
    DictionaryValue * current =(DictionaryValue*) it->second;
    PRINTF("DictionaryType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"defaultValues");
}
visitor->endVisitRef("defaultValues");
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void DictionaryType::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("DictionaryType --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
DictionaryType::DictionaryType(){

attributes.set_empty_key("");
defaultValues.set_empty_key("");

}

DictionaryType::~DictionaryType(){






for ( google::dense_hash_map<string,DictionaryAttribute*>::iterator it = attributes.begin();  it != attributes.end(); ++it)
{
DictionaryAttribute * current = it->second;
if(current != NULL)
{
    delete current;
}

}

attributes.clear();





for ( google::dense_hash_map<string,DictionaryValue*>::iterator it = defaultValues.begin();  it != defaultValues.end(); ++it)
{
DictionaryValue * current = it->second;
if(current != NULL)
{
    delete current;
}

}

defaultValues.clear();


}

std::string DictionaryAttribute::internalGetKey(){
return name;
}
string DictionaryAttribute::metaClassName() {
return "DictionaryAttribute";
}
void DictionaryAttribute::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator DictionaryAttribute"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("optional")==0){
if(AnyCast<string>(value).compare("true") == 0){
optional= true;
}else { 
optional= false;
}
} else if(refName.compare("state")==0){
if(AnyCast<string>(value).compare("true") == 0){
state= true;
}else { 
state= false;
}
} else if(refName.compare("datatype")==0){
datatype= AnyCast<string>(value);
} else if(refName.compare("fragmentDependant")==0){
if(AnyCast<string>(value).compare("true") == 0){
fragmentDependant= true;
}else { 
fragmentDependant= false;
}
}

if(refName.compare("genericTypes")==0){
if(mutatorType ==ADD){
addgenericTypes((TypedElement*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removegenericTypes((TypedElement*)AnyCast<TypedElement*>(value));
}
}

PRINTF("END -- reflexiveMutator DictionaryAttribute "); 
}

KMFContainer* DictionaryAttribute::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID DictionaryAttribute" << relationName << " " << idP);
if(relationName.compare("genericTypes")== 0){
return (KMFContainer*)findgenericTypesByID(idP);
}

PRINTF("END -- findByID DictionaryAttribute");
return NULL;

}





void DictionaryAttribute::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("DictionaryAttribute --> Visiting class DictionaryAttribute");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("genericTypes","org.kevoree.TypedElement");
for ( google::dense_hash_map<string,TypedElement*>::iterator it = genericTypes.begin();  it != genericTypes.end(); ++it)
{
    TypedElement * current =(TypedElement*) it->second;
    PRINTF("DictionaryAttribute --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"genericTypes");
}
visitor->endVisitRef("genericTypes");
    }
    visitor->endVisitElem(this);
}


void DictionaryAttribute::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("DictionaryAttribute --> Visiting attribute -> optional");
visitor->visit(any(optional),"optional",this);
PRINTF("DictionaryAttribute --> Visiting attribute -> state");
visitor->visit(any(state),"state",this);
PRINTF("DictionaryAttribute --> Visiting attribute -> datatype");
visitor->visit(any(datatype),"datatype",this);
PRINTF("DictionaryAttribute --> Visiting attribute -> fragmentDependant");
visitor->visit(any(fragmentDependant),"fragmentDependant",this);
}
DictionaryAttribute::DictionaryAttribute(){


}

DictionaryAttribute::~DictionaryAttribute(){



}

std::string DictionaryValue::internalGetKey(){
return generated_KMF_ID;
}
void DictionaryValue::addattribute(DictionaryAttribute *ptr){
attribute =ptr;
}

void DictionaryValue::addtargetNode(ContainerNode *ptr){
targetNode =ptr;
}

void DictionaryValue::removeattribute(DictionaryAttribute *ptr){
delete ptr;
}

void DictionaryValue::removetargetNode(ContainerNode *ptr){
delete ptr;
}

string DictionaryValue::metaClassName() {
return "DictionaryValue";
}
void DictionaryValue::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator DictionaryValue"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("value")==0){
value= AnyCast<string>(value);
} else if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

if(refName.compare("attribute")==0){
if(mutatorType ==ADD){
addattribute((DictionaryAttribute*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeattribute((DictionaryAttribute*)AnyCast<DictionaryAttribute*>(value));
}
} else if(refName.compare("targetNode")==0){
if(mutatorType ==ADD){
addtargetNode((ContainerNode*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removetargetNode((ContainerNode*)AnyCast<ContainerNode*>(value));
}
}

PRINTF("END -- reflexiveMutator DictionaryValue "); 
}

KMFContainer* DictionaryValue::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID DictionaryValue" << relationName << " " << idP);
if(relationName.compare("attribute")== 0){
return attribute;
}

if(relationName.compare("targetNode")== 0){
return targetNode;
}

PRINTF("END -- findByID DictionaryValue");
return NULL;

}





void DictionaryValue::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("DictionaryValue --> Visiting class DictionaryValue");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void DictionaryValue::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("DictionaryValue --> Visiting attribute -> value");
visitor->visit(any(value),"value",this);
PRINTF("DictionaryValue --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
DictionaryValue::DictionaryValue(){


}

DictionaryValue::~DictionaryValue(){



}

std::string CompositeType::internalGetKey(){
return name;
}
ComponentType* CompositeType::findchildsByID(std::string id){
PRINTF("END -- findByID " <<childs[id] << " ");
return childs[id];
}
Wire* CompositeType::findwiresByID(std::string id){
PRINTF("END -- findByID " <<wires[id] << " ");
return wires[id];
}




void CompositeType::addchilds(ComponentType *ptr)
{
    PRINTF("BEGIN -- CompositeType addchilds");
    ComponentType  *container = (ComponentType *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addchilds " << endl;
    }else
    {

        if(childs.find(container->internalGetKey()) == childs.end())
        {
            PRINTF("KEY -- CompositeType childs  "<< container->internalGetKey() );
            childs[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"childs",ptr_any);
container->setEContainer(this,cmd,"childs");

        }
    }
    PRINTF("END -- CompositeType  addchilds");
}






void CompositeType::addwires(Wire *ptr)
{
    PRINTF("BEGIN -- CompositeType addwires");
    Wire  *container = (Wire *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addwires " << endl;
    }else
    {

        if(wires.find(container->internalGetKey()) == wires.end())
        {
            PRINTF("KEY -- CompositeType wires  "<< container->internalGetKey() );
            wires[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- CompositeType  addwires");
}






void CompositeType::removechilds(ComponentType *ptr)
{
    PRINTF("BEGIN -- CompositeType removechilds");
    ComponentType *container = (ComponentType*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for childs");
    }
    else
    {
        PRINTF("KEY -- CompositeType childs  "<< container->internalGetKey() );
        childs.set_deleted_key(container->internalGetKey());
        childs.erase( childs.find(container->internalGetKey()));
        childs.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- CompositeType removechilds");
}






void CompositeType::removewires(Wire *ptr)
{
    PRINTF("BEGIN -- CompositeType removewires");
    Wire *container = (Wire*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for wires");
    }
    else
    {
        PRINTF("KEY -- CompositeType wires  "<< container->internalGetKey() );
        wires.set_deleted_key(container->internalGetKey());
        wires.erase( wires.find(container->internalGetKey()));
        wires.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- CompositeType removewires");
}


string CompositeType::metaClassName() {
return "CompositeType";
}
void CompositeType::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator CompositeType"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("factoryBean")==0){
factoryBean= AnyCast<string>(value);
} else if(refName.compare("bean")==0){
bean= AnyCast<string>(value);
} else if(refName.compare("abstract")==0){
if(AnyCast<string>(value).compare("true") == 0){
abstract= true;
}else { 
abstract= false;
}
} else if(refName.compare("startMethod")==0){
startMethod= AnyCast<string>(value);
} else if(refName.compare("stopMethod")==0){
stopMethod= AnyCast<string>(value);
} else if(refName.compare("updateMethod")==0){
updateMethod= AnyCast<string>(value);
}

if(refName.compare("deployUnits")==0){
if(mutatorType ==ADD){
adddeployUnits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedeployUnits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("dictionaryType")==0){
if(mutatorType ==ADD){
adddictionaryType((DictionaryType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionaryType((DictionaryType*)AnyCast<DictionaryType*>(value));
}
} else if(refName.compare("superTypes")==0){
if(mutatorType ==ADD){
addsuperTypes((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesuperTypes((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
} else if(refName.compare("required")==0){
if(mutatorType ==ADD){
addrequired((PortTypeRef*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removerequired((PortTypeRef*)AnyCast<PortTypeRef*>(value));
}
} else if(refName.compare("integrationPatterns")==0){
if(mutatorType ==ADD){
addintegrationPatterns((IntegrationPattern*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeintegrationPatterns((IntegrationPattern*)AnyCast<IntegrationPattern*>(value));
}
} else if(refName.compare("extraFonctionalProperties")==0){
if(mutatorType ==ADD){
addextraFonctionalProperties((ExtraFonctionalProperty*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeextraFonctionalProperties((ExtraFonctionalProperty*)AnyCast<ExtraFonctionalProperty*>(value));
}
} else if(refName.compare("provided")==0){
if(mutatorType ==ADD){
addprovided((PortTypeRef*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeprovided((PortTypeRef*)AnyCast<PortTypeRef*>(value));
}
} else if(refName.compare("childs")==0){
if(mutatorType ==ADD){
addchilds((ComponentType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removechilds((ComponentType*)AnyCast<ComponentType*>(value));
}
} else if(refName.compare("wires")==0){
if(mutatorType ==ADD){
addwires((Wire*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removewires((Wire*)AnyCast<Wire*>(value));
}
}

PRINTF("END -- reflexiveMutator CompositeType "); 
}

KMFContainer* CompositeType::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID CompositeType" << relationName << " " << idP);
if(relationName.compare("deployUnits")== 0){
return (KMFContainer*)finddeployUnitsByID(idP);
}

if(relationName.compare("dictionaryType")== 0){
return dictionaryType;
}

if(relationName.compare("superTypes")== 0){
return (KMFContainer*)findsuperTypesByID(idP);
}

if(relationName.compare("required")== 0){
return (KMFContainer*)findrequiredByID(idP);
}

if(relationName.compare("integrationPatterns")== 0){
return (KMFContainer*)findintegrationPatternsByID(idP);
}

if(relationName.compare("extraFonctionalProperties")== 0){
return extraFonctionalProperties;
}

if(relationName.compare("provided")== 0){
return (KMFContainer*)findprovidedByID(idP);
}

if(relationName.compare("childs")== 0){
return (KMFContainer*)findchildsByID(idP);
}

if(relationName.compare("wires")== 0){
return (KMFContainer*)findwiresByID(idP);
}

PRINTF("END -- findByID CompositeType");
return NULL;

}





void CompositeType::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("CompositeType --> Visiting class CompositeType");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("required","org.kevoree.PortTypeRef");
for ( google::dense_hash_map<string,PortTypeRef*>::iterator it = required.begin();  it != required.end(); ++it)
{
    PortTypeRef * current =(PortTypeRef*) it->second;
    PRINTF("CompositeType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"required");
}
visitor->endVisitRef("required");



visitor->beginVisitRef("integrationPatterns","org.kevoree.IntegrationPattern");
for ( google::dense_hash_map<string,IntegrationPattern*>::iterator it = integrationPatterns.begin();  it != integrationPatterns.end(); ++it)
{
    IntegrationPattern * current =(IntegrationPattern*) it->second;
    PRINTF("CompositeType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"integrationPatterns");
}
visitor->endVisitRef("integrationPatterns");



visitor->beginVisitRef("provided","org.kevoree.PortTypeRef");
for ( google::dense_hash_map<string,PortTypeRef*>::iterator it = provided.begin();  it != provided.end(); ++it)
{
    PortTypeRef * current =(PortTypeRef*) it->second;
    PRINTF("CompositeType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"provided");
}
visitor->endVisitRef("provided");



visitor->beginVisitRef("wires","org.kevoree.Wire");
for ( google::dense_hash_map<string,Wire*>::iterator it = wires.begin();  it != wires.end(); ++it)
{
    Wire * current =(Wire*) it->second;
    PRINTF("CompositeType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"wires");
}
visitor->endVisitRef("wires");
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("deployUnits","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("CompositeType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"deployUnits");
}
visitor->endVisitRef("deployUnits");



visitor->beginVisitRef("superTypes","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = superTypes.begin();  it != superTypes.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("CompositeType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"superTypes");
}
visitor->endVisitRef("superTypes");



visitor->beginVisitRef("childs","org.kevoree.ComponentType");
for ( google::dense_hash_map<string,ComponentType*>::iterator it = childs.begin();  it != childs.end(); ++it)
{
    ComponentType * current =(ComponentType*) it->second;
    PRINTF("CompositeType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"childs");
}
visitor->endVisitRef("childs");
    }
    visitor->endVisitElem(this);
}


void CompositeType::visitAttributes(ModelAttributeVisitor *visitor){
}
CompositeType::CompositeType(){

childs.set_empty_key("");
wires.set_empty_key("");

}

CompositeType::~CompositeType(){






for ( google::dense_hash_map<string,PortTypeRef*>::iterator it = required.begin();  it != required.end(); ++it)
{
PortTypeRef * current = it->second;
if(current != NULL)
{
    delete current;
}

}

required.clear();





for ( google::dense_hash_map<string,IntegrationPattern*>::iterator it = integrationPatterns.begin();  it != integrationPatterns.end(); ++it)
{
IntegrationPattern * current = it->second;
if(current != NULL)
{
    delete current;
}

}

integrationPatterns.clear();





for ( google::dense_hash_map<string,PortTypeRef*>::iterator it = provided.begin();  it != provided.end(); ++it)
{
PortTypeRef * current = it->second;
if(current != NULL)
{
    delete current;
}

}

provided.clear();





for ( google::dense_hash_map<string,Wire*>::iterator it = wires.begin();  it != wires.end(); ++it)
{
Wire * current = it->second;
if(current != NULL)
{
    delete current;
}

}

wires.clear();


}

std::string PortTypeRef::internalGetKey(){
return name;
}
PortTypeMapping* PortTypeRef::findmappingsByID(std::string id){
PRINTF("END -- findByID " <<mappings[id] << " ");
return mappings[id];
}
void PortTypeRef::addref(PortType *ptr){
ref =ptr;
}





void PortTypeRef::addmappings(PortTypeMapping *ptr)
{
    PRINTF("BEGIN -- PortTypeRef addmappings");
    PortTypeMapping  *container = (PortTypeMapping *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addmappings " << endl;
    }else
    {

        if(mappings.find(container->internalGetKey()) == mappings.end())
        {
            PRINTF("KEY -- PortTypeRef mappings  "<< container->internalGetKey() );
            mappings[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- PortTypeRef  addmappings");
}


void PortTypeRef::removeref(PortType *ptr){
delete ptr;
}





void PortTypeRef::removemappings(PortTypeMapping *ptr)
{
    PRINTF("BEGIN -- PortTypeRef removemappings");
    PortTypeMapping *container = (PortTypeMapping*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for mappings");
    }
    else
    {
        PRINTF("KEY -- PortTypeRef mappings  "<< container->internalGetKey() );
        mappings.set_deleted_key(container->internalGetKey());
        mappings.erase( mappings.find(container->internalGetKey()));
        mappings.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- PortTypeRef removemappings");
}


string PortTypeRef::metaClassName() {
return "PortTypeRef";
}
void PortTypeRef::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator PortTypeRef"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("optional")==0){
short f;
Utils::from_string<short>(f, AnyCast<string>(value), std::dec);
optional= f;
} else if(refName.compare("noDependency")==0){
short f;
Utils::from_string<short>(f, AnyCast<string>(value), std::dec);
noDependency= f;
}

if(refName.compare("ref")==0){
if(mutatorType ==ADD){
addref((PortType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeref((PortType*)AnyCast<PortType*>(value));
}
} else if(refName.compare("mappings")==0){
if(mutatorType ==ADD){
addmappings((PortTypeMapping*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removemappings((PortTypeMapping*)AnyCast<PortTypeMapping*>(value));
}
}

PRINTF("END -- reflexiveMutator PortTypeRef "); 
}

KMFContainer* PortTypeRef::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID PortTypeRef" << relationName << " " << idP);
if(relationName.compare("ref")== 0){
return ref;
}

if(relationName.compare("mappings")== 0){
return (KMFContainer*)findmappingsByID(idP);
}

PRINTF("END -- findByID PortTypeRef");
return NULL;

}





void PortTypeRef::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("PortTypeRef --> Visiting class PortTypeRef");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("mappings","org.kevoree.PortTypeMapping");
for ( google::dense_hash_map<string,PortTypeMapping*>::iterator it = mappings.begin();  it != mappings.end(); ++it)
{
    PortTypeMapping * current =(PortTypeMapping*) it->second;
    PRINTF("PortTypeRef --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"mappings");
}
visitor->endVisitRef("mappings");
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void PortTypeRef::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("PortTypeRef --> Visiting attribute -> optional");
visitor->visit(any(optional),"optional",this);
PRINTF("PortTypeRef --> Visiting attribute -> noDependency");
visitor->visit(any(noDependency),"noDependency",this);
}
PortTypeRef::PortTypeRef(){

mappings.set_empty_key("");

}

PortTypeRef::~PortTypeRef(){






for ( google::dense_hash_map<string,PortTypeMapping*>::iterator it = mappings.begin();  it != mappings.end(); ++it)
{
PortTypeMapping * current = it->second;
if(current != NULL)
{
    delete current;
}

}

mappings.clear();


}

std::string Wire::internalGetKey(){
return generated_KMF_ID;
}
void Wire::addports(PortTypeRef *ptr){
ports =ptr;
}

void Wire::removeports(PortTypeRef *ptr){
delete ptr;
}

string Wire::metaClassName() {
return "Wire";
}
void Wire::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator Wire"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

if(refName.compare("ports")==0){
if(mutatorType ==ADD){
addports((PortTypeRef*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeports((PortTypeRef*)AnyCast<PortTypeRef*>(value));
}
}

PRINTF("END -- reflexiveMutator Wire "); 
}

KMFContainer* Wire::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID Wire" << relationName << " " << idP);
if(relationName.compare("ports")== 0){
return ports;
}

PRINTF("END -- findByID Wire");
return NULL;

}





void Wire::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("Wire --> Visiting class Wire");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void Wire::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("Wire --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
Wire::Wire(){


}

Wire::~Wire(){



}

std::string ServicePortType::internalGetKey(){
return name;
}
Operation* ServicePortType::findoperationsByID(std::string id){
PRINTF("END -- findByID " <<operations[id] << " ");
return operations[id];
}




void ServicePortType::addoperations(Operation *ptr)
{
    PRINTF("BEGIN -- ServicePortType addoperations");
    Operation  *container = (Operation *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addoperations " << endl;
    }else
    {

        if(operations.find(container->internalGetKey()) == operations.end())
        {
            PRINTF("KEY -- ServicePortType operations  "<< container->internalGetKey() );
            operations[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- ServicePortType  addoperations");
}






void ServicePortType::removeoperations(Operation *ptr)
{
    PRINTF("BEGIN -- ServicePortType removeoperations");
    Operation *container = (Operation*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for operations");
    }
    else
    {
        PRINTF("KEY -- ServicePortType operations  "<< container->internalGetKey() );
        operations.set_deleted_key(container->internalGetKey());
        operations.erase( operations.find(container->internalGetKey()));
        operations.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ServicePortType removeoperations");
}


string ServicePortType::metaClassName() {
return "ServicePortType";
}
void ServicePortType::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator ServicePortType"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("factoryBean")==0){
factoryBean= AnyCast<string>(value);
} else if(refName.compare("bean")==0){
bean= AnyCast<string>(value);
} else if(refName.compare("abstract")==0){
if(AnyCast<string>(value).compare("true") == 0){
abstract= true;
}else { 
abstract= false;
}
} else if(refName.compare("synchrone")==0){
if(AnyCast<string>(value).compare("true") == 0){
synchrone= true;
}else { 
synchrone= false;
}
} else if(refName.compare("interface")==0){
interface= AnyCast<string>(value);
}

if(refName.compare("deployUnits")==0){
if(mutatorType ==ADD){
adddeployUnits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedeployUnits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("dictionaryType")==0){
if(mutatorType ==ADD){
adddictionaryType((DictionaryType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionaryType((DictionaryType*)AnyCast<DictionaryType*>(value));
}
} else if(refName.compare("superTypes")==0){
if(mutatorType ==ADD){
addsuperTypes((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesuperTypes((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
} else if(refName.compare("operations")==0){
if(mutatorType ==ADD){
addoperations((Operation*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeoperations((Operation*)AnyCast<Operation*>(value));
}
}

PRINTF("END -- reflexiveMutator ServicePortType "); 
}

KMFContainer* ServicePortType::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID ServicePortType" << relationName << " " << idP);
if(relationName.compare("deployUnits")== 0){
return (KMFContainer*)finddeployUnitsByID(idP);
}

if(relationName.compare("dictionaryType")== 0){
return dictionaryType;
}

if(relationName.compare("superTypes")== 0){
return (KMFContainer*)findsuperTypesByID(idP);
}

if(relationName.compare("operations")== 0){
return (KMFContainer*)findoperationsByID(idP);
}

PRINTF("END -- findByID ServicePortType");
return NULL;

}





void ServicePortType::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("ServicePortType --> Visiting class ServicePortType");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("operations","org.kevoree.Operation");
for ( google::dense_hash_map<string,Operation*>::iterator it = operations.begin();  it != operations.end(); ++it)
{
    Operation * current =(Operation*) it->second;
    PRINTF("ServicePortType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"operations");
}
visitor->endVisitRef("operations");
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("deployUnits","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("ServicePortType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"deployUnits");
}
visitor->endVisitRef("deployUnits");



visitor->beginVisitRef("superTypes","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = superTypes.begin();  it != superTypes.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("ServicePortType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"superTypes");
}
visitor->endVisitRef("superTypes");
    }
    visitor->endVisitElem(this);
}


void ServicePortType::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("ServicePortType --> Visiting attribute -> interface");
visitor->visit(any(interface),"interface",this);
}
ServicePortType::ServicePortType(){

operations.set_empty_key("");

}

ServicePortType::~ServicePortType(){






for ( google::dense_hash_map<string,Operation*>::iterator it = operations.begin();  it != operations.end(); ++it)
{
Operation * current = it->second;
if(current != NULL)
{
    delete current;
}

}

operations.clear();


}

std::string Operation::internalGetKey(){
return name;
}
Parameter* Operation::findparametersByID(std::string id){
PRINTF("END -- findByID " <<parameters[id] << " ");
return parameters[id];
}




void Operation::addparameters(Parameter *ptr)
{
    PRINTF("BEGIN -- Operation addparameters");
    Parameter  *container = (Parameter *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addparameters " << endl;
    }else
    {

        if(parameters.find(container->internalGetKey()) == parameters.end())
        {
            PRINTF("KEY -- Operation parameters  "<< container->internalGetKey() );
            parameters[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- Operation  addparameters");
}


void Operation::addreturnType(TypedElement *ptr){
returnType =ptr;
}





void Operation::removeparameters(Parameter *ptr)
{
    PRINTF("BEGIN -- Operation removeparameters");
    Parameter *container = (Parameter*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for parameters");
    }
    else
    {
        PRINTF("KEY -- Operation parameters  "<< container->internalGetKey() );
        parameters.set_deleted_key(container->internalGetKey());
        parameters.erase( parameters.find(container->internalGetKey()));
        parameters.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- Operation removeparameters");
}


void Operation::removereturnType(TypedElement *ptr){
delete ptr;
}

string Operation::metaClassName() {
return "Operation";
}
void Operation::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator Operation"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
}

if(refName.compare("parameters")==0){
if(mutatorType ==ADD){
addparameters((Parameter*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeparameters((Parameter*)AnyCast<Parameter*>(value));
}
} else if(refName.compare("returnType")==0){
if(mutatorType ==ADD){
addreturnType((TypedElement*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removereturnType((TypedElement*)AnyCast<TypedElement*>(value));
}
}

PRINTF("END -- reflexiveMutator Operation "); 
}

KMFContainer* Operation::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID Operation" << relationName << " " << idP);
if(relationName.compare("parameters")== 0){
return (KMFContainer*)findparametersByID(idP);
}

if(relationName.compare("returnType")== 0){
return returnType;
}

PRINTF("END -- findByID Operation");
return NULL;

}





void Operation::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("Operation --> Visiting class Operation");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("parameters","org.kevoree.Parameter");
for ( google::dense_hash_map<string,Parameter*>::iterator it = parameters.begin();  it != parameters.end(); ++it)
{
    Parameter * current =(Parameter*) it->second;
    PRINTF("Operation --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"parameters");
}
visitor->endVisitRef("parameters");
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void Operation::visitAttributes(ModelAttributeVisitor *visitor){
}
Operation::Operation(){

parameters.set_empty_key("");

}

Operation::~Operation(){






for ( google::dense_hash_map<string,Parameter*>::iterator it = parameters.begin();  it != parameters.end(); ++it)
{
Parameter * current = it->second;
if(current != NULL)
{
    delete current;
}

}

parameters.clear();


}

std::string Parameter::internalGetKey(){
return name;
}
void Parameter::addtype(TypedElement *ptr){
type =ptr;
}

void Parameter::removetype(TypedElement *ptr){
delete ptr;
}

string Parameter::metaClassName() {
return "Parameter";
}
void Parameter::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator Parameter"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("order")==0){
int f;
Utils::from_string<int>(f, AnyCast<string>(value), std::dec);
order= f;
}

if(refName.compare("type")==0){
if(mutatorType ==ADD){
addtype((TypedElement*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removetype((TypedElement*)AnyCast<TypedElement*>(value));
}
}

PRINTF("END -- reflexiveMutator Parameter "); 
}

KMFContainer* Parameter::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID Parameter" << relationName << " " << idP);
if(relationName.compare("type")== 0){
return type;
}

PRINTF("END -- findByID Parameter");
return NULL;

}





void Parameter::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("Parameter --> Visiting class Parameter");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void Parameter::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("Parameter --> Visiting attribute -> order");
visitor->visit(any(order),"order",this);
}
Parameter::Parameter(){


}

Parameter::~Parameter(){



}

std::string TypedElement::internalGetKey(){
return name;
}
TypedElement* TypedElement::findgenericTypesByID(std::string id){
PRINTF("END -- findByID " <<genericTypes[id] << " ");
return genericTypes[id];
}




void TypedElement::addgenericTypes(TypedElement *ptr)
{
    PRINTF("BEGIN -- TypedElement addgenericTypes");
    TypedElement  *container = (TypedElement *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addgenericTypes " << endl;
    }else
    {

        if(genericTypes.find(container->internalGetKey()) == genericTypes.end())
        {
            PRINTF("KEY -- TypedElement genericTypes  "<< container->internalGetKey() );
            genericTypes[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"genericTypes",ptr_any);
container->setEContainer(this,cmd,"genericTypes");

        }
    }
    PRINTF("END -- TypedElement  addgenericTypes");
}






void TypedElement::removegenericTypes(TypedElement *ptr)
{
    PRINTF("BEGIN -- TypedElement removegenericTypes");
    TypedElement *container = (TypedElement*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for genericTypes");
    }
    else
    {
        PRINTF("KEY -- TypedElement genericTypes  "<< container->internalGetKey() );
        genericTypes.set_deleted_key(container->internalGetKey());
        genericTypes.erase( genericTypes.find(container->internalGetKey()));
        genericTypes.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- TypedElement removegenericTypes");
}


string TypedElement::metaClassName() {
return "TypedElement";
}
void TypedElement::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator TypedElement"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
}

if(refName.compare("genericTypes")==0){
if(mutatorType ==ADD){
addgenericTypes((TypedElement*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removegenericTypes((TypedElement*)AnyCast<TypedElement*>(value));
}
}

PRINTF("END -- reflexiveMutator TypedElement "); 
}

KMFContainer* TypedElement::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID TypedElement" << relationName << " " << idP);
if(relationName.compare("genericTypes")== 0){
return (KMFContainer*)findgenericTypesByID(idP);
}

PRINTF("END -- findByID TypedElement");
return NULL;

}





void TypedElement::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("TypedElement --> Visiting class TypedElement");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("genericTypes","org.kevoree.TypedElement");
for ( google::dense_hash_map<string,TypedElement*>::iterator it = genericTypes.begin();  it != genericTypes.end(); ++it)
{
    TypedElement * current =(TypedElement*) it->second;
    PRINTF("TypedElement --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"genericTypes");
}
visitor->endVisitRef("genericTypes");
    }
    visitor->endVisitElem(this);
}


void TypedElement::visitAttributes(ModelAttributeVisitor *visitor){
}
TypedElement::TypedElement(){

genericTypes.set_empty_key("");

}

TypedElement::~TypedElement(){



}

std::string MessagePortType::internalGetKey(){
return name;
}
TypedElement* MessagePortType::findfiltersByID(std::string id){
PRINTF("END -- findByID " <<filters[id] << " ");
return filters[id];
}




void MessagePortType::addfilters(TypedElement *ptr)
{
    PRINTF("BEGIN -- MessagePortType addfilters");
    TypedElement  *container = (TypedElement *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addfilters " << endl;
    }else
    {

        if(filters.find(container->internalGetKey()) == filters.end())
        {
            PRINTF("KEY -- MessagePortType filters  "<< container->internalGetKey() );
            filters[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"filters",ptr_any);
container->setEContainer(this,cmd,"filters");

        }
    }
    PRINTF("END -- MessagePortType  addfilters");
}






void MessagePortType::removefilters(TypedElement *ptr)
{
    PRINTF("BEGIN -- MessagePortType removefilters");
    TypedElement *container = (TypedElement*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for filters");
    }
    else
    {
        PRINTF("KEY -- MessagePortType filters  "<< container->internalGetKey() );
        filters.set_deleted_key(container->internalGetKey());
        filters.erase( filters.find(container->internalGetKey()));
        filters.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- MessagePortType removefilters");
}


string MessagePortType::metaClassName() {
return "MessagePortType";
}
void MessagePortType::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator MessagePortType"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("factoryBean")==0){
factoryBean= AnyCast<string>(value);
} else if(refName.compare("bean")==0){
bean= AnyCast<string>(value);
} else if(refName.compare("abstract")==0){
if(AnyCast<string>(value).compare("true") == 0){
abstract= true;
}else { 
abstract= false;
}
} else if(refName.compare("synchrone")==0){
if(AnyCast<string>(value).compare("true") == 0){
synchrone= true;
}else { 
synchrone= false;
}
}

if(refName.compare("deployUnits")==0){
if(mutatorType ==ADD){
adddeployUnits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedeployUnits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("dictionaryType")==0){
if(mutatorType ==ADD){
adddictionaryType((DictionaryType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionaryType((DictionaryType*)AnyCast<DictionaryType*>(value));
}
} else if(refName.compare("superTypes")==0){
if(mutatorType ==ADD){
addsuperTypes((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesuperTypes((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
} else if(refName.compare("filters")==0){
if(mutatorType ==ADD){
addfilters((TypedElement*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removefilters((TypedElement*)AnyCast<TypedElement*>(value));
}
}

PRINTF("END -- reflexiveMutator MessagePortType "); 
}

KMFContainer* MessagePortType::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID MessagePortType" << relationName << " " << idP);
if(relationName.compare("deployUnits")== 0){
return (KMFContainer*)finddeployUnitsByID(idP);
}

if(relationName.compare("dictionaryType")== 0){
return dictionaryType;
}

if(relationName.compare("superTypes")== 0){
return (KMFContainer*)findsuperTypesByID(idP);
}

if(relationName.compare("filters")== 0){
return (KMFContainer*)findfiltersByID(idP);
}

PRINTF("END -- findByID MessagePortType");
return NULL;

}





void MessagePortType::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("MessagePortType --> Visiting class MessagePortType");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("deployUnits","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("MessagePortType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"deployUnits");
}
visitor->endVisitRef("deployUnits");



visitor->beginVisitRef("superTypes","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = superTypes.begin();  it != superTypes.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("MessagePortType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"superTypes");
}
visitor->endVisitRef("superTypes");



visitor->beginVisitRef("filters","org.kevoree.TypedElement");
for ( google::dense_hash_map<string,TypedElement*>::iterator it = filters.begin();  it != filters.end(); ++it)
{
    TypedElement * current =(TypedElement*) it->second;
    PRINTF("MessagePortType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"filters");
}
visitor->endVisitRef("filters");
    }
    visitor->endVisitElem(this);
}


void MessagePortType::visitAttributes(ModelAttributeVisitor *visitor){
}
MessagePortType::MessagePortType(){

filters.set_empty_key("");

}

MessagePortType::~MessagePortType(){



}

std::string Repository::internalGetKey(){
return url;
}
DeployUnit* Repository::findunitsByID(std::string id){
PRINTF("END -- findByID " <<units[id] << " ");
return units[id];
}




void Repository::addunits(DeployUnit *ptr)
{
    PRINTF("BEGIN -- Repository addunits");
    DeployUnit  *container = (DeployUnit *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addunits " << endl;
    }else
    {

        if(units.find(container->internalGetKey()) == units.end())
        {
            PRINTF("KEY -- Repository units  "<< container->internalGetKey() );
            units[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"units",ptr_any);
container->setEContainer(this,cmd,"units");

        }
    }
    PRINTF("END -- Repository  addunits");
}






void Repository::removeunits(DeployUnit *ptr)
{
    PRINTF("BEGIN -- Repository removeunits");
    DeployUnit *container = (DeployUnit*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for units");
    }
    else
    {
        PRINTF("KEY -- Repository units  "<< container->internalGetKey() );
        units.set_deleted_key(container->internalGetKey());
        units.erase( units.find(container->internalGetKey()));
        units.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- Repository removeunits");
}


string Repository::metaClassName() {
return "Repository";
}
void Repository::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator Repository"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("url")==0){
url= AnyCast<string>(value);
}

if(refName.compare("units")==0){
if(mutatorType ==ADD){
addunits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeunits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
}

PRINTF("END -- reflexiveMutator Repository "); 
}

KMFContainer* Repository::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID Repository" << relationName << " " << idP);
if(relationName.compare("units")== 0){
return (KMFContainer*)findunitsByID(idP);
}

PRINTF("END -- findByID Repository");
return NULL;

}





void Repository::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("Repository --> Visiting class Repository");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("units","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = units.begin();  it != units.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("Repository --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"units");
}
visitor->endVisitRef("units");
    }
    visitor->endVisitElem(this);
}


void Repository::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("Repository --> Visiting attribute -> url");
visitor->visit(any(url),"url",this);
}
Repository::Repository(){

units.set_empty_key("");

}

Repository::~Repository(){



}

std::string DeployUnit::internalGetKey(){
return groupName+"/"+hashcode+"/"+name+"/"+version;
}
DeployUnit* DeployUnit::findrequiredLibsByID(std::string id){
PRINTF("END -- findByID " <<requiredLibs[id] << " ");
return requiredLibs[id];
}




void DeployUnit::addrequiredLibs(DeployUnit *ptr)
{
    PRINTF("BEGIN -- DeployUnit addrequiredLibs");
    DeployUnit  *container = (DeployUnit *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addrequiredLibs " << endl;
    }else
    {

        if(requiredLibs.find(container->internalGetKey()) == requiredLibs.end())
        {
            PRINTF("KEY -- DeployUnit requiredLibs  "<< container->internalGetKey() );
            requiredLibs[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"requiredLibs",ptr_any);
container->setEContainer(this,cmd,"requiredLibs");

        }
    }
    PRINTF("END -- DeployUnit  addrequiredLibs");
}


void DeployUnit::addtargetNodeType(NodeType *ptr){
targetNodeType =ptr;
}





void DeployUnit::removerequiredLibs(DeployUnit *ptr)
{
    PRINTF("BEGIN -- DeployUnit removerequiredLibs");
    DeployUnit *container = (DeployUnit*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for requiredLibs");
    }
    else
    {
        PRINTF("KEY -- DeployUnit requiredLibs  "<< container->internalGetKey() );
        requiredLibs.set_deleted_key(container->internalGetKey());
        requiredLibs.erase( requiredLibs.find(container->internalGetKey()));
        requiredLibs.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- DeployUnit removerequiredLibs");
}


void DeployUnit::removetargetNodeType(NodeType *ptr){
delete ptr;
}

string DeployUnit::metaClassName() {
return "DeployUnit";
}
void DeployUnit::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator DeployUnit"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("groupName")==0){
groupName= AnyCast<string>(value);
} else if(refName.compare("version")==0){
version= AnyCast<string>(value);
} else if(refName.compare("url")==0){
url= AnyCast<string>(value);
} else if(refName.compare("hashcode")==0){
hashcode= AnyCast<string>(value);
} else if(refName.compare("type")==0){
type= AnyCast<string>(value);
}

if(refName.compare("requiredLibs")==0){
if(mutatorType ==ADD){
addrequiredLibs((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removerequiredLibs((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("targetNodeType")==0){
if(mutatorType ==ADD){
addtargetNodeType((NodeType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removetargetNodeType((NodeType*)AnyCast<NodeType*>(value));
}
}

PRINTF("END -- reflexiveMutator DeployUnit "); 
}

KMFContainer* DeployUnit::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID DeployUnit" << relationName << " " << idP);
if(relationName.compare("requiredLibs")== 0){
return (KMFContainer*)findrequiredLibsByID(idP);
}

if(relationName.compare("targetNodeType")== 0){
return targetNodeType;
}

PRINTF("END -- findByID DeployUnit");
return NULL;

}





void DeployUnit::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("DeployUnit --> Visiting class DeployUnit");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("requiredLibs","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = requiredLibs.begin();  it != requiredLibs.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("DeployUnit --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"requiredLibs");
}
visitor->endVisitRef("requiredLibs");
    }
    visitor->endVisitElem(this);
}


void DeployUnit::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("DeployUnit --> Visiting attribute -> groupName");
visitor->visit(any(groupName),"groupName",this);
PRINTF("DeployUnit --> Visiting attribute -> version");
visitor->visit(any(version),"version",this);
PRINTF("DeployUnit --> Visiting attribute -> url");
visitor->visit(any(url),"url",this);
PRINTF("DeployUnit --> Visiting attribute -> hashcode");
visitor->visit(any(hashcode),"hashcode",this);
PRINTF("DeployUnit --> Visiting attribute -> type");
visitor->visit(any(type),"type",this);
}
DeployUnit::DeployUnit(){

requiredLibs.set_empty_key("");

}

DeployUnit::~DeployUnit(){



}

std::string TypeLibrary::internalGetKey(){
return name;
}
TypeDefinition* TypeLibrary::findsubTypesByID(std::string id){
PRINTF("END -- findByID " <<subTypes[id] << " ");
return subTypes[id];
}




void TypeLibrary::addsubTypes(TypeDefinition *ptr)
{
    PRINTF("BEGIN -- TypeLibrary addsubTypes");
    TypeDefinition  *container = (TypeDefinition *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addsubTypes " << endl;
    }else
    {

        if(subTypes.find(container->internalGetKey()) == subTypes.end())
        {
            PRINTF("KEY -- TypeLibrary subTypes  "<< container->internalGetKey() );
            subTypes[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"subTypes",ptr_any);
container->setEContainer(this,cmd,"subTypes");

        }
    }
    PRINTF("END -- TypeLibrary  addsubTypes");
}






void TypeLibrary::removesubTypes(TypeDefinition *ptr)
{
    PRINTF("BEGIN -- TypeLibrary removesubTypes");
    TypeDefinition *container = (TypeDefinition*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for subTypes");
    }
    else
    {
        PRINTF("KEY -- TypeLibrary subTypes  "<< container->internalGetKey() );
        subTypes.set_deleted_key(container->internalGetKey());
        subTypes.erase( subTypes.find(container->internalGetKey()));
        subTypes.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- TypeLibrary removesubTypes");
}


string TypeLibrary::metaClassName() {
return "TypeLibrary";
}
void TypeLibrary::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator TypeLibrary"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
}

if(refName.compare("subTypes")==0){
if(mutatorType ==ADD){
addsubTypes((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesubTypes((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
}

PRINTF("END -- reflexiveMutator TypeLibrary "); 
}

KMFContainer* TypeLibrary::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID TypeLibrary" << relationName << " " << idP);
if(relationName.compare("subTypes")== 0){
return (KMFContainer*)findsubTypesByID(idP);
}

PRINTF("END -- findByID TypeLibrary");
return NULL;

}





void TypeLibrary::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("TypeLibrary --> Visiting class TypeLibrary");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("subTypes","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = subTypes.begin();  it != subTypes.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("TypeLibrary --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"subTypes");
}
visitor->endVisitRef("subTypes");
    }
    visitor->endVisitElem(this);
}


void TypeLibrary::visitAttributes(ModelAttributeVisitor *visitor){
}
TypeLibrary::TypeLibrary(){

subTypes.set_empty_key("");

}

TypeLibrary::~TypeLibrary(){



}

std::string NamedElement::internalGetKey(){
return name;
}
string NamedElement::metaClassName() {
return "NamedElement";
}
void NamedElement::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator NamedElement"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
}

PRINTF("END -- reflexiveMutator NamedElement "); 
}





void NamedElement::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("NamedElement --> Visiting class NamedElement");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void NamedElement::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("NamedElement --> Visiting attribute -> name");
visitor->visit(any(name),"name",this);
}
NamedElement::NamedElement(){


}

NamedElement::~NamedElement(){



}

std::string IntegrationPattern::internalGetKey(){
return name;
}
ExtraFonctionalProperty* IntegrationPattern::findextraFonctionalPropertiesByID(std::string id){
PRINTF("END -- findByID " <<extraFonctionalProperties[id] << " ");
return extraFonctionalProperties[id];
}
PortTypeRef* IntegrationPattern::findportTypesByID(std::string id){
PRINTF("END -- findByID " <<portTypes[id] << " ");
return portTypes[id];
}




void IntegrationPattern::addextraFonctionalProperties(ExtraFonctionalProperty *ptr)
{
    PRINTF("BEGIN -- IntegrationPattern addextraFonctionalProperties");
    ExtraFonctionalProperty  *container = (ExtraFonctionalProperty *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addextraFonctionalProperties " << endl;
    }else
    {

        if(extraFonctionalProperties.find(container->internalGetKey()) == extraFonctionalProperties.end())
        {
            PRINTF("KEY -- IntegrationPattern extraFonctionalProperties  "<< container->internalGetKey() );
            extraFonctionalProperties[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- IntegrationPattern  addextraFonctionalProperties");
}






void IntegrationPattern::addportTypes(PortTypeRef *ptr)
{
    PRINTF("BEGIN -- IntegrationPattern addportTypes");
    PortTypeRef  *container = (PortTypeRef *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addportTypes " << endl;
    }else
    {

        if(portTypes.find(container->internalGetKey()) == portTypes.end())
        {
            PRINTF("KEY -- IntegrationPattern portTypes  "<< container->internalGetKey() );
            portTypes[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"portTypes",ptr_any);
container->setEContainer(this,cmd,"portTypes");

        }
    }
    PRINTF("END -- IntegrationPattern  addportTypes");
}






void IntegrationPattern::removeextraFonctionalProperties(ExtraFonctionalProperty *ptr)
{
    PRINTF("BEGIN -- IntegrationPattern removeextraFonctionalProperties");
    ExtraFonctionalProperty *container = (ExtraFonctionalProperty*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for extraFonctionalProperties");
    }
    else
    {
        PRINTF("KEY -- IntegrationPattern extraFonctionalProperties  "<< container->internalGetKey() );
        extraFonctionalProperties.set_deleted_key(container->internalGetKey());
        extraFonctionalProperties.erase( extraFonctionalProperties.find(container->internalGetKey()));
        extraFonctionalProperties.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- IntegrationPattern removeextraFonctionalProperties");
}






void IntegrationPattern::removeportTypes(PortTypeRef *ptr)
{
    PRINTF("BEGIN -- IntegrationPattern removeportTypes");
    PortTypeRef *container = (PortTypeRef*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for portTypes");
    }
    else
    {
        PRINTF("KEY -- IntegrationPattern portTypes  "<< container->internalGetKey() );
        portTypes.set_deleted_key(container->internalGetKey());
        portTypes.erase( portTypes.find(container->internalGetKey()));
        portTypes.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- IntegrationPattern removeportTypes");
}


string IntegrationPattern::metaClassName() {
return "IntegrationPattern";
}
void IntegrationPattern::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator IntegrationPattern"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
}

if(refName.compare("extraFonctionalProperties")==0){
if(mutatorType ==ADD){
addextraFonctionalProperties((ExtraFonctionalProperty*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeextraFonctionalProperties((ExtraFonctionalProperty*)AnyCast<ExtraFonctionalProperty*>(value));
}
} else if(refName.compare("portTypes")==0){
if(mutatorType ==ADD){
addportTypes((PortTypeRef*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeportTypes((PortTypeRef*)AnyCast<PortTypeRef*>(value));
}
}

PRINTF("END -- reflexiveMutator IntegrationPattern "); 
}

KMFContainer* IntegrationPattern::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID IntegrationPattern" << relationName << " " << idP);
if(relationName.compare("extraFonctionalProperties")== 0){
return (KMFContainer*)findextraFonctionalPropertiesByID(idP);
}

if(relationName.compare("portTypes")== 0){
return (KMFContainer*)findportTypesByID(idP);
}

PRINTF("END -- findByID IntegrationPattern");
return NULL;

}





void IntegrationPattern::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("IntegrationPattern --> Visiting class IntegrationPattern");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("extraFonctionalProperties","org.kevoree.ExtraFonctionalProperty");
for ( google::dense_hash_map<string,ExtraFonctionalProperty*>::iterator it = extraFonctionalProperties.begin();  it != extraFonctionalProperties.end(); ++it)
{
    ExtraFonctionalProperty * current =(ExtraFonctionalProperty*) it->second;
    PRINTF("IntegrationPattern --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"extraFonctionalProperties");
}
visitor->endVisitRef("extraFonctionalProperties");
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("portTypes","org.kevoree.PortTypeRef");
for ( google::dense_hash_map<string,PortTypeRef*>::iterator it = portTypes.begin();  it != portTypes.end(); ++it)
{
    PortTypeRef * current =(PortTypeRef*) it->second;
    PRINTF("IntegrationPattern --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"portTypes");
}
visitor->endVisitRef("portTypes");
    }
    visitor->endVisitElem(this);
}


void IntegrationPattern::visitAttributes(ModelAttributeVisitor *visitor){
}
IntegrationPattern::IntegrationPattern(){

extraFonctionalProperties.set_empty_key("");
portTypes.set_empty_key("");

}

IntegrationPattern::~IntegrationPattern(){






for ( google::dense_hash_map<string,ExtraFonctionalProperty*>::iterator it = extraFonctionalProperties.begin();  it != extraFonctionalProperties.end(); ++it)
{
ExtraFonctionalProperty * current = it->second;
if(current != NULL)
{
    delete current;
}

}

extraFonctionalProperties.clear();


}

std::string ExtraFonctionalProperty::internalGetKey(){
return generated_KMF_ID;
}
PortTypeRef* ExtraFonctionalProperty::findportTypesByID(std::string id){
PRINTF("END -- findByID " <<portTypes[id] << " ");
return portTypes[id];
}




void ExtraFonctionalProperty::addportTypes(PortTypeRef *ptr)
{
    PRINTF("BEGIN -- ExtraFonctionalProperty addportTypes");
    PortTypeRef  *container = (PortTypeRef *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addportTypes " << endl;
    }else
    {

        if(portTypes.find(container->internalGetKey()) == portTypes.end())
        {
            PRINTF("KEY -- ExtraFonctionalProperty portTypes  "<< container->internalGetKey() );
            portTypes[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"portTypes",ptr_any);
container->setEContainer(this,cmd,"portTypes");

        }
    }
    PRINTF("END -- ExtraFonctionalProperty  addportTypes");
}






void ExtraFonctionalProperty::removeportTypes(PortTypeRef *ptr)
{
    PRINTF("BEGIN -- ExtraFonctionalProperty removeportTypes");
    PortTypeRef *container = (PortTypeRef*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for portTypes");
    }
    else
    {
        PRINTF("KEY -- ExtraFonctionalProperty portTypes  "<< container->internalGetKey() );
        portTypes.set_deleted_key(container->internalGetKey());
        portTypes.erase( portTypes.find(container->internalGetKey()));
        portTypes.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- ExtraFonctionalProperty removeportTypes");
}


string ExtraFonctionalProperty::metaClassName() {
return "ExtraFonctionalProperty";
}
void ExtraFonctionalProperty::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator ExtraFonctionalProperty"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

if(refName.compare("portTypes")==0){
if(mutatorType ==ADD){
addportTypes((PortTypeRef*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeportTypes((PortTypeRef*)AnyCast<PortTypeRef*>(value));
}
}

PRINTF("END -- reflexiveMutator ExtraFonctionalProperty "); 
}

KMFContainer* ExtraFonctionalProperty::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID ExtraFonctionalProperty" << relationName << " " << idP);
if(relationName.compare("portTypes")== 0){
return (KMFContainer*)findportTypesByID(idP);
}

PRINTF("END -- findByID ExtraFonctionalProperty");
return NULL;

}





void ExtraFonctionalProperty::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("ExtraFonctionalProperty --> Visiting class ExtraFonctionalProperty");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("portTypes","org.kevoree.PortTypeRef");
for ( google::dense_hash_map<string,PortTypeRef*>::iterator it = portTypes.begin();  it != portTypes.end(); ++it)
{
    PortTypeRef * current =(PortTypeRef*) it->second;
    PRINTF("ExtraFonctionalProperty --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"portTypes");
}
visitor->endVisitRef("portTypes");
    }
    visitor->endVisitElem(this);
}


void ExtraFonctionalProperty::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("ExtraFonctionalProperty --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
ExtraFonctionalProperty::ExtraFonctionalProperty(){

portTypes.set_empty_key("");

}

ExtraFonctionalProperty::~ExtraFonctionalProperty(){



}

std::string PortTypeMapping::internalGetKey(){
return generated_KMF_ID;
}
string PortTypeMapping::metaClassName() {
return "PortTypeMapping";
}
void PortTypeMapping::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator PortTypeMapping"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("beanMethodName")==0){
beanMethodName= AnyCast<string>(value);
} else if(refName.compare("serviceMethodName")==0){
serviceMethodName= AnyCast<string>(value);
} else if(refName.compare("paramTypes")==0){
paramTypes= AnyCast<string>(value);
} else if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

PRINTF("END -- reflexiveMutator PortTypeMapping "); 
}





void PortTypeMapping::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("PortTypeMapping --> Visiting class PortTypeMapping");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void PortTypeMapping::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("PortTypeMapping --> Visiting attribute -> beanMethodName");
visitor->visit(any(beanMethodName),"beanMethodName",this);
PRINTF("PortTypeMapping --> Visiting attribute -> serviceMethodName");
visitor->visit(any(serviceMethodName),"serviceMethodName",this);
PRINTF("PortTypeMapping --> Visiting attribute -> paramTypes");
visitor->visit(any(paramTypes),"paramTypes",this);
PRINTF("PortTypeMapping --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
PortTypeMapping::PortTypeMapping(){


}

PortTypeMapping::~PortTypeMapping(){



}

std::string Channel::internalGetKey(){
return name;
}
MBinding* Channel::findbindingsByID(std::string id){
PRINTF("END -- findByID " <<bindings[id] << " ");
return bindings[id];
}




void Channel::addbindings(MBinding *ptr)
{
    PRINTF("BEGIN -- Channel addbindings");
    MBinding  *container = (MBinding *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addbindings " << endl;
    }else
    {

        if(bindings.find(container->internalGetKey()) == bindings.end())
        {
            PRINTF("KEY -- Channel bindings  "<< container->internalGetKey() );
            bindings[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"bindings",ptr_any);
container->setEContainer(this,cmd,"bindings");

        }
    }
    PRINTF("END -- Channel  addbindings");
}






void Channel::removebindings(MBinding *ptr)
{
    PRINTF("BEGIN -- Channel removebindings");
    MBinding *container = (MBinding*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for bindings");
    }
    else
    {
        PRINTF("KEY -- Channel bindings  "<< container->internalGetKey() );
        bindings.set_deleted_key(container->internalGetKey());
        bindings.erase( bindings.find(container->internalGetKey()));
        bindings.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- Channel removebindings");
}


string Channel::metaClassName() {
return "Channel";
}
void Channel::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator Channel"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("metaData")==0){
metaData= AnyCast<string>(value);
} else if(refName.compare("started")==0){
if(AnyCast<string>(value).compare("true") == 0){
started= true;
}else { 
started= false;
}
}

if(refName.compare("typeDefinition")==0){
if(mutatorType ==ADD){
addtypeDefinition((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removetypeDefinition((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
} else if(refName.compare("dictionary")==0){
if(mutatorType ==ADD){
adddictionary((Dictionary*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionary((Dictionary*)AnyCast<Dictionary*>(value));
}
} else if(refName.compare("bindings")==0){
if(mutatorType ==ADD){
addbindings((MBinding*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removebindings((MBinding*)AnyCast<MBinding*>(value));
}
}

PRINTF("END -- reflexiveMutator Channel "); 
}

KMFContainer* Channel::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID Channel" << relationName << " " << idP);
if(relationName.compare("typeDefinition")== 0){
return typeDefinition;
}

if(relationName.compare("dictionary")== 0){
return dictionary;
}

if(relationName.compare("bindings")== 0){
return (KMFContainer*)findbindingsByID(idP);
}

PRINTF("END -- findByID Channel");
return NULL;

}





void Channel::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("Channel --> Visiting class Channel");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("bindings","org.kevoree.MBinding");
for ( google::dense_hash_map<string,MBinding*>::iterator it = bindings.begin();  it != bindings.end(); ++it)
{
    MBinding * current =(MBinding*) it->second;
    PRINTF("Channel --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"bindings");
}
visitor->endVisitRef("bindings");
    }
    visitor->endVisitElem(this);
}


void Channel::visitAttributes(ModelAttributeVisitor *visitor){
}
Channel::Channel(){

bindings.set_empty_key("");

}

Channel::~Channel(){



}

std::string MBinding::internalGetKey(){
return generated_KMF_ID;
}
void MBinding::addport(Port *ptr){
port =ptr;
}

void MBinding::addhub(Channel *ptr){
hub =ptr;
}

void MBinding::removeport(Port *ptr){
delete ptr;
}

void MBinding::removehub(Channel *ptr){
delete ptr;
}

string MBinding::metaClassName() {
return "MBinding";
}
void MBinding::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator MBinding"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

if(refName.compare("port")==0){
if(mutatorType ==ADD){
addport((Port*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeport((Port*)AnyCast<Port*>(value));
}
} else if(refName.compare("hub")==0){
if(mutatorType ==ADD){
addhub((Channel*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removehub((Channel*)AnyCast<Channel*>(value));
}
}

PRINTF("END -- reflexiveMutator MBinding "); 
}

KMFContainer* MBinding::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID MBinding" << relationName << " " << idP);
if(relationName.compare("port")== 0){
return port;
}

if(relationName.compare("hub")== 0){
return hub;
}

PRINTF("END -- findByID MBinding");
return NULL;

}





void MBinding::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("MBinding --> Visiting class MBinding");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void MBinding::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("MBinding --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
MBinding::MBinding(){


}

MBinding::~MBinding(){



}

std::string NodeNetwork::internalGetKey(){
return generated_KMF_ID;
}
NodeLink* NodeNetwork::findlinkByID(std::string id){
PRINTF("END -- findByID " <<link[id] << " ");
return link[id];
}




void NodeNetwork::addlink(NodeLink *ptr)
{
    PRINTF("BEGIN -- NodeNetwork addlink");
    NodeLink  *container = (NodeLink *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addlink " << endl;
    }else
    {

        if(link.find(container->internalGetKey()) == link.end())
        {
            PRINTF("KEY -- NodeNetwork link  "<< container->internalGetKey() );
            link[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- NodeNetwork  addlink");
}


void NodeNetwork::addinitBy(ContainerNode *ptr){
initBy =ptr;
}

void NodeNetwork::addtarget(ContainerNode *ptr){
target =ptr;
}





void NodeNetwork::removelink(NodeLink *ptr)
{
    PRINTF("BEGIN -- NodeNetwork removelink");
    NodeLink *container = (NodeLink*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for link");
    }
    else
    {
        PRINTF("KEY -- NodeNetwork link  "<< container->internalGetKey() );
        link.set_deleted_key(container->internalGetKey());
        link.erase( link.find(container->internalGetKey()));
        link.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- NodeNetwork removelink");
}


void NodeNetwork::removeinitBy(ContainerNode *ptr){
delete ptr;
}

void NodeNetwork::removetarget(ContainerNode *ptr){
delete ptr;
}

string NodeNetwork::metaClassName() {
return "NodeNetwork";
}
void NodeNetwork::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator NodeNetwork"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

if(refName.compare("link")==0){
if(mutatorType ==ADD){
addlink((NodeLink*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removelink((NodeLink*)AnyCast<NodeLink*>(value));
}
} else if(refName.compare("initBy")==0){
if(mutatorType ==ADD){
addinitBy((ContainerNode*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeinitBy((ContainerNode*)AnyCast<ContainerNode*>(value));
}
} else if(refName.compare("target")==0){
if(mutatorType ==ADD){
addtarget((ContainerNode*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removetarget((ContainerNode*)AnyCast<ContainerNode*>(value));
}
}

PRINTF("END -- reflexiveMutator NodeNetwork "); 
}

KMFContainer* NodeNetwork::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID NodeNetwork" << relationName << " " << idP);
if(relationName.compare("link")== 0){
return (KMFContainer*)findlinkByID(idP);
}

if(relationName.compare("initBy")== 0){
return initBy;
}

if(relationName.compare("target")== 0){
return target;
}

PRINTF("END -- findByID NodeNetwork");
return NULL;

}





void NodeNetwork::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("NodeNetwork --> Visiting class NodeNetwork");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("link","org.kevoree.NodeLink");
for ( google::dense_hash_map<string,NodeLink*>::iterator it = link.begin();  it != link.end(); ++it)
{
    NodeLink * current =(NodeLink*) it->second;
    PRINTF("NodeNetwork --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"link");
}
visitor->endVisitRef("link");
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void NodeNetwork::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("NodeNetwork --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
NodeNetwork::NodeNetwork(){

link.set_empty_key("");

}

NodeNetwork::~NodeNetwork(){






for ( google::dense_hash_map<string,NodeLink*>::iterator it = link.begin();  it != link.end(); ++it)
{
NodeLink * current = it->second;
if(current != NULL)
{
    delete current;
}

}

link.clear();


}

std::string NodeLink::internalGetKey(){
return generated_KMF_ID;
}
NetworkProperty* NodeLink::findnetworkPropertiesByID(std::string id){
PRINTF("END -- findByID " <<networkProperties[id] << " ");
return networkProperties[id];
}




void NodeLink::addnetworkProperties(NetworkProperty *ptr)
{
    PRINTF("BEGIN -- NodeLink addnetworkProperties");
    NetworkProperty  *container = (NetworkProperty *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addnetworkProperties " << endl;
    }else
    {

        if(networkProperties.find(container->internalGetKey()) == networkProperties.end())
        {
            PRINTF("KEY -- NodeLink networkProperties  "<< container->internalGetKey() );
            networkProperties[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- NodeLink  addnetworkProperties");
}






void NodeLink::removenetworkProperties(NetworkProperty *ptr)
{
    PRINTF("BEGIN -- NodeLink removenetworkProperties");
    NetworkProperty *container = (NetworkProperty*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for networkProperties");
    }
    else
    {
        PRINTF("KEY -- NodeLink networkProperties  "<< container->internalGetKey() );
        networkProperties.set_deleted_key(container->internalGetKey());
        networkProperties.erase( networkProperties.find(container->internalGetKey()));
        networkProperties.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- NodeLink removenetworkProperties");
}


string NodeLink::metaClassName() {
return "NodeLink";
}
void NodeLink::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator NodeLink"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("networkType")==0){
networkType= AnyCast<string>(value);
} else if(refName.compare("estimatedRate")==0){
int f;
Utils::from_string<int>(f, AnyCast<string>(value), std::dec);
estimatedRate= f;
} else if(refName.compare("lastCheck")==0){
lastCheck= AnyCast<string>(value);
} else if(refName.compare("zoneID")==0){
zoneID= AnyCast<string>(value);
} else if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

if(refName.compare("networkProperties")==0){
if(mutatorType ==ADD){
addnetworkProperties((NetworkProperty*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removenetworkProperties((NetworkProperty*)AnyCast<NetworkProperty*>(value));
}
}

PRINTF("END -- reflexiveMutator NodeLink "); 
}

KMFContainer* NodeLink::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID NodeLink" << relationName << " " << idP);
if(relationName.compare("networkProperties")== 0){
return (KMFContainer*)findnetworkPropertiesByID(idP);
}

PRINTF("END -- findByID NodeLink");
return NULL;

}





void NodeLink::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("NodeLink --> Visiting class NodeLink");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("networkProperties","org.kevoree.NetworkProperty");
for ( google::dense_hash_map<string,NetworkProperty*>::iterator it = networkProperties.begin();  it != networkProperties.end(); ++it)
{
    NetworkProperty * current =(NetworkProperty*) it->second;
    PRINTF("NodeLink --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"networkProperties");
}
visitor->endVisitRef("networkProperties");
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void NodeLink::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("NodeLink --> Visiting attribute -> networkType");
visitor->visit(any(networkType),"networkType",this);
PRINTF("NodeLink --> Visiting attribute -> estimatedRate");
visitor->visit(any(estimatedRate),"estimatedRate",this);
PRINTF("NodeLink --> Visiting attribute -> lastCheck");
visitor->visit(any(lastCheck),"lastCheck",this);
PRINTF("NodeLink --> Visiting attribute -> zoneID");
visitor->visit(any(zoneID),"zoneID",this);
PRINTF("NodeLink --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
NodeLink::NodeLink(){

networkProperties.set_empty_key("");

}

NodeLink::~NodeLink(){






for ( google::dense_hash_map<string,NetworkProperty*>::iterator it = networkProperties.begin();  it != networkProperties.end(); ++it)
{
NetworkProperty * current = it->second;
if(current != NULL)
{
    delete current;
}

}

networkProperties.clear();


}

std::string NetworkProperty::internalGetKey(){
return name;
}
string NetworkProperty::metaClassName() {
return "NetworkProperty";
}
void NetworkProperty::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator NetworkProperty"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("value")==0){
value= AnyCast<string>(value);
} else if(refName.compare("lastCheck")==0){
lastCheck= AnyCast<string>(value);
}

PRINTF("END -- reflexiveMutator NetworkProperty "); 
}





void NetworkProperty::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("NetworkProperty --> Visiting class NetworkProperty");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void NetworkProperty::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("NetworkProperty --> Visiting attribute -> value");
visitor->visit(any(value),"value",this);
PRINTF("NetworkProperty --> Visiting attribute -> lastCheck");
visitor->visit(any(lastCheck),"lastCheck",this);
}
NetworkProperty::NetworkProperty(){


}

NetworkProperty::~NetworkProperty(){



}

std::string ChannelType::internalGetKey(){
return name;
}
string ChannelType::metaClassName() {
return "ChannelType";
}
void ChannelType::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator ChannelType"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("factoryBean")==0){
factoryBean= AnyCast<string>(value);
} else if(refName.compare("bean")==0){
bean= AnyCast<string>(value);
} else if(refName.compare("abstract")==0){
if(AnyCast<string>(value).compare("true") == 0){
abstract= true;
}else { 
abstract= false;
}
} else if(refName.compare("startMethod")==0){
startMethod= AnyCast<string>(value);
} else if(refName.compare("stopMethod")==0){
stopMethod= AnyCast<string>(value);
} else if(refName.compare("updateMethod")==0){
updateMethod= AnyCast<string>(value);
} else if(refName.compare("lowerBindings")==0){
int f;
Utils::from_string<int>(f, AnyCast<string>(value), std::dec);
lowerBindings= f;
} else if(refName.compare("upperBindings")==0){
int f;
Utils::from_string<int>(f, AnyCast<string>(value), std::dec);
upperBindings= f;
} else if(refName.compare("lowerFragments")==0){
int f;
Utils::from_string<int>(f, AnyCast<string>(value), std::dec);
lowerFragments= f;
} else if(refName.compare("upperFragments")==0){
int f;
Utils::from_string<int>(f, AnyCast<string>(value), std::dec);
upperFragments= f;
}

if(refName.compare("deployUnits")==0){
if(mutatorType ==ADD){
adddeployUnits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedeployUnits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("dictionaryType")==0){
if(mutatorType ==ADD){
adddictionaryType((DictionaryType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionaryType((DictionaryType*)AnyCast<DictionaryType*>(value));
}
} else if(refName.compare("superTypes")==0){
if(mutatorType ==ADD){
addsuperTypes((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesuperTypes((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
}

PRINTF("END -- reflexiveMutator ChannelType "); 
}

KMFContainer* ChannelType::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID ChannelType" << relationName << " " << idP);
if(relationName.compare("deployUnits")== 0){
return (KMFContainer*)finddeployUnitsByID(idP);
}

if(relationName.compare("dictionaryType")== 0){
return dictionaryType;
}

if(relationName.compare("superTypes")== 0){
return (KMFContainer*)findsuperTypesByID(idP);
}

PRINTF("END -- findByID ChannelType");
return NULL;

}





void ChannelType::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("ChannelType --> Visiting class ChannelType");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("deployUnits","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("ChannelType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"deployUnits");
}
visitor->endVisitRef("deployUnits");



visitor->beginVisitRef("superTypes","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = superTypes.begin();  it != superTypes.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("ChannelType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"superTypes");
}
visitor->endVisitRef("superTypes");
    }
    visitor->endVisitElem(this);
}


void ChannelType::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("ChannelType --> Visiting attribute -> lowerBindings");
visitor->visit(any(lowerBindings),"lowerBindings",this);
PRINTF("ChannelType --> Visiting attribute -> upperBindings");
visitor->visit(any(upperBindings),"upperBindings",this);
PRINTF("ChannelType --> Visiting attribute -> lowerFragments");
visitor->visit(any(lowerFragments),"lowerFragments",this);
PRINTF("ChannelType --> Visiting attribute -> upperFragments");
visitor->visit(any(upperFragments),"upperFragments",this);
}
ChannelType::ChannelType(){


}

ChannelType::~ChannelType(){



}

std::string TypeDefinition::internalGetKey(){
return name;
}
DeployUnit* TypeDefinition::finddeployUnitsByID(std::string id){
PRINTF("END -- findByID " <<deployUnits[id] << " ");
return deployUnits[id];
}
TypeDefinition* TypeDefinition::findsuperTypesByID(std::string id){
PRINTF("END -- findByID " <<superTypes[id] << " ");
return superTypes[id];
}




void TypeDefinition::adddeployUnits(DeployUnit *ptr)
{
    PRINTF("BEGIN -- TypeDefinition adddeployUnits");
    DeployUnit  *container = (DeployUnit *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY adddeployUnits " << endl;
    }else
    {

        if(deployUnits.find(container->internalGetKey()) == deployUnits.end())
        {
            PRINTF("KEY -- TypeDefinition deployUnits  "<< container->internalGetKey() );
            deployUnits[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"deployUnits",ptr_any);
container->setEContainer(this,cmd,"deployUnits");

        }
    }
    PRINTF("END -- TypeDefinition  adddeployUnits");
}


void TypeDefinition::adddictionaryType(DictionaryType *ptr){
dictionaryType =ptr;
}





void TypeDefinition::addsuperTypes(TypeDefinition *ptr)
{
    PRINTF("BEGIN -- TypeDefinition addsuperTypes");
    TypeDefinition  *container = (TypeDefinition *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addsuperTypes " << endl;
    }else
    {

        if(superTypes.find(container->internalGetKey()) == superTypes.end())
        {
            PRINTF("KEY -- TypeDefinition superTypes  "<< container->internalGetKey() );
            superTypes[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"superTypes",ptr_any);
container->setEContainer(this,cmd,"superTypes");

        }
    }
    PRINTF("END -- TypeDefinition  addsuperTypes");
}






void TypeDefinition::removedeployUnits(DeployUnit *ptr)
{
    PRINTF("BEGIN -- TypeDefinition removedeployUnits");
    DeployUnit *container = (DeployUnit*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for deployUnits");
    }
    else
    {
        PRINTF("KEY -- TypeDefinition deployUnits  "<< container->internalGetKey() );
        deployUnits.set_deleted_key(container->internalGetKey());
        deployUnits.erase( deployUnits.find(container->internalGetKey()));
        deployUnits.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- TypeDefinition removedeployUnits");
}


void TypeDefinition::removedictionaryType(DictionaryType *ptr){
delete ptr;
}





void TypeDefinition::removesuperTypes(TypeDefinition *ptr)
{
    PRINTF("BEGIN -- TypeDefinition removesuperTypes");
    TypeDefinition *container = (TypeDefinition*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for superTypes");
    }
    else
    {
        PRINTF("KEY -- TypeDefinition superTypes  "<< container->internalGetKey() );
        superTypes.set_deleted_key(container->internalGetKey());
        superTypes.erase( superTypes.find(container->internalGetKey()));
        superTypes.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- TypeDefinition removesuperTypes");
}


string TypeDefinition::metaClassName() {
return "TypeDefinition";
}
void TypeDefinition::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator TypeDefinition"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("factoryBean")==0){
factoryBean= AnyCast<string>(value);
} else if(refName.compare("bean")==0){
bean= AnyCast<string>(value);
} else if(refName.compare("abstract")==0){
if(AnyCast<string>(value).compare("true") == 0){
abstract= true;
}else { 
abstract= false;
}
}

if(refName.compare("deployUnits")==0){
if(mutatorType ==ADD){
adddeployUnits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedeployUnits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("dictionaryType")==0){
if(mutatorType ==ADD){
adddictionaryType((DictionaryType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionaryType((DictionaryType*)AnyCast<DictionaryType*>(value));
}
} else if(refName.compare("superTypes")==0){
if(mutatorType ==ADD){
addsuperTypes((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesuperTypes((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
}

PRINTF("END -- reflexiveMutator TypeDefinition "); 
}

KMFContainer* TypeDefinition::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID TypeDefinition" << relationName << " " << idP);
if(relationName.compare("deployUnits")== 0){
return (KMFContainer*)finddeployUnitsByID(idP);
}

if(relationName.compare("dictionaryType")== 0){
return dictionaryType;
}

if(relationName.compare("superTypes")== 0){
return (KMFContainer*)findsuperTypesByID(idP);
}

PRINTF("END -- findByID TypeDefinition");
return NULL;

}





void TypeDefinition::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("TypeDefinition --> Visiting class TypeDefinition");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("deployUnits","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("TypeDefinition --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"deployUnits");
}
visitor->endVisitRef("deployUnits");



visitor->beginVisitRef("superTypes","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = superTypes.begin();  it != superTypes.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("TypeDefinition --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"superTypes");
}
visitor->endVisitRef("superTypes");
    }
    visitor->endVisitElem(this);
}


void TypeDefinition::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("TypeDefinition --> Visiting attribute -> factoryBean");
visitor->visit(any(factoryBean),"factoryBean",this);
PRINTF("TypeDefinition --> Visiting attribute -> bean");
visitor->visit(any(bean),"bean",this);
PRINTF("TypeDefinition --> Visiting attribute -> abstract");
visitor->visit(any(abstract),"abstract",this);
}
TypeDefinition::TypeDefinition(){

deployUnits.set_empty_key("");
superTypes.set_empty_key("");

}

TypeDefinition::~TypeDefinition(){



}

std::string Instance::internalGetKey(){
return name;
}
void Instance::addtypeDefinition(TypeDefinition *ptr){
typeDefinition =ptr;
}

void Instance::adddictionary(Dictionary *ptr){
dictionary =ptr;
}

void Instance::removetypeDefinition(TypeDefinition *ptr){
delete ptr;
}

void Instance::removedictionary(Dictionary *ptr){
delete ptr;
}

string Instance::metaClassName() {
return "Instance";
}
void Instance::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator Instance"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("metaData")==0){
metaData= AnyCast<string>(value);
} else if(refName.compare("started")==0){
if(AnyCast<string>(value).compare("true") == 0){
started= true;
}else { 
started= false;
}
}

if(refName.compare("typeDefinition")==0){
if(mutatorType ==ADD){
addtypeDefinition((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removetypeDefinition((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
} else if(refName.compare("dictionary")==0){
if(mutatorType ==ADD){
adddictionary((Dictionary*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionary((Dictionary*)AnyCast<Dictionary*>(value));
}
}

PRINTF("END -- reflexiveMutator Instance "); 
}

KMFContainer* Instance::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID Instance" << relationName << " " << idP);
if(relationName.compare("typeDefinition")== 0){
return typeDefinition;
}

if(relationName.compare("dictionary")== 0){
return dictionary;
}

PRINTF("END -- findByID Instance");
return NULL;

}





void Instance::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("Instance --> Visiting class Instance");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void Instance::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("Instance --> Visiting attribute -> metaData");
visitor->visit(any(metaData),"metaData",this);
PRINTF("Instance --> Visiting attribute -> started");
visitor->visit(any(started),"started",this);
}
Instance::Instance(){


}

Instance::~Instance(){



}

std::string LifeCycleTypeDefinition::internalGetKey(){
return name;
}
string LifeCycleTypeDefinition::metaClassName() {
return "LifeCycleTypeDefinition";
}
void LifeCycleTypeDefinition::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator LifeCycleTypeDefinition"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("factoryBean")==0){
factoryBean= AnyCast<string>(value);
} else if(refName.compare("bean")==0){
bean= AnyCast<string>(value);
} else if(refName.compare("abstract")==0){
if(AnyCast<string>(value).compare("true") == 0){
abstract= true;
}else { 
abstract= false;
}
} else if(refName.compare("startMethod")==0){
startMethod= AnyCast<string>(value);
} else if(refName.compare("stopMethod")==0){
stopMethod= AnyCast<string>(value);
} else if(refName.compare("updateMethod")==0){
updateMethod= AnyCast<string>(value);
}

if(refName.compare("deployUnits")==0){
if(mutatorType ==ADD){
adddeployUnits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedeployUnits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("dictionaryType")==0){
if(mutatorType ==ADD){
adddictionaryType((DictionaryType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionaryType((DictionaryType*)AnyCast<DictionaryType*>(value));
}
} else if(refName.compare("superTypes")==0){
if(mutatorType ==ADD){
addsuperTypes((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesuperTypes((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
}

PRINTF("END -- reflexiveMutator LifeCycleTypeDefinition "); 
}

KMFContainer* LifeCycleTypeDefinition::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID LifeCycleTypeDefinition" << relationName << " " << idP);
if(relationName.compare("deployUnits")== 0){
return (KMFContainer*)finddeployUnitsByID(idP);
}

if(relationName.compare("dictionaryType")== 0){
return dictionaryType;
}

if(relationName.compare("superTypes")== 0){
return (KMFContainer*)findsuperTypesByID(idP);
}

PRINTF("END -- findByID LifeCycleTypeDefinition");
return NULL;

}





void LifeCycleTypeDefinition::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("LifeCycleTypeDefinition --> Visiting class LifeCycleTypeDefinition");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("deployUnits","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("LifeCycleTypeDefinition --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"deployUnits");
}
visitor->endVisitRef("deployUnits");



visitor->beginVisitRef("superTypes","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = superTypes.begin();  it != superTypes.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("LifeCycleTypeDefinition --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"superTypes");
}
visitor->endVisitRef("superTypes");
    }
    visitor->endVisitElem(this);
}


void LifeCycleTypeDefinition::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("LifeCycleTypeDefinition --> Visiting attribute -> startMethod");
visitor->visit(any(startMethod),"startMethod",this);
PRINTF("LifeCycleTypeDefinition --> Visiting attribute -> stopMethod");
visitor->visit(any(stopMethod),"stopMethod",this);
PRINTF("LifeCycleTypeDefinition --> Visiting attribute -> updateMethod");
visitor->visit(any(updateMethod),"updateMethod",this);
}
LifeCycleTypeDefinition::LifeCycleTypeDefinition(){


}

LifeCycleTypeDefinition::~LifeCycleTypeDefinition(){



}

std::string Group::internalGetKey(){
return name;
}
ContainerNode* Group::findsubNodesByID(std::string id){
PRINTF("END -- findByID " <<subNodes[id] << " ");
return subNodes[id];
}




void Group::addsubNodes(ContainerNode *ptr)
{
    PRINTF("BEGIN -- Group addsubNodes");
    ContainerNode  *container = (ContainerNode *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addsubNodes " << endl;
    }else
    {

        if(subNodes.find(container->internalGetKey()) == subNodes.end())
        {
            PRINTF("KEY -- Group subNodes  "<< container->internalGetKey() );
            subNodes[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"subNodes",ptr_any);
container->setEContainer(this,cmd,"subNodes");

        }
    }
    PRINTF("END -- Group  addsubNodes");
}






void Group::removesubNodes(ContainerNode *ptr)
{
    PRINTF("BEGIN -- Group removesubNodes");
    ContainerNode *container = (ContainerNode*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for subNodes");
    }
    else
    {
        PRINTF("KEY -- Group subNodes  "<< container->internalGetKey() );
        subNodes.set_deleted_key(container->internalGetKey());
        subNodes.erase( subNodes.find(container->internalGetKey()));
        subNodes.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- Group removesubNodes");
}


string Group::metaClassName() {
return "Group";
}
void Group::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator Group"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("metaData")==0){
metaData= AnyCast<string>(value);
} else if(refName.compare("started")==0){
if(AnyCast<string>(value).compare("true") == 0){
started= true;
}else { 
started= false;
}
}

if(refName.compare("typeDefinition")==0){
if(mutatorType ==ADD){
addtypeDefinition((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removetypeDefinition((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
} else if(refName.compare("dictionary")==0){
if(mutatorType ==ADD){
adddictionary((Dictionary*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionary((Dictionary*)AnyCast<Dictionary*>(value));
}
} else if(refName.compare("subNodes")==0){
if(mutatorType ==ADD){
addsubNodes((ContainerNode*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesubNodes((ContainerNode*)AnyCast<ContainerNode*>(value));
}
}

PRINTF("END -- reflexiveMutator Group "); 
}

KMFContainer* Group::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID Group" << relationName << " " << idP);
if(relationName.compare("typeDefinition")== 0){
return typeDefinition;
}

if(relationName.compare("dictionary")== 0){
return dictionary;
}

if(relationName.compare("subNodes")== 0){
return (KMFContainer*)findsubNodesByID(idP);
}

PRINTF("END -- findByID Group");
return NULL;

}





void Group::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("Group --> Visiting class Group");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("subNodes","org.kevoree.ContainerNode");
for ( google::dense_hash_map<string,ContainerNode*>::iterator it = subNodes.begin();  it != subNodes.end(); ++it)
{
    ContainerNode * current =(ContainerNode*) it->second;
    PRINTF("Group --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"subNodes");
}
visitor->endVisitRef("subNodes");
    }
    visitor->endVisitElem(this);
}


void Group::visitAttributes(ModelAttributeVisitor *visitor){
}
Group::Group(){

subNodes.set_empty_key("");

}

Group::~Group(){



}

std::string GroupType::internalGetKey(){
return name;
}
string GroupType::metaClassName() {
return "GroupType";
}
void GroupType::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator GroupType"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("factoryBean")==0){
factoryBean= AnyCast<string>(value);
} else if(refName.compare("bean")==0){
bean= AnyCast<string>(value);
} else if(refName.compare("abstract")==0){
if(AnyCast<string>(value).compare("true") == 0){
abstract= true;
}else { 
abstract= false;
}
} else if(refName.compare("startMethod")==0){
startMethod= AnyCast<string>(value);
} else if(refName.compare("stopMethod")==0){
stopMethod= AnyCast<string>(value);
} else if(refName.compare("updateMethod")==0){
updateMethod= AnyCast<string>(value);
}

if(refName.compare("deployUnits")==0){
if(mutatorType ==ADD){
adddeployUnits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedeployUnits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("dictionaryType")==0){
if(mutatorType ==ADD){
adddictionaryType((DictionaryType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionaryType((DictionaryType*)AnyCast<DictionaryType*>(value));
}
} else if(refName.compare("superTypes")==0){
if(mutatorType ==ADD){
addsuperTypes((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesuperTypes((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
}

PRINTF("END -- reflexiveMutator GroupType "); 
}

KMFContainer* GroupType::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID GroupType" << relationName << " " << idP);
if(relationName.compare("deployUnits")== 0){
return (KMFContainer*)finddeployUnitsByID(idP);
}

if(relationName.compare("dictionaryType")== 0){
return dictionaryType;
}

if(relationName.compare("superTypes")== 0){
return (KMFContainer*)findsuperTypesByID(idP);
}

PRINTF("END -- findByID GroupType");
return NULL;

}





void GroupType::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("GroupType --> Visiting class GroupType");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("deployUnits","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("GroupType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"deployUnits");
}
visitor->endVisitRef("deployUnits");



visitor->beginVisitRef("superTypes","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = superTypes.begin();  it != superTypes.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("GroupType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"superTypes");
}
visitor->endVisitRef("superTypes");
    }
    visitor->endVisitElem(this);
}


void GroupType::visitAttributes(ModelAttributeVisitor *visitor){
}
GroupType::GroupType(){


}

GroupType::~GroupType(){



}

std::string NodeType::internalGetKey(){
return name;
}
AdaptationPrimitiveType* NodeType::findmanagedPrimitiveTypesByID(std::string id){
PRINTF("END -- findByID " <<managedPrimitiveTypes[id] << " ");
return managedPrimitiveTypes[id];
}
AdaptationPrimitiveTypeRef* NodeType::findmanagedPrimitiveTypeRefsByID(std::string id){
PRINTF("END -- findByID " <<managedPrimitiveTypeRefs[id] << " ");
return managedPrimitiveTypeRefs[id];
}




void NodeType::addmanagedPrimitiveTypes(AdaptationPrimitiveType *ptr)
{
    PRINTF("BEGIN -- NodeType addmanagedPrimitiveTypes");
    AdaptationPrimitiveType  *container = (AdaptationPrimitiveType *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addmanagedPrimitiveTypes " << endl;
    }else
    {

        if(managedPrimitiveTypes.find(container->internalGetKey()) == managedPrimitiveTypes.end())
        {
            PRINTF("KEY -- NodeType managedPrimitiveTypes  "<< container->internalGetKey() );
            managedPrimitiveTypes[container->internalGetKey()]=ptr;
            any ptr_any = container;
RemoveFromContainerCommand  *cmd = new  RemoveFromContainerCommand(this,REMOVE,"managedPrimitiveTypes",ptr_any);
container->setEContainer(this,cmd,"managedPrimitiveTypes");

        }
    }
    PRINTF("END -- NodeType  addmanagedPrimitiveTypes");
}






void NodeType::addmanagedPrimitiveTypeRefs(AdaptationPrimitiveTypeRef *ptr)
{
    PRINTF("BEGIN -- NodeType addmanagedPrimitiveTypeRefs");
    AdaptationPrimitiveTypeRef  *container = (AdaptationPrimitiveTypeRef *)ptr;
    if(container->internalGetKey().empty())
    {
        cout << " KEY EMPTY addmanagedPrimitiveTypeRefs " << endl;
    }else
    {

        if(managedPrimitiveTypeRefs.find(container->internalGetKey()) == managedPrimitiveTypeRefs.end())
        {
            PRINTF("KEY -- NodeType managedPrimitiveTypeRefs  "<< container->internalGetKey() );
            managedPrimitiveTypeRefs[container->internalGetKey()]=ptr;
            
        }
    }
    PRINTF("END -- NodeType  addmanagedPrimitiveTypeRefs");
}






void NodeType::removemanagedPrimitiveTypes(AdaptationPrimitiveType *ptr)
{
    PRINTF("BEGIN -- NodeType removemanagedPrimitiveTypes");
    AdaptationPrimitiveType *container = (AdaptationPrimitiveType*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for managedPrimitiveTypes");
    }
    else
    {
        PRINTF("KEY -- NodeType managedPrimitiveTypes  "<< container->internalGetKey() );
        managedPrimitiveTypes.set_deleted_key(container->internalGetKey());
        managedPrimitiveTypes.erase( managedPrimitiveTypes.find(container->internalGetKey()));
        managedPrimitiveTypes.clear_deleted_key();
        
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- NodeType removemanagedPrimitiveTypes");
}






void NodeType::removemanagedPrimitiveTypeRefs(AdaptationPrimitiveTypeRef *ptr)
{
    PRINTF("BEGIN -- NodeType removemanagedPrimitiveTypeRefs");
    AdaptationPrimitiveTypeRef *container = (AdaptationPrimitiveTypeRef*)ptr;
    if(container->internalGetKey().empty())
    {
        PRINTF_ERROR("the key is empty for managedPrimitiveTypeRefs");
    }
    else
    {
        PRINTF("KEY -- NodeType managedPrimitiveTypeRefs  "<< container->internalGetKey() );
        managedPrimitiveTypeRefs.set_deleted_key(container->internalGetKey());
        managedPrimitiveTypeRefs.erase( managedPrimitiveTypeRefs.find(container->internalGetKey()));
        managedPrimitiveTypeRefs.clear_deleted_key();
        delete container;
        container->setEContainer(NULL,NULL,"");
    }
    PRINTF("END -- NodeType removemanagedPrimitiveTypeRefs");
}


string NodeType::metaClassName() {
return "NodeType";
}
void NodeType::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator NodeType"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
} else if(refName.compare("factoryBean")==0){
factoryBean= AnyCast<string>(value);
} else if(refName.compare("bean")==0){
bean= AnyCast<string>(value);
} else if(refName.compare("abstract")==0){
if(AnyCast<string>(value).compare("true") == 0){
abstract= true;
}else { 
abstract= false;
}
} else if(refName.compare("startMethod")==0){
startMethod= AnyCast<string>(value);
} else if(refName.compare("stopMethod")==0){
stopMethod= AnyCast<string>(value);
} else if(refName.compare("updateMethod")==0){
updateMethod= AnyCast<string>(value);
}

if(refName.compare("deployUnits")==0){
if(mutatorType ==ADD){
adddeployUnits((DeployUnit*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedeployUnits((DeployUnit*)AnyCast<DeployUnit*>(value));
}
} else if(refName.compare("dictionaryType")==0){
if(mutatorType ==ADD){
adddictionaryType((DictionaryType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removedictionaryType((DictionaryType*)AnyCast<DictionaryType*>(value));
}
} else if(refName.compare("superTypes")==0){
if(mutatorType ==ADD){
addsuperTypes((TypeDefinition*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removesuperTypes((TypeDefinition*)AnyCast<TypeDefinition*>(value));
}
} else if(refName.compare("managedPrimitiveTypes")==0){
if(mutatorType ==ADD){
addmanagedPrimitiveTypes((AdaptationPrimitiveType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removemanagedPrimitiveTypes((AdaptationPrimitiveType*)AnyCast<AdaptationPrimitiveType*>(value));
}
} else if(refName.compare("managedPrimitiveTypeRefs")==0){
if(mutatorType ==ADD){
addmanagedPrimitiveTypeRefs((AdaptationPrimitiveTypeRef*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removemanagedPrimitiveTypeRefs((AdaptationPrimitiveTypeRef*)AnyCast<AdaptationPrimitiveTypeRef*>(value));
}
}

PRINTF("END -- reflexiveMutator NodeType "); 
}

KMFContainer* NodeType::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID NodeType" << relationName << " " << idP);
if(relationName.compare("deployUnits")== 0){
return (KMFContainer*)finddeployUnitsByID(idP);
}

if(relationName.compare("dictionaryType")== 0){
return dictionaryType;
}

if(relationName.compare("superTypes")== 0){
return (KMFContainer*)findsuperTypesByID(idP);
}

if(relationName.compare("managedPrimitiveTypes")== 0){
return (KMFContainer*)findmanagedPrimitiveTypesByID(idP);
}

if(relationName.compare("managedPrimitiveTypeRefs")== 0){
return (KMFContainer*)findmanagedPrimitiveTypeRefsByID(idP);
}

PRINTF("END -- findByID NodeType");
return NULL;

}





void NodeType::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("NodeType --> Visiting class NodeType");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        



visitor->beginVisitRef("managedPrimitiveTypeRefs","org.kevoree.AdaptationPrimitiveTypeRef");
for ( google::dense_hash_map<string,AdaptationPrimitiveTypeRef*>::iterator it = managedPrimitiveTypeRefs.begin();  it != managedPrimitiveTypeRefs.end(); ++it)
{
    AdaptationPrimitiveTypeRef * current =(AdaptationPrimitiveTypeRef*) it->second;
    PRINTF("NodeType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"managedPrimitiveTypeRefs");
}
visitor->endVisitRef("managedPrimitiveTypeRefs");
    }
    if(nonContainedReference)
    {
        



visitor->beginVisitRef("deployUnits","org.kevoree.DeployUnit");
for ( google::dense_hash_map<string,DeployUnit*>::iterator it = deployUnits.begin();  it != deployUnits.end(); ++it)
{
    DeployUnit * current =(DeployUnit*) it->second;
    PRINTF("NodeType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"deployUnits");
}
visitor->endVisitRef("deployUnits");



visitor->beginVisitRef("superTypes","org.kevoree.TypeDefinition");
for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = superTypes.begin();  it != superTypes.end(); ++it)
{
    TypeDefinition * current =(TypeDefinition*) it->second;
    PRINTF("NodeType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"superTypes");
}
visitor->endVisitRef("superTypes");



visitor->beginVisitRef("managedPrimitiveTypes","org.kevoree.AdaptationPrimitiveType");
for ( google::dense_hash_map<string,AdaptationPrimitiveType*>::iterator it = managedPrimitiveTypes.begin();  it != managedPrimitiveTypes.end(); ++it)
{
    AdaptationPrimitiveType * current =(AdaptationPrimitiveType*) it->second;
    PRINTF("NodeType --> Visiting  "<< current->path()<< "");
    internal_visit(visitor,current,recursive,containedReference,nonContainedReference,"managedPrimitiveTypes");
}
visitor->endVisitRef("managedPrimitiveTypes");
    }
    visitor->endVisitElem(this);
}


void NodeType::visitAttributes(ModelAttributeVisitor *visitor){
}
NodeType::NodeType(){

managedPrimitiveTypes.set_empty_key("");
managedPrimitiveTypeRefs.set_empty_key("");

}

NodeType::~NodeType(){






for ( google::dense_hash_map<string,AdaptationPrimitiveTypeRef*>::iterator it = managedPrimitiveTypeRefs.begin();  it != managedPrimitiveTypeRefs.end(); ++it)
{
AdaptationPrimitiveTypeRef * current = it->second;
if(current != NULL)
{
    delete current;
}

}

managedPrimitiveTypeRefs.clear();


}

std::string AdaptationPrimitiveType::internalGetKey(){
return name;
}
string AdaptationPrimitiveType::metaClassName() {
return "AdaptationPrimitiveType";
}
void AdaptationPrimitiveType::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator AdaptationPrimitiveType"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("name")==0){
name= AnyCast<string>(value);
}

PRINTF("END -- reflexiveMutator AdaptationPrimitiveType "); 
}





void AdaptationPrimitiveType::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("AdaptationPrimitiveType --> Visiting class AdaptationPrimitiveType");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void AdaptationPrimitiveType::visitAttributes(ModelAttributeVisitor *visitor){
}
AdaptationPrimitiveType::AdaptationPrimitiveType(){


}

AdaptationPrimitiveType::~AdaptationPrimitiveType(){



}

std::string AdaptationPrimitiveTypeRef::internalGetKey(){
return generated_KMF_ID;
}
void AdaptationPrimitiveTypeRef::addref(AdaptationPrimitiveType *ptr){
ref =ptr;
}

void AdaptationPrimitiveTypeRef::removeref(AdaptationPrimitiveType *ptr){
delete ptr;
}

string AdaptationPrimitiveTypeRef::metaClassName() {
return "AdaptationPrimitiveTypeRef";
}
void AdaptationPrimitiveTypeRef::reflexiveMutator(int mutatorType,string refName, any value, bool setOpposite,bool fireEvent){
PRINTF("BEGIN -- reflexiveMutator AdaptationPrimitiveTypeRef"<< "  mutatorType " << mutatorType << " " << refName); 
if(refName.compare("maxTime")==0){
maxTime= AnyCast<string>(value);
} else if(refName.compare("generated_KMF_ID")==0){
generated_KMF_ID= AnyCast<string>(value);
}

if(refName.compare("ref")==0){
if(mutatorType ==ADD){
addref((AdaptationPrimitiveType*)AnyCast<KMFContainer*>(value));
}else if(mutatorType == REMOVE){
removeref((AdaptationPrimitiveType*)AnyCast<AdaptationPrimitiveType*>(value));
}
}

PRINTF("END -- reflexiveMutator AdaptationPrimitiveTypeRef "); 
}

KMFContainer* AdaptationPrimitiveTypeRef::findByID(string relationName,string idP){
PRINTF("BEGIN -- findByID AdaptationPrimitiveTypeRef" << relationName << " " << idP);
if(relationName.compare("ref")== 0){
return ref;
}

PRINTF("END -- findByID AdaptationPrimitiveTypeRef");
return NULL;

}





void AdaptationPrimitiveTypeRef::visit(ModelVisitor *visitor,bool recursive,bool containedReference ,bool nonContainedReference)
{
    PRINTF("AdaptationPrimitiveTypeRef --> Visiting class AdaptationPrimitiveTypeRef");
      visitor->beginVisitElem(this);
    if(containedReference)
    {
        
    }
    if(nonContainedReference)
    {
        
    }
    visitor->endVisitElem(this);
}


void AdaptationPrimitiveTypeRef::visitAttributes(ModelAttributeVisitor *visitor){
PRINTF("AdaptationPrimitiveTypeRef --> Visiting attribute -> maxTime");
visitor->visit(any(maxTime),"maxTime",this);
PRINTF("AdaptationPrimitiveTypeRef --> Visiting attribute -> generated_KMF_ID");
visitor->visit(any(generated_KMF_ID),"generated_KMF_ID",this);
}
AdaptationPrimitiveTypeRef::AdaptationPrimitiveTypeRef(){


}

AdaptationPrimitiveTypeRef::~AdaptationPrimitiveTypeRef(){



}

