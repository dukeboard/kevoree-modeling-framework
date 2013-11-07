#include "kevoree.h"

#include <KMFFactory.h>

class DefaultkevoreeFactory : public KMFFactory {
public:
ComponentInstance* createComponentInstance(){return new ComponentInstance();
};
ComponentType* createComponentType(){return new ComponentType();
};
ContainerNode* createContainerNode(){return new ContainerNode();
};
ContainerRoot* createContainerRoot(){return new ContainerRoot();
};
Port* createPort(){return new Port();
};
_Namespace* create_Namespace(){return new _Namespace();
};
Dictionary* createDictionary(){return new Dictionary();
};
DictionaryType* createDictionaryType(){return new DictionaryType();
};
DictionaryAttribute* createDictionaryAttribute(){return new DictionaryAttribute();
};
DictionaryValue* createDictionaryValue(){return new DictionaryValue();
};
CompositeType* createCompositeType(){return new CompositeType();
};
PortTypeRef* createPortTypeRef(){return new PortTypeRef();
};
Wire* createWire(){return new Wire();
};
ServicePortType* createServicePortType(){return new ServicePortType();
};
Operation* createOperation(){return new Operation();
};
Parameter* createParameter(){return new Parameter();
};
TypedElement* createTypedElement(){return new TypedElement();
};
MessagePortType* createMessagePortType(){return new MessagePortType();
};
Repository* createRepository(){return new Repository();
};
DeployUnit* createDeployUnit(){return new DeployUnit();
};
TypeLibrary* createTypeLibrary(){return new TypeLibrary();
};
NamedElement* createNamedElement(){return new NamedElement();
};
IntegrationPattern* createIntegrationPattern(){return new IntegrationPattern();
};
ExtraFonctionalProperty* createExtraFonctionalProperty(){return new ExtraFonctionalProperty();
};
PortTypeMapping* createPortTypeMapping(){return new PortTypeMapping();
};
Channel* createChannel(){return new Channel();
};
MBinding* createMBinding(){return new MBinding();
};
NodeNetwork* createNodeNetwork(){return new NodeNetwork();
};
NodeLink* createNodeLink(){return new NodeLink();
};
NetworkProperty* createNetworkProperty(){return new NetworkProperty();
};
ChannelType* createChannelType(){return new ChannelType();
};
Instance* createInstance(){return new Instance();
};
Group* createGroup(){return new Group();
};
GroupType* createGroupType(){return new GroupType();
};
NodeType* createNodeType(){return new NodeType();
};
AdaptationPrimitiveType* createAdaptationPrimitiveType(){return new AdaptationPrimitiveType();
};
AdaptationPrimitiveTypeRef* createAdaptationPrimitiveTypeRef(){return new AdaptationPrimitiveTypeRef();
};
KMFContainer* create(std::string metaClassName){
if(metaClassName.compare("org.kevoree.ComponentInstance")==0){
return createComponentInstance();
}
if(metaClassName.compare("org.kevoree.ComponentType")==0){
return createComponentType();
}
if(metaClassName.compare("org.kevoree.ContainerNode")==0){
return createContainerNode();
}
if(metaClassName.compare("org.kevoree.ContainerRoot")==0){
return createContainerRoot();
}
if(metaClassName.compare("org.kevoree.Port")==0){
return createPort();
}
if(metaClassName.compare("org.kevoree._Namespace")==0){
return create_Namespace();
}
if(metaClassName.compare("org.kevoree.Dictionary")==0){
return createDictionary();
}
if(metaClassName.compare("org.kevoree.DictionaryType")==0){
return createDictionaryType();
}
if(metaClassName.compare("org.kevoree.DictionaryAttribute")==0){
return createDictionaryAttribute();
}
if(metaClassName.compare("org.kevoree.DictionaryValue")==0){
return createDictionaryValue();
}
if(metaClassName.compare("org.kevoree.CompositeType")==0){
return createCompositeType();
}
if(metaClassName.compare("org.kevoree.PortTypeRef")==0){
return createPortTypeRef();
}
if(metaClassName.compare("org.kevoree.Wire")==0){
return createWire();
}
if(metaClassName.compare("org.kevoree.ServicePortType")==0){
return createServicePortType();
}
if(metaClassName.compare("org.kevoree.Operation")==0){
return createOperation();
}
if(metaClassName.compare("org.kevoree.Parameter")==0){
return createParameter();
}
if(metaClassName.compare("org.kevoree.TypedElement")==0){
return createTypedElement();
}
if(metaClassName.compare("org.kevoree.MessagePortType")==0){
return createMessagePortType();
}
if(metaClassName.compare("org.kevoree.Repository")==0){
return createRepository();
}
if(metaClassName.compare("org.kevoree.DeployUnit")==0){
return createDeployUnit();
}
if(metaClassName.compare("org.kevoree.TypeLibrary")==0){
return createTypeLibrary();
}
if(metaClassName.compare("org.kevoree.NamedElement")==0){
return createNamedElement();
}
if(metaClassName.compare("org.kevoree.IntegrationPattern")==0){
return createIntegrationPattern();
}
if(metaClassName.compare("org.kevoree.ExtraFonctionalProperty")==0){
return createExtraFonctionalProperty();
}
if(metaClassName.compare("org.kevoree.PortTypeMapping")==0){
return createPortTypeMapping();
}
if(metaClassName.compare("org.kevoree.Channel")==0){
return createChannel();
}
if(metaClassName.compare("org.kevoree.MBinding")==0){
return createMBinding();
}
if(metaClassName.compare("org.kevoree.NodeNetwork")==0){
return createNodeNetwork();
}
if(metaClassName.compare("org.kevoree.NodeLink")==0){
return createNodeLink();
}
if(metaClassName.compare("org.kevoree.NetworkProperty")==0){
return createNetworkProperty();
}
if(metaClassName.compare("org.kevoree.ChannelType")==0){
return createChannelType();
}
if(metaClassName.compare("org.kevoree.Instance")==0){
return createInstance();
}
if(metaClassName.compare("org.kevoree.Group")==0){
return createGroup();
}
if(metaClassName.compare("org.kevoree.GroupType")==0){
return createGroupType();
}
if(metaClassName.compare("org.kevoree.NodeType")==0){
return createNodeType();
}
if(metaClassName.compare("org.kevoree.AdaptationPrimitiveType")==0){
return createAdaptationPrimitiveType();
}
if(metaClassName.compare("org.kevoree.AdaptationPrimitiveTypeRef")==0){
return createAdaptationPrimitiveTypeRef();
}
return NULL;
}
};