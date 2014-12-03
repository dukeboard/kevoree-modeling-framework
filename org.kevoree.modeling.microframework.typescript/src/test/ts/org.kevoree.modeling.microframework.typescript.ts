module org {
    export module kevoree {
        export module modeling {
            export module microframework {
                export module test {
                    export class CallbackTester {

                        public callbackTest(): void {
                            var big: string[] = new Array();
                            for (var i: number = 0; i < big.length; i++) {
                                big[i] = "say_" + i;
                            }
                            org.kevoree.modeling.api.util.Helper.forall(big,  (s : string, next : (p : java.lang.Throwable) => void) => {
                                next(null);
                            },  (t : java.lang.Throwable) => {
                            });
                        }

                    }

                    export module cloud {
                        export class CloudDimension extends org.kevoree.modeling.api.abs.AbstractKDimension<any, any, any> {

                            constructor(univers: org.kevoree.modeling.api.KUniverse<any>, key: number) {
                                super(univers, key);
                            }

                            public internal_create(timePoint: number): org.kevoree.modeling.microframework.test.cloud.CloudView {
                                return new org.kevoree.modeling.microframework.test.cloud.impl.CloudViewImpl(timePoint, this);
                            }

                        }

                        export class CloudUniverse extends org.kevoree.modeling.api.abs.AbstractKUniverse<any> {

                            constructor() {
                                super();
                            }

                            public internal_create(key: number): org.kevoree.modeling.microframework.test.cloud.CloudDimension {
                                return new org.kevoree.modeling.microframework.test.cloud.CloudDimension(this, key);
                            }

                        }

                        export interface CloudView extends org.kevoree.modeling.api.KView {

                            createNode(): org.kevoree.modeling.microframework.test.cloud.Node;

                            createElement(): org.kevoree.modeling.microframework.test.cloud.Element;

                        }

                        export module CloudView { 
                            export class METACLASSES implements org.kevoree.modeling.api.meta.MetaClass {

                                public static ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE: METACLASSES = new METACLASSES("org.kevoree.modeling.microframework.test.cloud.Node", 0);
                                public static ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT: METACLASSES = new METACLASSES("org.kevoree.modeling.microframework.test.cloud.Element", 1);
                                private _name: string;
                                private _index: number;
                                public index(): number {
                                    return this._index;
                                }

                                public metaName(): string {
                                    return this._name;
                                }

                                constructor(name: string, index: number) {
                                    this._name = name;
                                    this._index = index;
                                }

                                public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                                    if (this._index == 0) {
                                        return org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.values();
                                    }
                                    if (this._index == 1) {
                                        return org.kevoree.modeling.microframework.test.cloud.Element.METAATTRIBUTES.values();
                                    }
                                    return new Array();
                                }

                                public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                                    if (this._index == 0) {
                                        return org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.values();
                                    }
                                    return new Array();
                                }

                                public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
                                    if (this._index == 0) {
                                        return org.kevoree.modeling.microframework.test.cloud.Node.METAOPERATIONS.values();
                                    }
                                    return new Array();
                                }

                                public metaAttribute(name: string): org.kevoree.modeling.api.meta.MetaAttribute {
                                    var atts: org.kevoree.modeling.api.meta.MetaAttribute[] = this.metaAttributes();
                                    for (var i: number = 0; i < atts.length; i++) {
                                        if (atts[i].metaName().equals(name)) {
                                            return atts[i];
                                        }
                                    }
                                    return null;
                                }

                                public metaReference(name: string): org.kevoree.modeling.api.meta.MetaReference {
                                    var refs: org.kevoree.modeling.api.meta.MetaReference[] = this.metaReferences();
                                    for (var i: number = 0; i < refs.length; i++) {
                                        if (refs[i].metaName().equals(name)) {
                                            return refs[i];
                                        }
                                    }
                                    return null;
                                }

                                public metaOperation(name: string): org.kevoree.modeling.api.meta.MetaOperation {
                                    var ops: org.kevoree.modeling.api.meta.MetaOperation[] = this.metaOperations();
                                    for (var i: number = 0; i < ops.length; i++) {
                                        if (ops[i].metaName().equals(name)) {
                                            return ops[i];
                                        }
                                    }
                                    return null;
                                }

                                public equals(other: any): boolean {
                                    return this == other;
                                }
                                public static _METACLASSESVALUES : METACLASSES[] = [
                                    METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE
                                    ,METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT
                                ];
                                public static values():METACLASSES[]{
                                    return METACLASSES._METACLASSESVALUES;
                                }
                            }


                        }
                        export interface Element extends org.kevoree.modeling.api.KObject<any, any> {

                            getName(): string;

                            setName(name: string): org.kevoree.modeling.microframework.test.cloud.Element;

                            getValue(): number;

                            setValue(name: number): org.kevoree.modeling.microframework.test.cloud.Element;

                        }

                        export module Element { 
                            export class METAATTRIBUTES implements org.kevoree.modeling.api.meta.MetaAttribute {

                                public static NAME: METAATTRIBUTES = new METAATTRIBUTES("name", 5, 5, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                                public static VALUE: METAATTRIBUTES = new METAATTRIBUTES("value", 6, 5, false, org.kevoree.modeling.api.meta.MetaType.DOUBLE, org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation.instance());
                                private _name: string;
                                private _index: number;
                                private _precision: number;
                                private _key: boolean;
                                private _metaType: org.kevoree.modeling.api.meta.MetaType;
                                private extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation;
                                public metaType(): org.kevoree.modeling.api.meta.MetaType {
                                    return this._metaType;
                                }

                                public index(): number {
                                    return this._index;
                                }

                                public metaName(): string {
                                    return this._name;
                                }

                                public precision(): number {
                                    return this._precision;
                                }

                                public key(): boolean {
                                    return this._key;
                                }

                                public origin(): org.kevoree.modeling.api.meta.MetaClass {
                                    return org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT;
                                }

                                public strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                                    return this.extrapolation;
                                }

                                public setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void {
                                    this.extrapolation = extrapolation;
                                }

                                constructor(name: string, index: number, precision: number, key: boolean, metaType: org.kevoree.modeling.api.meta.MetaType, extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation) {
                                    this._name = name;
                                    this._index = index;
                                    this._precision = precision;
                                    this._key = key;
                                    this._metaType = metaType;
                                    this.extrapolation = extrapolation;
                                }

                                public equals(other: any): boolean {
                                    return this == other;
                                }
                                public static _METAATTRIBUTESVALUES : METAATTRIBUTES[] = [
                                    METAATTRIBUTES.NAME
                                    ,METAATTRIBUTES.VALUE
                                ];
                                public static values():METAATTRIBUTES[]{
                                    return METAATTRIBUTES._METAATTRIBUTESVALUES;
                                }
                            }


                        }
                        export module impl {
                            export class CloudViewImpl extends org.kevoree.modeling.api.abs.AbstractKView implements org.kevoree.modeling.microframework.test.cloud.CloudView {

                                constructor(now: number, dimension: org.kevoree.modeling.api.KDimension<any, any, any>) {
                                    super(now, dimension);
                                }

                                public internalCreate(p_clazz: org.kevoree.modeling.api.meta.MetaClass, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_key: number): org.kevoree.modeling.api.KObject<any, any> {
                                    if (p_clazz == null) {
                                        return null;
                                    }
                                    switch (p_clazz.index()) {
                                        case 0: 
                                        return new org.kevoree.modeling.microframework.test.cloud.impl.NodeImpl(this, p_key, p_timeTree, p_clazz);
                                        case 1: 
                                        return new org.kevoree.modeling.microframework.test.cloud.impl.ElementImpl(this, p_key, p_timeTree, p_clazz);
                                        default: 
                                        return null;
                                    }
                                }

                                public metaClasses(): org.kevoree.modeling.api.meta.MetaClass[] {
                                    return org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.values();
                                }

                                public createNode(): org.kevoree.modeling.microframework.test.cloud.Node {
                                    return <org.kevoree.modeling.microframework.test.cloud.Node>this.create(org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE);
                                }

                                public createElement(): org.kevoree.modeling.microframework.test.cloud.Element {
                                    return <org.kevoree.modeling.microframework.test.cloud.Element>this.create(org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT);
                                }

                            }

                            export class ElementImpl extends org.kevoree.modeling.api.abs.AbstractKObject<any, any> implements org.kevoree.modeling.microframework.test.cloud.Element {

                                private _mataReferences: org.kevoree.modeling.api.meta.MetaReference[] = new Array();
                                constructor(factory: org.kevoree.modeling.microframework.test.cloud.CloudView, kid: number, timeTree: org.kevoree.modeling.api.time.TimeTree, p_metaclass: org.kevoree.modeling.api.meta.MetaClass) {
                                    super(factory, kid, timeTree, p_metaclass);
                                }

                                public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                                    return org.kevoree.modeling.microframework.test.cloud.Element.METAATTRIBUTES.values();
                                }

                                public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                                    return this._mataReferences;
                                }

                                public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
                                    return new Array();
                                }

                                public getName(): string {
                                    return <string>this.get(org.kevoree.modeling.microframework.test.cloud.Element.METAATTRIBUTES.NAME);
                                }

                                public setName(p_name: string): org.kevoree.modeling.microframework.test.cloud.Element {
                                    this.set(org.kevoree.modeling.microframework.test.cloud.Element.METAATTRIBUTES.NAME, p_name);
                                    return this;
                                }

                                public getValue(): number {
                                    return <number>this.get(org.kevoree.modeling.microframework.test.cloud.Element.METAATTRIBUTES.VALUE);
                                }

                                public setValue(p_name: number): org.kevoree.modeling.microframework.test.cloud.Element {
                                    this.set(org.kevoree.modeling.microframework.test.cloud.Element.METAATTRIBUTES.VALUE, p_name);
                                    return this;
                                }

                            }

                            export class NodeImpl extends org.kevoree.modeling.api.abs.AbstractKObject<any, any> implements org.kevoree.modeling.microframework.test.cloud.Node {

                                constructor(p_factory: org.kevoree.modeling.microframework.test.cloud.CloudView, p_uuid: number, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_clazz: org.kevoree.modeling.api.meta.MetaClass) {
                                    super(p_factory, p_uuid, p_timeTree, p_clazz);
                                }

                                public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                                    return org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.values();
                                }

                                public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                                    return org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.values();
                                }

                                public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
                                    return org.kevoree.modeling.microframework.test.cloud.Node.METAOPERATIONS.values();
                                }

                                public getName(): string {
                                    return <string>this.get(org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.NAME);
                                }

                                public setName(p_name: string): org.kevoree.modeling.microframework.test.cloud.Node {
                                    this.set(org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.NAME, p_name);
                                    return this;
                                }

                                public getValue(): string {
                                    return <string>this.get(org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.VALUE);
                                }

                                public setValue(p_value: string): org.kevoree.modeling.microframework.test.cloud.Node {
                                    this.set(org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.VALUE, p_value);
                                    return this;
                                }

                                public addChildren(p_obj: org.kevoree.modeling.microframework.test.cloud.Node): org.kevoree.modeling.microframework.test.cloud.Node {
                                    this.mutate(org.kevoree.modeling.api.KActionType.ADD, org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.CHILDREN, p_obj, true);
                                    return this;
                                }

                                public removeChildren(p_obj: org.kevoree.modeling.microframework.test.cloud.Node): org.kevoree.modeling.microframework.test.cloud.Node {
                                    this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.CHILDREN, p_obj, true);
                                    return this;
                                }

                                public eachChildren(p_callback: (p : org.kevoree.modeling.microframework.test.cloud.Node) => void, p_end: (p : java.lang.Throwable) => void): void {
                                    this.each(org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.CHILDREN, p_callback, p_end);
                                }

                                public setElement(p_obj: org.kevoree.modeling.microframework.test.cloud.Element): org.kevoree.modeling.microframework.test.cloud.Node {
                                    this.mutate(org.kevoree.modeling.api.KActionType.SET, org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.ELEMENT, p_obj, true);
                                    return this;
                                }

                                public getElement(p_callback: (p : org.kevoree.modeling.microframework.test.cloud.Element) => void): void {
                                    this.each(org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.ELEMENT, p_callback, null);
                                }

                                public trigger(param: string, callback: (p : string) => void): void {
                                    var internal_params: any[] = new Array();
                                    internal_params[0] = param;
                                    this.view().dimension().universe().storage().operationManager().call(this, org.kevoree.modeling.microframework.test.cloud.Node.METAOPERATIONS.TRIGGER, internal_params,  (o : any) => {
                                        callback(<string>o);
                                    });
                                }

                            }

                        }
                        export interface Node extends org.kevoree.modeling.api.KObject<any, any> {

                            getName(): string;

                            setName(name: string): org.kevoree.modeling.microframework.test.cloud.Node;

                            getValue(): string;

                            setValue(name: string): org.kevoree.modeling.microframework.test.cloud.Node;

                            addChildren(obj: org.kevoree.modeling.microframework.test.cloud.Node): org.kevoree.modeling.microframework.test.cloud.Node;

                            removeChildren(obj: org.kevoree.modeling.microframework.test.cloud.Node): org.kevoree.modeling.microframework.test.cloud.Node;

                            eachChildren(callback: (p : org.kevoree.modeling.microframework.test.cloud.Node) => void, end: (p : java.lang.Throwable) => void): void;

                            setElement(obj: org.kevoree.modeling.microframework.test.cloud.Element): org.kevoree.modeling.microframework.test.cloud.Node;

                            getElement(obj: (p : org.kevoree.modeling.microframework.test.cloud.Element) => void): void;

                            trigger(param: string, callback: (p : string) => void): void;

                        }

                        export module Node { 
                            export class METAATTRIBUTES implements org.kevoree.modeling.api.meta.MetaAttribute {

                                public static NAME: METAATTRIBUTES = new METAATTRIBUTES("name", 5, 5, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                                public static VALUE: METAATTRIBUTES = new METAATTRIBUTES("value", 6, 5, false, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                                private _name: string;
                                private _index: number;
                                private _precision: number;
                                private _key: boolean;
                                private _metaType: org.kevoree.modeling.api.meta.MetaType;
                                private extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation;
                                public metaType(): org.kevoree.modeling.api.meta.MetaType {
                                    return this._metaType;
                                }

                                public origin(): org.kevoree.modeling.api.meta.MetaClass {
                                    return org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
                                }

                                public index(): number {
                                    return this._index;
                                }

                                public metaName(): string {
                                    return this._name;
                                }

                                public precision(): number {
                                    return this._precision;
                                }

                                public key(): boolean {
                                    return this._key;
                                }

                                public strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                                    return this.extrapolation;
                                }

                                public setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void {
                                    this.extrapolation = extrapolation;
                                }

                                constructor(name: string, index: number, precision: number, key: boolean, metaType: org.kevoree.modeling.api.meta.MetaType, extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation) {
                                    this._name = name;
                                    this._index = index;
                                    this._precision = precision;
                                    this._key = key;
                                    this._metaType = metaType;
                                    this.extrapolation = extrapolation;
                                }

                                public equals(other: any): boolean {
                                    return this == other;
                                }
                                public static _METAATTRIBUTESVALUES : METAATTRIBUTES[] = [
                                    METAATTRIBUTES.NAME
                                    ,METAATTRIBUTES.VALUE
                                ];
                                public static values():METAATTRIBUTES[]{
                                    return METAATTRIBUTES._METAATTRIBUTESVALUES;
                                }
                            }


                            export class METAREFERENCES implements org.kevoree.modeling.api.meta.MetaReference {

                                public static CHILDREN: METAREFERENCES = new METAREFERENCES("children", 7, true, false, org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, null);
                                public static ELEMENT: METAREFERENCES = new METAREFERENCES("element", 8, true, true, org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT, null);
                                private _name: string;
                                private _index: number;
                                private _contained: boolean;
                                private _single: boolean;
                                private _metaType: org.kevoree.modeling.api.meta.MetaClass;
                                private _opposite: org.kevoree.modeling.api.meta.MetaReference;
                                public single(): boolean {
                                    return this._single;
                                }

                                public metaType(): org.kevoree.modeling.api.meta.MetaClass {
                                    return this._metaType;
                                }

                                public opposite(): org.kevoree.modeling.api.meta.MetaReference {
                                    return this._opposite;
                                }

                                public index(): number {
                                    return this._index;
                                }

                                public metaName(): string {
                                    return this._name;
                                }

                                public contained(): boolean {
                                    return this._contained;
                                }

                                public origin(): org.kevoree.modeling.api.meta.MetaClass {
                                    return org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
                                }

                                constructor(name: string, index: number, contained: boolean, single: boolean, metaType: org.kevoree.modeling.api.meta.MetaClass, opposite: org.kevoree.modeling.api.meta.MetaReference) {
                                    this._name = name;
                                    this._index = index;
                                    this._contained = contained;
                                    this._single = single;
                                    this._metaType = metaType;
                                    this._opposite = opposite;
                                }

                                public equals(other: any): boolean {
                                    return this == other;
                                }
                                public static _METAREFERENCESVALUES : METAREFERENCES[] = [
                                    METAREFERENCES.CHILDREN
                                    ,METAREFERENCES.ELEMENT
                                ];
                                public static values():METAREFERENCES[]{
                                    return METAREFERENCES._METAREFERENCESVALUES;
                                }
                            }


                            export class METAOPERATIONS implements org.kevoree.modeling.api.meta.MetaOperation {

                                public static TRIGGER: METAOPERATIONS = new METAOPERATIONS("trigger", 9);
                                private _name: string;
                                private _index: number;
                                public index(): number {
                                    return this._index;
                                }

                                public metaName(): string {
                                    return this._name;
                                }

                                public origin(): org.kevoree.modeling.api.meta.MetaClass {
                                    return org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE;
                                }

                                constructor(name: string, index: number) {
                                    this._name = name;
                                    this._index = index;
                                }

                                public equals(other: any): boolean {
                                    return this == other;
                                }
                                public static _METAOPERATIONSVALUES : METAOPERATIONS[] = [
                                    METAOPERATIONS.TRIGGER
                                ];
                                public static values():METAOPERATIONS[]{
                                    return METAOPERATIONS._METAOPERATIONSVALUES;
                                }
                            }


                        }
                    }
                    export class CloudOperationTest {

                        public static main(args: string[]): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            universe.setOperation(org.kevoree.modeling.microframework.test.cloud.Node.METAOPERATIONS.TRIGGER,  (source : org.kevoree.modeling.api.KObject<any, any>, params : any[], result : (p : any) => void) => {
                                var parameters: string = "[";
                                for (var i: number = 0; i < params.length; i++) {
                                    if (i != 0) {
                                        parameters = parameters + ", ";
                                    }
                                    parameters = parameters + params[i].toString();
                                }
                                parameters = parameters + "]";
                                result("Hey. I received Parameter:" + parameters + " on element:(" + source.dimension() + "," + source.now() + "," + source.uuid() + ")");
                            });
                            var dimension: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            var view: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(0);
                            var n: org.kevoree.modeling.microframework.test.cloud.Node = view.createNode();
                            n.trigger("MyParam",  (s : string) => {
                                System.out.println("Operation execution result :  " + s);
                            });
                        }

                    }

                    export class CompareTest {

                        public diffTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node0_0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_0.setName("node0_0");
                            node0_0.setValue("0_0");
                            var node0_1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_1.setName("node0_1");
                            node0_1.setValue("0_1");
                            t0.diff(node0_0, node0_1,  (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                                org.junit.Assert.assertNotEquals(traceSequence.traces().length, 0);
                                org.junit.Assert.assertEquals("[{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_1\"},\n" + "{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
                            });
                            t0.diff(node0_0, node0_1,  (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                                new org.kevoree.modeling.api.trace.ModelTraceApplicator(node0_0).applyTraceSequence(traceSequence,  (throwable : java.lang.Throwable) => {
                                    org.junit.Assert.assertNull(throwable);
                                    t0.diff(node0_0, node0_1,  (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                                        org.junit.Assert.assertEquals(traceSequence.traces().length, 0);
                                    });
                                });
                            });
                        }

                        public intersectionTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node0_0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_0.setName("node0_0");
                            node0_0.setValue("0_0");
                            var node0_1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_1.setName("node0_1");
                            node0_1.setValue("0_1");
                            t0.intersection(node0_0, node0_1,  (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                                org.junit.Assert.assertEquals(traceSequence.traces().length, 0);
                            });
                            var node0_2: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_2.setName("node0_2");
                            node0_2.setValue("0_1");
                            t0.intersection(node0_2, node0_1,  (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                                org.junit.Assert.assertEquals(traceSequence.traces().length, 1);
                                org.junit.Assert.assertEquals("[{\"type\":\"SET\",\"src\":\"3\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
                            });
                        }

                        public unionTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node0_0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_0.setName("node0_0");
                            node0_0.setValue("0_0");
                            var elem0_0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                            elem0_0.setName("elem0_0");
                            node0_0.setElement(elem0_0);
                            var node0_1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_1.setName("node0_1");
                            node0_1.setValue("0_1");
                            t0.merge(node0_0, node0_1,  (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                                org.junit.Assert.assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_1\"}", traceSequence.traces()[0].toString());
                                org.junit.Assert.assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}", traceSequence.traces()[1].toString());
                                org.junit.Assert.assertEquals("{\"type\":\"ADD\",\"src\":\"1\",\"meta\":\"element\"}", traceSequence.traces()[2].toString());
                                new org.kevoree.modeling.api.trace.ModelTraceApplicator(node0_0).applyTraceSequence(traceSequence,  (throwable : java.lang.Throwable) => {
                                    node0_0.getElement( (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                        org.junit.Assert.assertEquals(elem0_0, element);
                                    });
                                });
                            });
                        }

                    }

                    export class DeleteTest {

                        public basicDeleteTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            var factory: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(0);
                            var n: org.kevoree.modeling.microframework.test.cloud.Node = factory.createNode();
                            factory.setRoot(n, null);
                            dimension.saveUnload( (throwable : java.lang.Throwable) => {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                }
                            });
                            var factory1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(1);
                            var e: org.kevoree.modeling.microframework.test.cloud.Element = factory1.createElement();
                            factory1.select("/",  (results : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                if (results != null && results.length > 0) {
                                    var n2: org.kevoree.modeling.microframework.test.cloud.Node = <org.kevoree.modeling.microframework.test.cloud.Node>results[0];
                                    n2.setElement(e);
                                }
                            });
                            dimension.saveUnload( (throwable : java.lang.Throwable) => {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                }
                            });
                            var factory2: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(2);
                            factory2.select("/",  (results : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                if (results != null && results.length > 0) {
                                    var n2: org.kevoree.modeling.microframework.test.cloud.Node = <org.kevoree.modeling.microframework.test.cloud.Node>results[0];
                                    n2.getElement( (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                        if (element != null) {
                                            element.delete( (throwable : java.lang.Throwable) => {
                                                if (throwable != null) {
                                                    throwable.printStackTrace();
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                            dimension.saveUnload( (throwable : java.lang.Throwable) => {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                }
                            });
                            var factory3: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(3);
                            factory3.select("/",  (results : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                if (results != null && results.length > 0) {
                                    var n2: org.kevoree.modeling.microframework.test.cloud.Node = <org.kevoree.modeling.microframework.test.cloud.Node>results[0];
                                    n2.getElement( (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                        org.junit.Assert.assertNull(element);
                                    });
                                }
                            });
                            var factory2_2: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(2);
                            factory2_2.select("/",  (results : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                if (results != null && results.length > 0) {
                                    var n2: org.kevoree.modeling.microframework.test.cloud.Node = <org.kevoree.modeling.microframework.test.cloud.Node>results[0];
                                    n2.getElement( (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                        org.junit.Assert.assertNotNull(element);
                                    });
                                }
                            });
                        }

                    }

                    export class HelloTest {

                        public helloTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            universe.listen( (evt : org.kevoree.modeling.api.KEvent) => {
                            }, org.kevoree.modeling.api.event.ListenerScope.UNIVERSE);
                            var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            org.junit.Assert.assertNotNull(t0);
                            org.junit.Assert.assertEquals(t0.now(), 0);
                            var nodeT0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            org.junit.Assert.assertNotNull(nodeT0);
                            org.junit.Assert.assertNotNull(nodeT0.uuid());
                            org.junit.Assert.assertNull(nodeT0.getName());
                            org.junit.Assert.assertEquals("name=", nodeT0.domainKey());
                            nodeT0.setName("node0");
                            org.junit.Assert.assertEquals("node0", nodeT0.getName());
                            org.junit.Assert.assertEquals("name=node0", nodeT0.domainKey());
                            org.junit.Assert.assertEquals(0, nodeT0.now());
                            var child0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                            org.junit.Assert.assertNotNull(child0.timeTree());
                            org.junit.Assert.assertTrue(child0.timeTree().last().equals(0));
                            org.junit.Assert.assertTrue(child0.timeTree().first().equals(0));
                            var nodeT1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            nodeT1.setName("n1");
                            nodeT0.addChildren(nodeT1);
                            var refs: java.util.Map<number, number> = <java.util.Map<number, number>>t0.dimension().universe().storage().raw(nodeT1, org.kevoree.modeling.api.data.AccessMode.READ)[1];
                            org.junit.Assert.assertTrue(refs.containsKey(nodeT0.uuid()));
                            var i: number[] = [0];
                            nodeT0.eachChildren( (n : org.kevoree.modeling.microframework.test.cloud.Node) => {
                                i[0]++;
                            }, null);
                            org.junit.Assert.assertEquals(1, i[0]);
                            var nodeT3: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            nodeT3.setName("n3");
                            nodeT1.addChildren(nodeT3);
                            i[0] = 0;
                            var j: number[] = [0];
                            nodeT0.visit( (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                                i[0]++;
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            },  (t : java.lang.Throwable) => {
                                j[0]++;
                            });
                            org.junit.Assert.assertEquals(1, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                            i[0] = 0;
                            j[0] = 0;
                            nodeT1.visit( (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                                i[0]++;
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            },  (t : java.lang.Throwable) => {
                                j[0]++;
                            });
                            org.junit.Assert.assertEquals(1, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                            i[0] = 0;
                            j[0] = 0;
                            nodeT3.visit( (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                                i[0]++;
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            },  (t : java.lang.Throwable) => {
                                j[0]++;
                            });
                            org.junit.Assert.assertEquals(0, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                            i[0] = 0;
                            j[0] = 0;
                            nodeT0.treeVisit( (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                                i[0]++;
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            },  (t : java.lang.Throwable) => {
                                j[0]++;
                            });
                            org.junit.Assert.assertEquals(2, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                            i[0] = 0;
                            j[0] = 0;
                            nodeT0.graphVisit( (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                                i[0]++;
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            },  (t : java.lang.Throwable) => {
                                j[0]++;
                            });
                            org.junit.Assert.assertEquals(2, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                            i[0] = 0;
                            j[0] = 0;
                            nodeT0.graphVisit( (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                                i[0]++;
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            },  (t : java.lang.Throwable) => {
                                j[0]++;
                            });
                            org.junit.Assert.assertEquals(2, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                        }

                    }

                    export class HelperTest {

                        public helperTest(): void {
                            org.junit.Assert.assertNull(org.kevoree.modeling.api.util.Helper.parentPath("/"));
                            org.junit.Assert.assertNull(org.kevoree.modeling.api.util.Helper.parentPath(null));
                            org.junit.Assert.assertNull(org.kevoree.modeling.api.util.Helper.parentPath(""));
                            org.junit.Assert.assertEquals("/", org.kevoree.modeling.api.util.Helper.parentPath("/nodes[name=n0]"));
                            org.junit.Assert.assertEquals("/nodes[name=n0]", org.kevoree.modeling.api.util.Helper.parentPath("/nodes[name=n0]/children[name=c4]"));
                        }

                    }

                    export module json {
                        export class JSONLoadTest {

                            public jsonTest(): void {
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                                universe.connect(null);
                                var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                                var passed: number[] = new Array();
                                var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                time0.json().load("[\n" + "{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"1\",\n" + "\t\"@root\" : \"true\",\n" + "\t\"name\":\"root\",\n" + "\t\"children\": [\"2\",\"3\"],\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"2\",\n" + "\t\"name\":\"n1\",\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"3\",\n" + "\t\"name\":\"n2\",\n" + "}\n" + "]",  (res : java.lang.Throwable) => {
                                    time0.lookup(1,  (r : org.kevoree.modeling.api.KObject<any, any>) => {
                                        org.junit.Assert.assertNotNull(r);
                                        org.junit.Assert.assertTrue(r.isRoot());
                                        passed[0]++;
                                    });
                                    time0.lookup(2,  (r : org.kevoree.modeling.api.KObject<any, any>) => {
                                        org.junit.Assert.assertNotNull(r);
                                        passed[0]++;
                                    });
                                });
                                org.junit.Assert.assertEquals(passed[0], 2);
                            }

                        }

                        export class JSONSaveTest {

                            public jsonTest(): void {
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                                universe.connect(null);
                                var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                                var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var root: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                time0.setRoot(root, null);
                                root.setName("root");
                                var n1: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                n1.setName("n1");
                                var n2: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                n2.setName("n2");
                                root.addChildren(n1);
                                root.addChildren(n2);
                                var result: string[] = new Array();
                                time0.json().save(root,  (model : string, err : java.lang.Throwable) => {
                                    result[0] = model;
                                    if (err != null) {
                                        err.printStackTrace();
                                    }
                                });
                                var payloadResult: string = "[\n" + "{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"1\",\n" + "\t\"@root\" : \"true\",\n" + "\t\"name\" : \"root\",\n" + "\t\"children\" : [\"2\",\"3\"],\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"2\",\n" + "\t\"name\" : \"n1\",\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"3\",\n" + "\t\"name\" : \"n2\",\n" + "}\n" + "]\n";
                                org.junit.Assert.assertEquals(result[0], payloadResult);
                                var pathN2: string[] = [null];
                                n2.path( (p : string) => {
                                    pathN2[0] = p;
                                });
                                org.junit.Assert.assertEquals("/children[name=n2]", pathN2[0]);
                                var pathN1: string[] = [null];
                                n1.path( (p : string) => {
                                    pathN1[0] = p;
                                });
                                org.junit.Assert.assertEquals("/children[name=n1]", pathN1[0]);
                                var pathR: string[] = [null];
                                root.path( (p : string) => {
                                    pathR[0] = p;
                                });
                                org.junit.Assert.assertEquals("/", pathR[0]);
                            }

                        }

                    }
                    export class LookupTest {

                        public lookupTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node.setName("n0");
                            t0.setRoot(node, null);
                            org.junit.Assert.assertTrue(node.isRoot());
                            universe.storage().getRoot(t0,  (resolvedRoot : org.kevoree.modeling.api.KObject<any, any>) => {
                                org.junit.Assert.assertEquals(node, resolvedRoot);
                            });
                            org.junit.Assert.assertTrue(node.isRoot());
                            dimension0.save( (e : java.lang.Throwable) => {
                                var universe2: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                                universe2.setDataBase(universe.storage().dataBase());
                                var dimension0_2: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe2.dimension(dimension0.key());
                                var t0_2: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0_2.time(0);
                                t0_2.lookup(node.uuid(),  (resolved : org.kevoree.modeling.api.KObject<any, any>) => {
                                    org.junit.Assert.assertNotNull(resolved);
                                    t0_2.lookup(node.uuid(),  (resolved2 : org.kevoree.modeling.api.KObject<any, any>) => {
                                        org.junit.Assert.assertEquals(resolved, resolved2);
                                    });
                                    universe2.storage().getRoot(t0_2,  (resolvedRoot : org.kevoree.modeling.api.KObject<any, any>) => {
                                        org.junit.Assert.assertEquals(resolved, resolvedRoot);
                                    });
                                    org.junit.Assert.assertTrue(resolved.isRoot());
                                });
                            });
                        }

                    }

                    export module polynomial {
                        export class PolynomialExtrapolationTest {

                            public test(): void {
                                var toleratedError: number = 5;
                                var pe: org.kevoree.modeling.api.polynomial.DefaultPolynomialModel = new org.kevoree.modeling.api.polynomial.DefaultPolynomialModel(0, toleratedError, 10, 1, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
                                var val: number[] = new Array();
                                var coef: number[] = [2, 2, 3];
                                for (var i: number = 200; i < 1000; i++) {
                                    var temp: number = 1;
                                    val[i] = 0;
                                    for (var j: number = 0; j < coef.length; j++) {
                                        val[i] = val[i] + coef[j] * temp;
                                        temp = temp * i;
                                    }
                                    org.junit.Assert.assertTrue(pe.insert(i, val[i]));
                                }
                                for (var i: number = 200; i < 1000; i++) {
                                    org.junit.Assert.assertTrue((pe.extrapolate(i) - val[i]) < toleratedError);
                                }
                            }

                        }

                        export class PolynomialKMFTest {

                            public test(): void {
                                var nbAssert: number[] = new Array();
                                nbAssert[0] = 0;
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                                universe.connect(null);
                                var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                                var val: number[] = new Array();
                                var coef: number[] = [2, 2, 3];
                                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                node.setName("n0");
                                t0.setRoot(node, null);
                                var element: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                                element.setName("e0");
                                node.setElement(element);
                                element.setValue(0.0);
                                for (var i: number = 200; i < 1000; i++) {
                                    var temp: number = 1;
                                    val[i] = 0;
                                    for (var j: number = 0; j < coef.length; j++) {
                                        val[i] = val[i] + coef[j] * temp;
                                        temp = temp * i;
                                    }
                                    var vv: number = val[i];
                                    var finalI: number = i;
                                    dimension0.time(finalI).lookup(element.uuid(),  (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                        var casted: org.kevoree.modeling.microframework.test.cloud.Element = <org.kevoree.modeling.microframework.test.cloud.Element>kObject;
                                        casted.setValue(vv);
                                    });
                                }
                                org.junit.Assert.assertEquals(element.timeTree().size(), 1);
                                nbAssert[0]++;
                                for (var i: number = 200; i < 1000; i++) {
                                    var finalI: number = i;
                                    element.jump(<number>finalI,  (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                        nbAssert[0]++;
                                        org.junit.Assert.assertTrue((element.getValue() - val[finalI]) < 5);
                                    });
                                }
                                org.junit.Assert.assertEquals(nbAssert[0], 801);
                            }

                            public test2(): void {
                                var nbAssert: number[] = new Array();
                                nbAssert[0] = 0;
                                var max: number = 1000;
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                                universe.connect(null);
                                var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                                var val: number[] = [787, 301, 298, 254, 755, 780, 788, 782, 273, 301, 310, 296, 272, 309, 277, 782, 22, 27, 785, 785, 300, 782, 302, 783, 308, 782, 786, 302, 785, 301, 784, 303, 262, 298, 78, 302, 785, 779, 787, 310, 299, 302, 305, 303, 788, 783, 296, 788, 300, 289, 42, 783, 42, 296, 783, 782, 783, 786, 782, 787, 787, 243, 785, 310, 277, 786, 61, 22, 784, 305, 783, 787, 786, 785, 733, 782, 781, 784, 311, 786, 28, 782, 781, 84, 301, 787, 267, 43, 783, 783, 787, 786, 44, 787, 783, 781, 309, 782, 310, 785, 300, 36, 308, 788, 306, 92, 785, 781, 781, 785, 787, 782, 786, 298, 309, 787, 788, 784, 784, 333, 27, 297, 306, 309, 782, 787, 782, 275, 784, 786, 308, 784, 782, 295, 310, 292, 783, 306, 305, 42, 300, 786, 296, 301, 784, 306, 786, 71, 301, 784, 299, 300, 787, 301, 310, 783, 309, 782, 43, 784, 298, 309, 785, 788, 300, 782, 780, 784, 48, 787, 786, 72, 309, 787, 302, 309, 785, 272, 787, 307, 278, 25, 301, 786, 785, 301, 785, 786, 297, 305, 296, 299, 784, 27, 21, 784, 787, 310, 783, 787, 296, 304, 788, 299, 298, 783, 787, 784, 783, 788, 787, 306, 783, 309, 298, 782, 304, 781, 49, 295, 773, 45, 306, 287, 308, 81, 278, 310, 304, 782, 782, 300, 38, 309, 305, 298, 785, 787, 304, 309, 301, 61, 785, 785, 296, 291, 309, 299, 283, 304, 784, 783, 783, 788, 306, 784, 783, 283, 788, 31, 272, 784, 786, 310, 786, 299, 296, 308, 788, 305, 299, 306, 783, 783, 296, 299, 783, 277, 784, 785, 300, 306, 784, 753, 301, 787, 785, 788, 299, 782, 785, 304, 290, 296, 310, 788, 310, 788, 308, 782, 785, 784, 296, 781, 298, 786, 304, 306, 788, 782, 775, 296, 21, 310, 782, 56, 782, 781, 270, 307, 63, 304, 775, 310, 787, 299, 310, 298, 784, 300, 309, 271, 784, 271, 783, 297, 301, 783, 302, 308, 71, 788, 787, 310, 27, 299, 299, 786, 781, 310, 300, 299, 787, 90, 308, 273, 782, 786, 28, 21, 268, 787, 310, 309, 782, 299, 299, 788, 787, 783, 297, 784, 780, 782, 786, 784, 298, 300, 303, 782, 291, 785, 301, 781, 785, 787, 292, 782, 266, 303, 788, 788, 305, 299, 296, 76, 786, 277, 309, 785, 300, 305, 785, 300, 784, 786, 781, 305, 781, 783, 784, 273, 298, 785, 292, 786, 299, 781, 296, 299, 310, 781, 786, 783, 273, 782, 306, 310, 304, 297, 782, 784, 784, 310, 267, 786, 278, 304, 32, 308, 305, 278, 725, 28, 786, 309, 310, 300, 309, 782, 782, 278, 100, 301, 301, 298, 304, 299, 787, 788, 298, 31, 298, 784, 297, 27, 308, 779, 786, 782, 298, 305, 783, 302, 309, 785, 787, 784, 302, 271, 269, 296, 299, 307, 782, 781, 38, 310, 784, 298, 295, 303, 781, 305, 784, 296, 788, 271, 782, 299, 782, 784, 302, 310, 298, 784, 309, 297, 304, 781, 785, 303, 309, 300, 29, 77, 306, 782, 780, 306, 301, 306, 309, 785, 786, 308, 305, 787, 786, 43, 785, 787, 306, 786, 310, 308, 305, 784, 23, 292, 787, 296, 782, 41, 784, 781, 787, 300, 781, 784, 781, 298, 29, 785, 297, 788, 787, 301, 783, 788, 786, 788, 70, 785, 310, 783, 305, 785, 298, 35, 299, 788, 786, 310, 302, 787, 783, 298, 786, 787, 21, 306, 295, 305, 788, 784, 298, 783, 308, 787, 296, 786, 783, 782, 45, 302, 781, 787, 276, 21, 783, 300, 60, 301, 784, 782, 784, 298, 782, 298, 781, 73, 784, 288, 787, 301, 303, 781, 296, 305, 784, 305, 786, 306, 293, 273, 274, 783, 304, 781, 782, 309, 787, 787, 65, 305, 781, 784, 785, 28, 784, 15, 309, 783, 786, 309, 265, 301, 301, 788, 784, 782, 784, 783, 784, 310, 303, 310, 24, 299, 780, 308, 786, 733, 774, 274, 299, 298, 782, 786, 787, 782, 787, 788, 785, 303, 783, 305, 300, 307, 45, 300, 304, 780, 309, 71, 309, 786, 786, 302, 304, 785, 786, 296, 299, 788, 310, 783, 779, 275, 783, 293, 782, 787, 296, 306, 307, 785, 784, 786, 41, 299, 292, 782, 304, 782, 782, 296, 782, 785, 273, 782, 784, 306, 786, 68, 782, 305, 785, 787, 784, 106, 298, 309, 273, 787, 310, 309, 784, 296, 783, 786, 301, 787, 299, 310, 304, 783, 782, 300, 788, 781, 786, 303, 50, 309, 781, 131, 309, 787, 788, 785, 298, 299, 305, 308, 785, 310, 298, 787, 782, 784, 296, 272, 786, 787, 788, 783, 709, 782, 301, 273, 68, 310, 25, 305, 33, 280, 781, 785, 783, 273, 784, 305, 782, 301, 784, 41, 787, 309, 299, 787, 780, 299, 782, 306, 32, 299, 784, 305, 302, 270, 786, 305, 782, 16, 786, 310, 301, 302, 781, 302, 782, 783, 786, 302, 773, 296, 786, 785, 29, 781, 301, 299, 38, 786, 788, 780, 167, 785, 308, 787, 302, 788, 308, 783, 44, 785, 309, 300, 305, 296, 310, 301, 773, 304, 784, 788, 786, 301, 787, 296, 782, 787, 23, 784, 781, 78, 278, 297, 785, 147, 783, 297, 781, 277, 787, 781, 787, 309, 782, 784, 268, 30, 299, 57, 787, 785, 310, 306, 783, 309, 305, 79, 784, 300, 309, 299, 787, 304, 274, 294, 296, 787, 23, 786, 27, 309, 780, 785, 787, 41, 296, 308, 22, 297, 780, 300, 277, 788, 302, 309, 15, 296, 784, 306, 29, 781, 782, 787, 23, 15, 43, 786, 309, 788, 304, 784, 302, 788, 46, 787, 788, 782, 308, 785, 308, 785, 788, 788, 787, 782, 310, 787, 308, 771, 305, 781, 732, 22, 788, 304, 788, 781, 302, 787, 306, 784, 781, 307, 29, 308, 788, 303, 305, 309, 783, 783, 298, 785, 299, 310, 308, 302, 779, 22, 310, 787, 735, 281, 309, 787, 298, 788, 785, 51, 299, 305, 782, 309, 787, 788, 785, 781, 30, 297, 787, 279, 785, 784, 304, 306, 787, 296, 298, 307, 308, 787, 305, 304, 781, 309, 310, 784, 309, 299, 785, 306, 782, 783, 43, 309, 302, 298, 271, 782, 31, 783, 300, 787, 787, 298, 787, 70, 780, 786, 783, 784, 26, 785, 301, 77, 298, 309, 273, 274, 782, 309, 306, 305, 785, 308, 301, 300, 296, 305, 308, 296, 302, 302, 788, 302, 300, 296, 299, 301, 297, 785, 787, 268, 786, 300, 304, 782, 285, 780, 42, 785, 310, 298, 276, 782, 787, 296, 270, 302, 15, 301, 298, 784, 299, 309, 291, 42, 294, 298, 787, 309, 306, 296, 305, 781, 788, 70, 301, 304, 305, 309, 785, 297, 617, 299, 301, 781, 308, 25, 298, 302, 788, 784, 786, 305, 784, 305, 783, 307, 784, 786, 296, 785, 787, 301, 309, 782, 784, 785, 786, 302, 787, 296, 309, 781, 783, 310, 308, 782, 305, 782, 304, 310, 304, 308, 782, 785, 234, 783, 784, 782, 786, 309, 301, 79, 299, 783, 296, 301, 38, 280, 298, 305, 783, 787, 310, 783, 308, 308, 273, 295, 299, 304, 310, 783, 788, 784, 298, 308, 785, 301, 309, 786, 780, 782, 273, 278, 292, 23, 241, 310, 783, 785, 278, 782, 787, 784, 310, 308, 784, 308, 781, 786, 780, 277, 289, 306, 788, 783, 48, 30, 782, 306, 779, 782, 782, 303, 788, 299, 300, 783, 784, 785, 788, 278, 256, 272, 782, 94, 782, 787, 298, 300, 784, 291, 781, 774, 310, 43, 37, 299, 786, 785, 308, 302, 785, 277, 784, 782, 47, 304, 305, 302, 23, 781, 784, 309, 300, 306, 306, 279, 785, 783, 786, 785, 784, 787, 787, 783, 783, 298, 308, 305, 785, 94, 783, 275, 299, 309, 783, 784, 296, 785, 20, 785, 780, 271, 786, 296, 270, 291, 787, 305, 304, 309, 305, 784, 784, 305, 299, 784, 298, 302, 781, 788, 297, 301, 785, 300, 303, 302, 785, 785, 303, 310, 299, 787, 787, 787, 299, 785, 298, 787, 781, 785, 751, 17, 786, 270, 785, 309, 296, 299, 782, 785, 785, 781, 786, 785, 787, 785, 300, 299, 53, 309, 298, 299, 784, 782, 782, 272, 782, 787, 303, 301, 783, 292, 305, 787, 85, 309, 787, 309, 783, 307, 781, 301, 782, 303, 785, 310, 308, 305, 301, 299, 309, 267, 101, 310, 788, 308, 785, 304, 784, 783, 787, 22, 309, 27, 277, 779, 31, 304, 310, 106, 304, 785, 782, 302, 280, 788, 276, 305, 301, 267, 306, 785, 273, 785, 308, 788, 785, 784, 28, 787, 299, 297, 301, 788, 787, 310, 781, 783, 301, 785, 300, 784, 782, 80, 786, 304, 73, 310, 787, 274, 788, 309, 309, 305, 781, 305, 77, 788, 784, 786, 787, 781, 21, 787, 305, 783, 783, 783, 74, 787, 781, 785, 787, 27, 295, 309, 310, 310, 783, 298, 783, 782, 28, 308, 736, 787, 292, 300, 303, 28, 309, 297, 782, 310, 42, 296, 786, 782, 787, 305, 21, 40, 300, 783, 310, 299, 65, 391, 299, 785, 298, 783, 786, 301, 308, 787, 300, 297, 309, 779, 788, 779, 296, 298, 301, 782, 310, 273, 783, 786, 784, 48, 296, 298, 24, 782, 56, 47, 782, 782, 276, 298, 783, 788, 784, 299, 305, 289, 783, 306, 782, 309, 784, 787, 304, 296, 20, 782, 781, 788, 301, 784, 299, 782, 309, 787, 306, 305, 306, 784, 785, 780, 310, 310, 786, 783, 782, 784, 787, 22, 784, 295, 301, 298, 43, 787, 781, 781, 301, 779, 299, 299, 301, 787, 785, 72, 783, 787, 782, 784, 24, 783, 781, 787, 784, 306, 784, 783, 788, 782, 786, 783, 309, 298, 785, 301, 295, 786, 304, 787, 27, 784, 310, 297, 302, 310, 301, 295, 27, 308, 785, 784, 300, 278, 303, 775, 787, 305, 298, 786, 267, 784, 787, 309, 782, 303, 773, 787, 301, 298, 75, 306, 787, 781, 27, 782, 304, 781, 787, 310, 781, 783, 784, 785, 785, 295, 68, 787, 307, 783, 785, 781, 291, 298, 783, 49, 788, 305, 309, 304, 31, 785, 787, 783, 783, 74, 782, 782, 310, 310, 301, 309, 783, 301, 780, 296, 785, 781, 298, 310, 781, 273, 787, 302, 30, 309, 310, 296, 269, 48, 292, 305, 783, 785, 785, 784, 788, 781, 787, 787, 787, 257, 753, 781, 32, 296, 785, 308, 307, 53, 782, 782, 305, 305, 785, 296, 775, 783, 787, 785, 309, 784, 299, 787, 23, 782, 299, 783, 71, 298, 308, 302, 305, 785, 309, 306, 309, 782, 310, 299, 787, 24, 780, 784, 786, 277, 309, 309, 782, 783, 305, 783, 301, 301, 305, 788, 299, 301, 786, 79, 785, 784, 298, 786, 308, 786, 787, 298, 302, 304, 782, 783, 781, 787, 303, 303, 310, 302, 783, 787, 787, 301, 784, 785, 782, 295, 781, 781, 301, 783, 310, 310, 308, 305, 309, 300, 786, 787, 781, 785, 785, 786, 784, 786, 787, 276, 787, 788, 299, 305, 788, 275, 296, 782, 785, 784, 784, 305, 787, 39, 23, 781, 784, 279, 628, 783, 305, 273, 306, 298, 783, 786, 786, 298, 309, 298, 297, 303, 296, 787, 783, 550, 781, 784, 782, 782, 295, 306, 277, 278, 787, 782, 303, 781, 785, 305, 295, 308, 783, 780, 43, 310, 306, 309, 785, 787, 81, 299, 785, 299, 788, 299, 784, 783, 783, 783, 784, 783, 783, 783, 783, 298, 297, 299, 298, 783, 299, 295, 783, 784, 308, 296, 299, 785, 88, 785, 304, 310, 310, 308, 786, 783, 786, 786, 782, 786, 310, 273, 298, 276, 783, 786, 784, 787, 299, 296, 273, 309, 296, 763, 298, 302, 784, 310, 310, 300, 786, 22, 787, 780, 301, 782, 785, 786, 310, 310, 310, 309, 787, 782, 30, 309, 308, 782, 787, 786, 782, 296, 782, 278, 292, 309, 301, 785, 786, 783, 780, 298, 73, 785, 273, 98, 784, 780, 787, 310, 783, 784, 298, 787, 784, 305, 787, 786, 787, 785, 27, 57];
                                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                node.setName("n0");
                                t0.setRoot(node, null);
                                var element: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                                element.setName("e0");
                                node.setElement(element);
                                for (var i: number = 0; i < max; i++) {
                                    var vv: number = val[i];
                                    var finalI: number = i;
                                    dimension0.time(finalI).lookup(element.uuid(),  (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                        var casted: org.kevoree.modeling.microframework.test.cloud.Element = <org.kevoree.modeling.microframework.test.cloud.Element>kObject;
                                        casted.setValue(vv);
                                    });
                                }
                                org.junit.Assert.assertEquals(element.timeTree().size(), 87);
                                nbAssert[0]++;
                                for (var i: number = 0; i < max; i++) {
                                    var finalI: number = i;
                                    element.jump(<number>finalI,  (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                        nbAssert[0]++;
                                        var t: boolean = (element.getValue() - val[finalI]) < 5;
                                        org.junit.Assert.assertTrue(t);
                                    });
                                }
                                org.junit.Assert.assertEquals(nbAssert[0], max + 1);
                            }

                        }

                        export class PolynomialSaveLoadTest {

                            public test(): void {
                                var nbAssert: number[] = new Array();
                                nbAssert[0] = 0;
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                                universe.connect(null);
                                var dimension: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                                var val: number[] = new Array();
                                var coef: number[] = [2, 2, 3];
                                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(0);
                                var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                node.setName("n0");
                                t0.setRoot(node, null);
                                var element: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                                element.setName("e0");
                                node.setElement(element);
                                element.setValue(0.0);
                                for (var i: number = 200; i < 1000; i++) {
                                    if ((i % 100) == 0) {
                                        dimension.save( (throwable : java.lang.Throwable) => {
                                        });
                                    }
                                    var temp: number = 1;
                                    val[i] = 0;
                                    for (var j: number = 0; j < coef.length; j++) {
                                        val[i] = val[i] + coef[j] * temp;
                                        temp = temp * i;
                                    }
                                    var vv: number = val[i];
                                    var finalI: number = i;
                                    dimension.time(finalI).lookup(element.uuid(),  (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                        var casted: org.kevoree.modeling.microframework.test.cloud.Element = <org.kevoree.modeling.microframework.test.cloud.Element>kObject;
                                        casted.setValue(vv);
                                    });
                                }
                                org.junit.Assert.assertEquals(element.timeTree().size(), 1);
                                nbAssert[0]++;
                                for (var i: number = 200; i < 1000; i++) {
                                    var finalI: number = i;
                                    element.jump(<number>finalI,  (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                        nbAssert[0]++;
                                        org.junit.Assert.assertTrue((element.getValue() - val[finalI]) < 5);
                                    });
                                }
                                org.junit.Assert.assertEquals(element.timeTree().size(), 1);
                                dimension.save( (throwable : java.lang.Throwable) => {
                                });
                                org.junit.Assert.assertEquals(nbAssert[0], 801);
                            }

                        }

                    }
                    export module selector {
                        export class BasicSelectTest {

                            public rootSelectTest(): void {
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                                universe.connect(null);
                                var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                node.setName("n0");
                                t0.setRoot(node, null);
                                t0.select("/",  (kObjects : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(kObjects[0], node);
                                });
                                var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(1);
                                t1.select("/",  (kObjects : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(node.uuid(), kObjects[0].uuid());
                                    org.junit.Assert.assertEquals(t1.now(), kObjects[0].now());
                                });
                            }

                            public selectTest(): void {
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                                universe.connect(null);
                                var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                node.setName("n0");
                                t0.setRoot(node, null);
                                var node2: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                node2.setName("n1");
                                node.addChildren(node2);
                                var node3: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                node3.setName("n2");
                                node2.addChildren(node3);
                                var node4: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                node4.setName("n4");
                                node3.addChildren(node4);
                                var node5: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                node5.setName("n5");
                                node3.addChildren(node5);
                                t0.select("children[]",  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(1, selecteds.length);
                                    org.junit.Assert.assertEquals(node2, selecteds[0]);
                                });
                                t0.select("children[name=*]",  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(1, selecteds.length);
                                    org.junit.Assert.assertEquals(node2, selecteds[0]);
                                });
                                t0.select("children[name=n*]",  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(1, selecteds.length);
                                    org.junit.Assert.assertEquals(node2, selecteds[0]);
                                });
                                t0.select("children[name=n1]",  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(1, selecteds.length);
                                    org.junit.Assert.assertEquals(node2, selecteds[0]);
                                });
                                t0.select("children[name=!n1]",  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(0, selecteds.length);
                                });
                                t0.select("children[name!=n1]",  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(0, selecteds.length);
                                });
                                t0.select("children[name=n1]/children[name=n2]",  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(1, selecteds.length);
                                    org.junit.Assert.assertEquals(node3, selecteds[0]);
                                });
                                t0.select("/children[name=n1]/children[name=n2]",  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(1, selecteds.length);
                                    org.junit.Assert.assertEquals(node3, selecteds[0]);
                                });
                                node.select("children[name=n1]/children[name=n2]",  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(1, selecteds.length);
                                    org.junit.Assert.assertEquals(node3, selecteds[0]);
                                });
                                node.select("/children[name=n1]/children[name=n2]",  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(0, selecteds.length);
                                });
                                node.select("children[name=n1]/children[name=n2]/children[name=*]",  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    org.junit.Assert.assertEquals(2, selecteds.length);
                                });
                            }

                        }

                    }
                    export class SliceTest {

                        public slideTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var root: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            time0.setRoot(root, null);
                            root.setName("root");
                            var n1: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            n1.setName("n1");
                            var n2: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            n2.setName("n2");
                            root.addChildren(n1);
                            root.addChildren(n2);
                        }

                    }

                    export module storage {
                        export class ParentStorageTest {

                            public discardTest(): void {
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                                universe.connect(null);
                                var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                                var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var root: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                root.setName("root");
                                time0.setRoot(root, null);
                                var n1: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                n1.setName("n1");
                                var n2: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                n2.setName("n2");
                                root.addChildren(n1);
                                root.addChildren(n2);
                                var val: number = 1;
                                org.junit.Assert.assertEquals(n1.parentUuid(), val);
                                try {
                                    root.eachChildren(null, null);
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        org.junit.Assert.assertNull(e);
                                    }
                                 }
                                dimension0.discard(null);
                                try {
                                    root.eachChildren(null, null);
                                    org.junit.Assert.assertNull(root);
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        org.junit.Assert.assertNotNull(e);
                                    }
                                 }
                                time0.lookup(n1.uuid(),  (r_n1 : org.kevoree.modeling.api.KObject<any, any>) => {
                                    org.junit.Assert.assertNull(r_n1);
                                });
                            }

                            public parentTest(): void {
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                                universe.connect(null);
                                var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                                var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var root: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                root.setName("root");
                                time0.setRoot(root, null);
                                var n1: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                n1.setName("n1");
                                var n2: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                n2.setName("n2");
                                root.addChildren(n1);
                                root.addChildren(n2);
                                var val: number = 1;
                                org.junit.Assert.assertEquals(n1.parentUuid(), val);
                                org.junit.Assert.assertEquals(n1.referenceInParent(), org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.CHILDREN);
                                var i: number[] = [0];
                                n1.inbounds( (inboundReference : org.kevoree.modeling.api.InboundReference) => {
                                    i[0]++;
                                }, null);
                                org.junit.Assert.assertEquals(1, i[0]);
                                try {
                                    root.eachChildren(null, null);
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        org.junit.Assert.assertNull(e);
                                    }
                                 }
                                dimension0.saveUnload(null);
                                try {
                                    root.eachChildren(null, null);
                                    org.junit.Assert.assertNull(root);
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        org.junit.Assert.assertNotNull(e);
                                    }
                                 }
                                time0.lookup(n1.uuid(),  (r_n1 : org.kevoree.modeling.api.KObject<any, any>) => {
                                    org.junit.Assert.assertNotNull(r_n1.parentUuid());
                                    org.junit.Assert.assertNotNull(r_n1.referenceInParent());
                                    r_n1.inbounds( (inboundReference : org.kevoree.modeling.api.InboundReference) => {
                                        i[0]++;
                                    }, null);
                                    org.junit.Assert.assertEquals(2, i[0]);
                                    i[0]++;
                                });
                                org.junit.Assert.assertEquals(3, i[0]);
                            }

                        }

                    }
                    export class TimeTest {

                        public timeCreationTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            org.junit.Assert.assertNotNull(t0);
                            org.junit.Assert.assertEquals(t0.now(), 0);
                            var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(1);
                            org.junit.Assert.assertNotNull(t1);
                            org.junit.Assert.assertEquals(t1.now(), 1);
                        }

                        public simpleTimeNavigationTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            var element0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                            node0.setElement(element0);
                            t0.lookup(node0.uuid(),  (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement( (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                    org.junit.Assert.assertEquals(element0, element);
                                    org.junit.Assert.assertEquals(element.now(), t0.now());
                                });
                            });
                        }

                        public distortedTimeNavigationTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0.getElement( (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                org.junit.Assert.assertNull(element);
                            });
                            t0.lookup(node0.uuid(),  (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement( (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                    org.junit.Assert.assertNull(element);
                                });
                            });
                            var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(1);
                            var elem1: org.kevoree.modeling.microframework.test.cloud.Element = t1.createElement();
                            node0.setElement(elem1);
                            t0.lookup(node0.uuid(),  (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement( (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                    org.junit.Assert.assertNull(element);
                                });
                            });
                            t1.lookup(node0.uuid(),  (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement( (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                    org.junit.Assert.assertNotNull(element);
                                    org.junit.Assert.assertEquals(element, elem1);
                                    org.junit.Assert.assertEquals(element.now(), t1.now());
                                });
                            });
                        }

                        public objectModificationTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0.setName("node at 0");
                            node0.setValue("0");
                            var elem0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                            node0.setElement(elem0);
                            var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(1);
                            t1.lookup(node0.uuid(),  (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).setName("node at 1");
                                (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).setValue("1");
                            });
                            t0.lookup(node0.uuid(),  (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getName(), "node at 0");
                                org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getValue(), "0");
                            });
                            t1.lookup(node0.uuid(),  (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getName(), "node at 1");
                                org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getValue(), "1");
                            });
                        }

                        public timeUpdateWithLookupTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(0);
                            var node0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0.setName("Node0");
                            t0.setRoot(node0, null);
                            dimension.save( (throwable : java.lang.Throwable) => {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                }
                            });
                            var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(1);
                            var element: org.kevoree.modeling.microframework.test.cloud.Element = t1.createElement();
                            element.setName("Element1");
                            t1.lookup(node0.uuid(),  (node0Back : org.kevoree.modeling.api.KObject<any, any>) => {
                                (<org.kevoree.modeling.microframework.test.cloud.Node>node0Back).setElement(element);
                            });
                            dimension.save( (throwable : java.lang.Throwable) => {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                }
                            });
                            var t0_2: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(0);
                            t0_2.select("/",  (kObjects : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                if (kObjects != null && kObjects.length > 0) {
                                    org.junit.Assert.assertEquals(2, (<org.kevoree.modeling.microframework.test.cloud.Node>kObjects[0]).timeTree().size());
                                }
                            });
                        }

                        public timeUpdateWithSelectTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(0);
                            var node0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0.setName("Node0");
                            t0.setRoot(node0, null);
                            dimension.save( (throwable : java.lang.Throwable) => {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                }
                            });
                            var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(1);
                            var element: org.kevoree.modeling.microframework.test.cloud.Element = t1.createElement();
                            element.setName("Element1");
                            t1.select("/",  (kObjects : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                if (kObjects != null && kObjects.length > 0) {
                                    (<org.kevoree.modeling.microframework.test.cloud.Node>kObjects[0]).setElement(element);
                                }
                            });
                            dimension.save( (throwable : java.lang.Throwable) => {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                }
                            });
                            var t0_2: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension.time(0);
                            t0_2.select("/",  (kObjects : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                if (kObjects != null && kObjects.length > 0) {
                                    org.junit.Assert.assertEquals(2, (<org.kevoree.modeling.microframework.test.cloud.Node>kObjects[0]).timeTree().size());
                                }
                            });
                        }

                    }

                    export class TraceTest {

                        public traceTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                            universe.connect(null);
                            var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                            var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var root: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            time0.setRoot(root, null);
                            root.setName("root");
                            var n1: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            n1.setName("n1");
                            var n2: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            n2.setName("n2");
                            root.addChildren(n1);
                            root.addChildren(n2);
                        }

                    }

                    export module tree {
                        export class LongRBTreeTest {

                            public saveLoad0(): void {
                                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                for (var i: number = 0; i <= 6; i++) {
                                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                }
                                var treeBis: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                treeBis.unserialize(tree.serialize());
                                org.junit.Assert.assertEquals(tree.size(), treeBis.size());
                                for (var i: number = 0; i < tree.size(); i++) {
                                    var resolved: org.kevoree.modeling.api.time.rbtree.State = tree.lookup(i);
                                    var resolvedBis: org.kevoree.modeling.api.time.rbtree.State = treeBis.lookup(i);
                                    org.junit.Assert.assertEquals(resolved, resolvedBis);
                                }
                            }

                            public saveLoad(): void {
                                var tree: org.kevoree.modeling.api.time.rbtree.LongRBTree = new org.kevoree.modeling.api.time.rbtree.LongRBTree();
                                for (var i: number = 0; i <= 6; i++) {
                                    tree.insert(i, i);
                                }
                                var treeBis: org.kevoree.modeling.api.time.rbtree.LongRBTree = new org.kevoree.modeling.api.time.rbtree.LongRBTree();
                                treeBis.unserialize(tree.serialize());
                                org.junit.Assert.assertEquals(tree.size(), treeBis.size());
                                for (var i: number = 0; i < tree.size(); i++) {
                                    var resolved: number = tree.lookup(i);
                                    var resolvedBis: number = treeBis.lookup(i);
                                    org.junit.Assert.assertEquals(resolved, resolvedBis);
                                }
                            }

                        }

                        export class RBTreeTest {

                            public printTest(): void {
                                var MIN: number = 0;
                                var MAX: number = 99;
                                for (var j: number = MIN; j <= MAX; j++) {
                                    var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                    for (var i: number = MIN; i <= j; i++) {
                                        if ((i % 3) == 0) {
                                            tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                                        } else {
                                            tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                        }
                                    }
                                }
                            }

                            public nextTest(): void {
                                var MIN: number = 0;
                                var MAX: number = 99;
                                for (var j: number = MIN; j <= MAX; j++) {
                                    var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                    for (var i: number = MIN; i <= j; i++) {
                                        if ((i % 3) == 0) {
                                            tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                                        } else {
                                            tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                        }
                                    }
                                    for (var i: number = MIN; i < j - 1; i++) {
                                        org.junit.Assert.assertTrue(tree.next(i).getKey() == i + 1);
                                    }
                                    org.junit.Assert.assertTrue(tree.next(j) == null);
                                }
                            }

                            private printTree(root: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                var queue: java.util.LinkedList<org.kevoree.modeling.api.time.rbtree.TreeNode> = new java.util.LinkedList<org.kevoree.modeling.api.time.rbtree.TreeNode>();
                                queue.add(root);
                                queue.add(null);
                                while (!queue.isEmpty()){
                                    var current: org.kevoree.modeling.api.time.rbtree.TreeNode = queue.poll();
                                    while (current != null){
                                        System.out.print("| " + current.getKey() + " ");
                                        if (current.getLeft() != null) {
                                            queue.add(current.getLeft());
                                        }
                                        if (current.getRight() != null) {
                                            queue.add(current.getRight());
                                        }
                                        current = queue.poll();
                                    }
                                    System.out.println();
                                    if (!queue.isEmpty()) {
                                        queue.add(null);
                                    }
                                }
                            }

                            public previousTest(): void {
                                var MIN: number = 0;
                                var MAX: number = 99;
                                for (var j: number = MIN + 1; j <= MAX; j++) {
                                    var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                    for (var i: number = MIN; i <= j; i++) {
                                        if ((i % 7) == 0) {
                                            tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                                        } else {
                                            tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                        }
                                    }
                                    for (var i: number = j; i > MIN; i--) {
                                        org.junit.Assert.assertTrue(tree.previous(i).getKey() == i - 1);
                                    }
                                    org.junit.Assert.assertTrue(tree.previous(MIN) == null);
                                }
                            }

                            public nextWhileNotTest(): void {
                                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                for (var i: number = 0; i <= 6; i++) {
                                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                }
                                tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                                tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                for (var i: number = 0; i < 5; i++) {
                                    org.junit.Assert.assertTrue(tree.nextWhileNot(i, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == (i + 1));
                                }
                                org.junit.Assert.assertTrue(tree.nextWhileNot(5, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.nextWhileNot(5, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
                                org.junit.Assert.assertNull(tree.nextWhileNot(6, org.kevoree.modeling.api.time.rbtree.State.DELETED));
                                org.junit.Assert.assertNull(tree.nextWhileNot(7, org.kevoree.modeling.api.time.rbtree.State.DELETED));
                                org.junit.Assert.assertNull(tree.nextWhileNot(8, org.kevoree.modeling.api.time.rbtree.State.DELETED));
                                org.junit.Assert.assertTrue(tree.nextWhileNot(9, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.nextWhileNot(9, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
                                org.junit.Assert.assertTrue(tree.nextWhileNot(10, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.nextWhileNot(10, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 11);
                            }

                            public previousWhileNotTest(): void {
                                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                for (var i: number = 0; i <= 6; i++) {
                                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                }
                                tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                                tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                org.junit.Assert.assertTrue(tree.previousWhileNot(14, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(14, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
                                org.junit.Assert.assertTrue(tree.previousWhileNot(13, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(13, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 11);
                                org.junit.Assert.assertTrue(tree.previousWhileNot(12, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(12, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 11);
                                org.junit.Assert.assertTrue(tree.previousWhileNot(11, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(11, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
                                org.junit.Assert.assertNull(tree.previousWhileNot(10, org.kevoree.modeling.api.time.rbtree.State.DELETED));
                                org.junit.Assert.assertNull(tree.previousWhileNot(9, org.kevoree.modeling.api.time.rbtree.State.DELETED));
                                org.junit.Assert.assertNull(tree.previousWhileNot(8, org.kevoree.modeling.api.time.rbtree.State.DELETED));
                                org.junit.Assert.assertTrue(tree.previousWhileNot(7, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(7, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
                                org.junit.Assert.assertTrue(tree.previousWhileNot(6, org.kevoree.modeling.api.time.rbtree.State.DELETED) != null && tree.previousWhileNot(6, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 5);
                            }

                            public firstTest(): void {
                                var MIN: number = 0;
                                var MAX: number = 99;
                                for (var j: number = MIN + 1; j <= MAX; j++) {
                                    var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                    for (var i: number = MIN; i <= j; i++) {
                                        if ((i % 3) == 0) {
                                            tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                                        } else {
                                            tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                        }
                                    }
                                    org.junit.Assert.assertTrue(tree.first().getKey() == MIN);
                                }
                            }

                            public lastTest(): void {
                                var MIN: number = 0;
                                var MAX: number = 99;
                                for (var j: number = MIN + 1; j <= MAX; j++) {
                                    var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                    for (var i: number = MIN; i <= j; i++) {
                                        if ((i % 3) == 0) {
                                            tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                                        } else {
                                            tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                        }
                                    }
                                    org.junit.Assert.assertTrue(tree.last().getKey() == j);
                                }
                            }

                            public firstWhileNot(): void {
                                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                for (var i: number = 0; i <= 6; i++) {
                                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                }
                                tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                                tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                org.junit.Assert.assertTrue(tree.firstWhileNot(14, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
                                org.junit.Assert.assertTrue(tree.firstWhileNot(13, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
                                org.junit.Assert.assertTrue(tree.firstWhileNot(12, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
                                org.junit.Assert.assertTrue(tree.firstWhileNot(11, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
                                org.junit.Assert.assertTrue(tree.firstWhileNot(10, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 10);
                                org.junit.Assert.assertNull(tree.firstWhileNot(9, org.kevoree.modeling.api.time.rbtree.State.DELETED));
                                org.junit.Assert.assertNull(tree.firstWhileNot(8, org.kevoree.modeling.api.time.rbtree.State.DELETED));
                                org.junit.Assert.assertTrue(tree.firstWhileNot(7, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 0);
                                org.junit.Assert.assertTrue(tree.firstWhileNot(6, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 0);
                            }

                            public lastWhileNot(): void {
                                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                for (var i: number = 0; i <= 6; i++) {
                                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                }
                                tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                                tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                org.junit.Assert.assertTrue(tree.lastWhileNot(0, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
                                org.junit.Assert.assertTrue(tree.lastWhileNot(5, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
                                org.junit.Assert.assertTrue(tree.lastWhileNot(6, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
                                org.junit.Assert.assertTrue(tree.lastWhileNot(7, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 6);
                                org.junit.Assert.assertNull(tree.lastWhileNot(8, org.kevoree.modeling.api.time.rbtree.State.DELETED));
                                org.junit.Assert.assertNull(tree.lastWhileNot(9, org.kevoree.modeling.api.time.rbtree.State.DELETED));
                                org.junit.Assert.assertTrue(tree.lastWhileNot(10, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
                                org.junit.Assert.assertTrue(tree.lastWhileNot(11, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
                                org.junit.Assert.assertTrue(tree.lastWhileNot(12, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
                                org.junit.Assert.assertTrue(tree.lastWhileNot(13, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
                                org.junit.Assert.assertTrue(tree.lastWhileNot(14, org.kevoree.modeling.api.time.rbtree.State.DELETED).getKey() == 13);
                            }

                            public previousOrEqualTest(): void {
                                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                for (var i: number = 0; i <= 6; i++) {
                                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                }
                                tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                                tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                org.junit.Assert.assertNull(tree.previousOrEqual(-1));
                                org.junit.Assert.assertEquals(tree.previousOrEqual(0).getKey(), 0);
                                org.junit.Assert.assertEquals(tree.previousOrEqual(1).getKey(), 1);
                                org.junit.Assert.assertEquals(tree.previousOrEqual(7).getKey(), 6);
                                org.junit.Assert.assertEquals(tree.previousOrEqual(8).getKey(), 8);
                                org.junit.Assert.assertEquals(tree.previousOrEqual(9).getKey(), 8);
                                org.junit.Assert.assertEquals(tree.previousOrEqual(10).getKey(), 10);
                                org.junit.Assert.assertEquals(tree.previousOrEqual(13).getKey(), 13);
                                org.junit.Assert.assertEquals(tree.previousOrEqual(14).getKey(), 13);
                            }

                            public nextOrEqualTest(): void {
                                var tree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                                for (var i: number = 0; i <= 6; i++) {
                                    tree.insert(i, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                }
                                tree.insert(8, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                                tree.insert(10, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(11, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                tree.insert(13, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                                org.junit.Assert.assertTrue(tree.nextOrEqual(-1).getKey() == 0);
                                org.junit.Assert.assertTrue(tree.nextOrEqual(0).getKey() == 0);
                                org.junit.Assert.assertTrue(tree.nextOrEqual(1).getKey() == 1);
                                org.junit.Assert.assertTrue(tree.nextOrEqual(7).getKey() == 8);
                                org.junit.Assert.assertTrue(tree.nextOrEqual(8).getKey() == 8);
                                org.junit.Assert.assertTrue(tree.nextOrEqual(9).getKey() == 10);
                                org.junit.Assert.assertTrue(tree.nextOrEqual(10).getKey() == 10);
                                org.junit.Assert.assertTrue(tree.nextOrEqual(13).getKey() == 13);
                                org.junit.Assert.assertNull(tree.nextOrEqual(14));
                            }

                        }

                    }
                    export module xmi {
                        export class SerializerTest {

                            public serializeTest(): void {
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse();
                                universe.connect(null);
                                var dimension0: org.kevoree.modeling.microframework.test.cloud.CloudDimension = universe.newDimension();
                                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var nodeT0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                nodeT0.setName("node0");
                                t0.setRoot(nodeT0, null);
                                var child0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                                nodeT0.setElement(child0);
                                var nodeT1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                nodeT1.setName("n1");
                                nodeT0.addChildren(nodeT1);
                                t0.lookup(nodeT0.uuid(),  (root : org.kevoree.modeling.api.KObject<any, any>) => {
                                    t0.xmi().save(root,  (result : string, error : java.lang.Throwable) => {
                                        if (error != null) {
                                            error.printStackTrace();
                                        }
                                    });
                                });
                            }

                        }

                    }
                }
            }
        }
    }
}
