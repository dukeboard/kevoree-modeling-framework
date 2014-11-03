///<reference path="meta/MetaAttribute.ts"/>

interface ModelAttributeVisitor {

  visit(metaAttribute: MetaAttribute, value: any): void;

}

