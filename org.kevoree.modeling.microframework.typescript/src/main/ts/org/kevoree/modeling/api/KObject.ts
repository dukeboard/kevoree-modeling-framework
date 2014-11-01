///<reference path="meta/MetaAttribute.ts"/>
///<reference path="meta/MetaClass.ts"/>
///<reference path="meta/MetaOperation.ts"/>
///<reference path="meta/MetaReference.ts"/>
///<reference path="time/TimeTree.ts"/>
///<reference path="trace/ModelTrace.ts"/>
///<reference path="../../../../java/util/List.ts"/>

interface KObject<A extends KObject<any,any>, B extends KView> {

  isDirty(): boolean;

  dimension(): KDimension<any,any,any>;

  isDeleted(): boolean;

  isRoot(): boolean;

  uuid(): number;

  path(callback: Callback<string>): void;

  view(): B;

  delete(callback: Callback<boolean>): void;

  parent(callback: Callback<KObject<any,any>>): void;

  parentUuid(): number;

  select(query: string, callback: Callback<List<KObject<any,any>>>): void;

  stream(query: string, callback: Callback<KObject<any,any>>): void;

  listen(listener: ModelListener): void;

  visitAttributes(visitor: ModelAttributeVisitor): void;

  visit(visitor: ModelVisitor, end: Callback<Throwable>): void;

  graphVisit(visitor: ModelVisitor, end: Callback<Throwable>): void;

  treeVisit(visitor: ModelVisitor, end: Callback<Throwable>): void;

  now(): number;

  jump(time: number, callback: Callback<A>): void;

  timeTree(): TimeTree;

  referenceInParent(): MetaReference;

  domainKey(): string;

  metaClass(): MetaClass;

  metaAttributes(): MetaAttribute[];

  metaReferences(): MetaReference[];

  metaOperations(): MetaOperation[];

  metaAttribute(name: string): MetaAttribute;

  metaReference(name: string): MetaReference;

  metaOperation(name: string): MetaOperation;

  mutate(actionType: KActionType, metaReference: MetaReference, param: KObject<any,any>, setOpposite: boolean): void;

  each<C> (metaReference: MetaReference, callback: Callback<C>, end: Callback<Throwable>): void;

  inbounds(callback: Callback<InboundReference>, end: Callback<Throwable>): void;

  traces(request: TraceRequest): List<ModelTrace>;

  get(attribute: MetaAttribute): any;

  set(attribute: MetaAttribute, payload: any): void;

  toJSON(): string;

}

