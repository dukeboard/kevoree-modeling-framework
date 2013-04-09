




package org.kevoree.impl;

import org.kevoree.KevoreeFactory;
import org.kevoree.ComponentInstance;
import org.kevoree.ComponentType;
import org.kevoree.ContainerNode;
import org.kevoree.ContainerRoot;
import org.kevoree.PortType;
import org.kevoree.Port;
import org.kevoree.Namespace;
import org.kevoree.Dictionary;
import org.kevoree.DictionaryType;
import org.kevoree.DictionaryAttribute;
import org.kevoree.DictionaryValue;
import org.kevoree.CompositeType;
import org.kevoree.PortTypeRef;
import org.kevoree.Wire;
import org.kevoree.ServicePortType;
import org.kevoree.Operation;
import org.kevoree.Parameter;
import org.kevoree.TypedElement;
import org.kevoree.MessagePortType;
import org.kevoree.Repository;
import org.kevoree.DeployUnit;
import org.kevoree.TypeLibrary;
import org.kevoree.NamedElement;
import org.kevoree.IntegrationPattern;
import org.kevoree.ExtraFonctionalProperty;
import org.kevoree.PortTypeMapping;
import org.kevoree.Channel;
import org.kevoree.MBinding;
import org.kevoree.NodeNetwork;
import org.kevoree.NodeLink;
import org.kevoree.NetworkProperty;
import org.kevoree.ChannelType;
import org.kevoree.TypeDefinition;
import org.kevoree.Instance;
import org.kevoree.LifeCycleTypeDefinition;
import org.kevoree.Group;
import org.kevoree.GroupType;
import org.kevoree.NodeType;
import org.kevoree.AdaptationPrimitiveType;

open class DefaultKevoreeFactory : KevoreeFactory {

override fun getVersion() : String { return "1.0.0" }

override fun createComponentInstance() : ComponentInstance { return ComponentInstanceImpl() }
override fun createComponentType() : ComponentType { return ComponentTypeImpl() }
override fun createContainerNode() : ContainerNode { return ContainerNodeImpl() }
override fun createContainerRoot() : ContainerRoot { return ContainerRootImpl() }
override fun createPortType() : PortType { return PortTypeImpl() }
override fun createPort() : Port { return PortImpl() }
override fun createNamespace() : Namespace { return NamespaceImpl() }
override fun createDictionary() : Dictionary { return DictionaryImpl() }
override fun createDictionaryType() : DictionaryType { return DictionaryTypeImpl() }
override fun createDictionaryAttribute() : DictionaryAttribute { return DictionaryAttributeImpl() }
override fun createDictionaryValue() : DictionaryValue { return DictionaryValueImpl() }
override fun createCompositeType() : CompositeType { return CompositeTypeImpl() }
override fun createPortTypeRef() : PortTypeRef { return PortTypeRefImpl() }
override fun createWire() : Wire { return WireImpl() }
override fun createServicePortType() : ServicePortType { return ServicePortTypeImpl() }
override fun createOperation() : Operation { return OperationImpl() }
override fun createParameter() : Parameter { return ParameterImpl() }
override fun createTypedElement() : TypedElement { return TypedElementImpl() }
override fun createMessagePortType() : MessagePortType { return MessagePortTypeImpl() }
override fun createRepository() : Repository { return RepositoryImpl() }
override fun createDeployUnit() : DeployUnit { return DeployUnitImpl() }
override fun createTypeLibrary() : TypeLibrary { return TypeLibraryImpl() }
override fun createNamedElement() : NamedElement { return NamedElementImpl() }
override fun createIntegrationPattern() : IntegrationPattern { return IntegrationPatternImpl() }
override fun createExtraFonctionalProperty() : ExtraFonctionalProperty { return ExtraFonctionalPropertyImpl() }
override fun createPortTypeMapping() : PortTypeMapping { return PortTypeMappingImpl() }
override fun createChannel() : Channel { return ChannelImpl() }
override fun createMBinding() : MBinding { return MBindingImpl() }
override fun createNodeNetwork() : NodeNetwork { return NodeNetworkImpl() }
override fun createNodeLink() : NodeLink { return NodeLinkImpl() }
override fun createNetworkProperty() : NetworkProperty { return NetworkPropertyImpl() }
override fun createChannelType() : ChannelType { return ChannelTypeImpl() }
override fun createTypeDefinition() : TypeDefinition { return TypeDefinitionImpl() }
override fun createInstance() : Instance { return InstanceImpl() }
override fun createLifeCycleTypeDefinition() : LifeCycleTypeDefinition { return LifeCycleTypeDefinitionImpl() }
override fun createGroup() : Group { return GroupImpl() }
override fun createGroupType() : GroupType { return GroupTypeImpl() }
override fun createNodeType() : NodeType { return NodeTypeImpl() }
override fun createAdaptationPrimitiveType() : AdaptationPrimitiveType { return AdaptationPrimitiveTypeImpl() }

}