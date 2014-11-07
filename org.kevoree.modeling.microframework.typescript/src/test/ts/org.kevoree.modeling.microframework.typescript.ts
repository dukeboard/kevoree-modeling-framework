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
                            org.kevoree.modeling.api.util.Helper.forall(big,                              (s : string, next : (p : java.lang.Throwable) => void) => {
                            System.out.println(s);
                            next(null);
                            }
,                              (t : java.lang.Throwable) => {
                            System.out.println("End !");
                            }
);
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

                            constructor(kDataBase: org.kevoree.modeling.api.data.KDataBase) {
                                super(kDataBase);
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

                                public static NAME: METAATTRIBUTES = new METAATTRIBUTES("name", 2, 5, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                                public static VALUE: METAATTRIBUTES = new METAATTRIBUTES("value", 3, 5, false, org.kevoree.modeling.api.meta.MetaType.DOUBLE, org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation.instance());
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
                                        return this.manageCache(new org.kevoree.modeling.microframework.test.cloud.impl.NodeImpl(this, org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, p_key, this.now(), this.dimension(), p_timeTree));
                                        case 1: 
                                        return this.manageCache(new org.kevoree.modeling.microframework.test.cloud.impl.ElementImpl(this, org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT, p_key, this.now(), this.dimension(), p_timeTree));
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
                                constructor(factory: org.kevoree.modeling.microframework.test.cloud.CloudView, metaClass: org.kevoree.modeling.api.meta.MetaClass, kid: number, now: number, dimension: org.kevoree.modeling.api.KDimension<any, any, any>, timeTree: org.kevoree.modeling.api.time.TimeTree) {
                                    super(factory, metaClass, kid, now, dimension, timeTree);
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

                                constructor(p_factory: org.kevoree.modeling.microframework.test.cloud.CloudView, p_metaClass: org.kevoree.modeling.api.meta.MetaClass, p_uuid: number, p_now: number, p_dimension: org.kevoree.modeling.api.KDimension<any, any, any>, p_timeTree: org.kevoree.modeling.api.time.TimeTree) {
                                    super(p_factory, p_metaClass, p_uuid, p_now, p_dimension, p_timeTree);
                                }

                                public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                                    return org.kevoree.modeling.microframework.test.cloud.Node.METAATTRIBUTES.values();
                                }

                                public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                                    return org.kevoree.modeling.microframework.test.cloud.Node.METAREFERENCES.values();
                                }

                                public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
                                    return org.kevoree.modeling.microframework.test.cloud.Node.METAOPERATION.values();
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

                                public static NAME: METAATTRIBUTES = new METAATTRIBUTES("name", 2, 5, true, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
                                public static VALUE: METAATTRIBUTES = new METAATTRIBUTES("value", 3, 5, false, org.kevoree.modeling.api.meta.MetaType.STRING, org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.instance());
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

                                public static CHILDREN: METAREFERENCES = new METAREFERENCES("children", 4, true, false, org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, null);
                                public static ELEMENT: METAREFERENCES = new METAREFERENCES("element", 5, true, true, org.kevoree.modeling.microframework.test.cloud.CloudView.METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT, null);
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


                            export class METAOPERATION implements org.kevoree.modeling.api.meta.MetaOperation {

                                public static TRIGGER: METAOPERATION = new METAOPERATION("trigger", 6);
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
                                public static _METAOPERATIONVALUES : METAOPERATION[] = [
                                    METAOPERATION.TRIGGER
                                ];
                                public static values():METAOPERATION[]{
                                    return METAOPERATION._METAOPERATIONVALUES;
                                }
                            }


                        }
                    }
                    export class CompareTest {

                        public diffTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                            universe.newDimension(                             (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node0_0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_0.setName("node0_0");
                            node0_0.setValue("0_0");
                            var node0_1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_1.setName("node0_1");
                            node0_1.setValue("0_1");
                            t0.diff(node0_0, node0_1,                              (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                            org.junit.Assert.assertNotEquals(traceSequence.traces().length, 0);
                            org.junit.Assert.assertEquals("[{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_1\"},\n" + "{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
                            }
);
                            t0.diff(node0_0, node0_1,                              (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                            new org.kevoree.modeling.api.trace.ModelTraceApplicator(node0_0).applyTraceSequence(traceSequence,                              (throwable : java.lang.Throwable) => {
                            org.junit.Assert.assertNull(throwable);
                            t0.diff(node0_0, node0_1,                              (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                            org.junit.Assert.assertEquals(traceSequence.traces().length, 0);
                            }
);
                            }
);
                            }
);
                            }
);
                        }

                        public intersectionTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                            universe.newDimension(                             (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node0_0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_0.setName("node0_0");
                            node0_0.setValue("0_0");
                            var node0_1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_1.setName("node0_1");
                            node0_1.setValue("0_1");
                            t0.intersection(node0_0, node0_1,                              (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                            org.junit.Assert.assertEquals(traceSequence.traces().length, 0);
                            }
);
                            var node0_2: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0_2.setName("node0_2");
                            node0_2.setValue("0_1");
                            t0.intersection(node0_2, node0_1,                              (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                            org.junit.Assert.assertEquals(traceSequence.traces().length, 1);
                            org.junit.Assert.assertEquals("[{\"type\":\"SET\",\"src\":\"3\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
                            }
);
                            }
);
                        }

                        public unionTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                            universe.newDimension(                             (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
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
                            t0.merge(node0_0, node0_1,                              (traceSequence : org.kevoree.modeling.api.trace.TraceSequence) => {
                            org.junit.Assert.assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_1\"}", traceSequence.traces()[0].toString());
                            org.junit.Assert.assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}", traceSequence.traces()[1].toString());
                            org.junit.Assert.assertEquals("{\"type\":\"ADD\",\"src\":\"1\",\"meta\":\"element\"}", traceSequence.traces()[2].toString());
                            new org.kevoree.modeling.api.trace.ModelTraceApplicator(node0_0).applyTraceSequence(traceSequence,                              (throwable : java.lang.Throwable) => {
                            node0_0.getElement(                             (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                            org.junit.Assert.assertEquals(elem0_0, element);
                            }
);
                            }
);
                            }
);
                            }
);
                        }

                    }

                    export class HelloTest {

                        public helloTest(): void {
                            var univers: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                            univers.listen(                             (evt : org.kevoree.modeling.api.KEvent) => {
                            System.err.println(evt);
                            }
);
                            univers.newDimension(                             (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
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
                            nodeT0.eachChildren(                             (n : org.kevoree.modeling.microframework.test.cloud.Node) => {
                            i[0]++;
                            }
, null);
                            org.junit.Assert.assertEquals(1, i[0]);
                            var nodeT3: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            nodeT3.setName("n3");
                            nodeT1.addChildren(nodeT3);
                            i[0] = 0;
                            var j: number[] = [0];
                            nodeT0.visit(                             (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                            i[0]++;
                            return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }
,                              (t : java.lang.Throwable) => {
                            j[0]++;
                            }
);
                            org.junit.Assert.assertEquals(1, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                            i[0] = 0;
                            j[0] = 0;
                            nodeT1.visit(                             (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                            i[0]++;
                            return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }
,                              (t : java.lang.Throwable) => {
                            j[0]++;
                            }
);
                            org.junit.Assert.assertEquals(1, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                            i[0] = 0;
                            j[0] = 0;
                            nodeT3.visit(                             (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                            i[0]++;
                            return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }
,                              (t : java.lang.Throwable) => {
                            j[0]++;
                            }
);
                            org.junit.Assert.assertEquals(0, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                            i[0] = 0;
                            j[0] = 0;
                            nodeT0.treeVisit(                             (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                            i[0]++;
                            return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }
,                              (t : java.lang.Throwable) => {
                            j[0]++;
                            }
);
                            org.junit.Assert.assertEquals(2, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                            i[0] = 0;
                            j[0] = 0;
                            nodeT0.graphVisit(                             (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                            i[0]++;
                            return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }
,                              (t : java.lang.Throwable) => {
                            j[0]++;
                            }
);
                            org.junit.Assert.assertEquals(2, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                            i[0] = 0;
                            j[0] = 0;
                            nodeT0.graphVisit(                             (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                            i[0]++;
                            return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            }
,                              (t : java.lang.Throwable) => {
                            j[0]++;
                            }
);
                            org.junit.Assert.assertEquals(2, i[0]);
                            org.junit.Assert.assertEquals(1, j[0]);
                            System.err.println(nodeT0);
                            }
);
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
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                                universe.newDimension(                                 (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                                var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                time0.json().load("[\n" + "{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"1\",\n" + "\t\"name\":\"root\",\n" + "\t\"children\": [\"2\",\"3\"],\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"2\",\n" + "\t\"name\":\"n1\",\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"3\",\n" + "\t\"name\":\"n2\",\n" + "}\n" + "]",                                  (res : java.lang.Throwable) => {
                                time0.lookup(1,                                  (r : org.kevoree.modeling.api.KObject<any, any>) => {
                                System.err.println(r);
                                }
);
                                }
);
                                }
);
                            }

                        }

                        export class JSONSaveTest {

                            public jsonTest(): void {
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                                universe.newDimension(                                 (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                                var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var root: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                time0.setRoot(root);
                                root.setName("root");
                                var n1: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                n1.setName("n1");
                                var n2: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                                n2.setName("n2");
                                root.addChildren(n1);
                                root.addChildren(n2);
                                var result: string[] = new Array();
                                time0.json().save(root,                                  (model : string, err : java.lang.Throwable) => {
                                result[0] = model;
                                if (err != null) {
                                    err.printStackTrace();
                                }
                                }
);
                                var payloadResult: string = "[\n" + "{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"1\",\n" + "\t\"@root\" : \"true\",\n" + "\t\"name\" : \"root\",\n" + "\t\"children\" : [\"2\",\"3\"],\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"2\",\n" + "\t\"name\" : \"n1\",\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"3\",\n" + "\t\"name\" : \"n2\",\n" + "}\n" + "]\n";
                                org.junit.Assert.assertEquals(result[0], payloadResult);
                                var pathN2: string[] = [null];
                                n2.path(                                 (p : string) => {
                                pathN2[0] = p;
                                }
);
                                org.junit.Assert.assertEquals("/children[name=n2]", pathN2[0]);
                                var pathN1: string[] = [null];
                                n1.path(                                 (p : string) => {
                                pathN1[0] = p;
                                }
);
                                org.junit.Assert.assertEquals("/children[name=n1]", pathN1[0]);
                                var pathR: string[] = [null];
                                root.path(                                 (p : string) => {
                                pathR[0] = p;
                                }
);
                                org.junit.Assert.assertEquals("/", pathR[0]);
                                }
);
                            }

                        }

                    }
                    export class LookupTest {

                        public lookupTest(): void {
                            var dataBase: org.kevoree.modeling.api.data.MemoryKDataBase = new org.kevoree.modeling.api.data.MemoryKDataBase();
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(dataBase);
                            universe.newDimension(                             (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node.setName("n0");
                            t0.setRoot(node);
                            org.junit.Assert.assertTrue(node.isRoot());
                            universe.storage().getRoot(t0,                              (resolvedRoot : org.kevoree.modeling.api.KObject<any, any>) => {
                            org.junit.Assert.assertEquals(node, resolvedRoot);
                            }
);
                            org.junit.Assert.assertTrue(node.isRoot());
                            dimension0.save(                             (e : java.lang.Throwable) => {
                            var universe2: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(dataBase);
                            universe2.dimension(dimension0.key(),                              (dimension0_2 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                            var t0_2: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0_2.time(0);
                            t0_2.lookup(node.uuid(),                              (resolved : org.kevoree.modeling.api.KObject<any, any>) => {
                            t0_2.lookup(node.uuid(),                              (resolved2 : org.kevoree.modeling.api.KObject<any, any>) => {
                            org.junit.Assert.assertEquals(resolved, resolved2);
                            }
);
                            universe2.storage().getRoot(t0_2,                              (resolvedRoot : org.kevoree.modeling.api.KObject<any, any>) => {
                            org.junit.Assert.assertEquals(resolved, resolvedRoot);
                            }
);
                            org.junit.Assert.assertTrue(resolved.isRoot());
                            }
);
                            }
);
                            }
);
                            }
);
                        }

                    }

                    export module polynomial {
                        export class PolynomialExtrapolationTest {

                            public test(): void {
                                var toleratedError: number = 5;
                                var pe: org.kevoree.modeling.api.polynomial.DefaultPolynomialExtrapolation = new org.kevoree.modeling.api.polynomial.DefaultPolynomialExtrapolation(0, toleratedError, 10, 1, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
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
                                var dataBase: org.kevoree.modeling.api.data.MemoryKDataBase = new org.kevoree.modeling.api.data.MemoryKDataBase();
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(dataBase);
                                universe.newDimension(                                 (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                                var val: number[] = new Array();
                                var coef: number[] = [2, 2, 3];
                                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                node.setName("n0");
                                t0.setRoot(node);
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
                                    dimension0.time(finalI).lookup(element.uuid(),                                      (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                    var casted: org.kevoree.modeling.microframework.test.cloud.Element = <org.kevoree.modeling.microframework.test.cloud.Element>kObject;
                                    casted.setValue(vv);
                                    }
);
                                }
                                org.junit.Assert.assertEquals(element.timeTree().size(), 1);
                                nbAssert[0]++;
                                for (var i: number = 200; i < 1000; i++) {
                                    var finalI: number = i;
                                    element.jump(<number>finalI,                                      (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                                    nbAssert[0]++;
                                    org.junit.Assert.assertTrue((element.getValue() - val[finalI]) < 5);
                                    }
);
                                }
                                }
);
                                org.junit.Assert.assertEquals(nbAssert[0], 801);
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
                                this.printTree(tree.root);
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

                    export module selector {
                        export class BasicSelectTest {

                            public selectTest(): void {
                                var dataBase: org.kevoree.modeling.api.data.MemoryKDataBase = new org.kevoree.modeling.api.data.MemoryKDataBase();
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(dataBase);
                                universe.newDimension(                                 (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var node: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                node.setName("n0");
                                t0.setRoot(node);
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
                                t0.select("children[]",                                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                org.junit.Assert.assertEquals(1, selecteds.length);
                                org.junit.Assert.assertEquals(node2, selecteds[0]);
                                }
);
                                t0.select("children[name=*]",                                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                org.junit.Assert.assertEquals(1, selecteds.length);
                                org.junit.Assert.assertEquals(node2, selecteds[0]);
                                }
);
                                t0.select("children[name=n*]",                                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                org.junit.Assert.assertEquals(1, selecteds.length);
                                org.junit.Assert.assertEquals(node2, selecteds[0]);
                                }
);
                                t0.select("children[name=n1]",                                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                org.junit.Assert.assertEquals(1, selecteds.length);
                                org.junit.Assert.assertEquals(node2, selecteds[0]);
                                }
);
                                t0.select("children[name=!n1]",                                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                org.junit.Assert.assertEquals(0, selecteds.length);
                                }
);
                                t0.select("children[name!=n1]",                                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                org.junit.Assert.assertEquals(0, selecteds.length);
                                }
);
                                t0.select("children[name=n1]/children[name=n2]",                                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                org.junit.Assert.assertEquals(1, selecteds.length);
                                org.junit.Assert.assertEquals(node3, selecteds[0]);
                                }
);
                                t0.select("/children[name=n1]/children[name=n2]",                                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                org.junit.Assert.assertEquals(1, selecteds.length);
                                org.junit.Assert.assertEquals(node3, selecteds[0]);
                                }
);
                                node.select("children[name=n1]/children[name=n2]",                                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                org.junit.Assert.assertEquals(1, selecteds.length);
                                org.junit.Assert.assertEquals(node3, selecteds[0]);
                                }
);
                                node.select("/children[name=n1]/children[name=n2]",                                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                org.junit.Assert.assertEquals(0, selecteds.length);
                                }
);
                                node.select("children[name=n1]/children[name=n2]/children[name=*]",                                  (selecteds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                org.junit.Assert.assertEquals(2, selecteds.length);
                                }
);
                                }
);
                            }

                        }

                    }
                    export class SliceTest {

                        public slideTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                            universe.newDimension(                             (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                            var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var root: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            time0.setRoot(root);
                            root.setName("root");
                            var n1: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            n1.setName("n1");
                            var n2: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            n2.setName("n2");
                            root.addChildren(n1);
                            root.addChildren(n2);
                            }
);
                        }

                    }

                    export class TimeTest {

                        public timeCreationTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                            universe.newDimension(                             (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            org.junit.Assert.assertNotNull(t0);
                            org.junit.Assert.assertEquals(t0.now(), 0);
                            var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(1);
                            org.junit.Assert.assertNotNull(t1);
                            org.junit.Assert.assertEquals(t1.now(), 1);
                            }
);
                        }

                        public simpleTimeNavigationTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                            universe.newDimension(                             (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            var element0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                            node0.setElement(element0);
                            node0.getElement(                             (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                            org.junit.Assert.assertEquals(element, element0);
                            org.junit.Assert.assertEquals(element.now(), t0.now());
                            }
);
                            t0.lookup(node0.uuid(),                              (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                            (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement(                             (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                            org.junit.Assert.assertEquals(element, element0);
                            org.junit.Assert.assertEquals(element.now(), t0.now());
                            }
);
                            }
);
                            }
);
                        }

                        public distortedTimeNavigationTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                            universe.newDimension(                             (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0.getElement(                             (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                            org.junit.Assert.assertNull(element);
                            }
);
                            t0.lookup(node0.uuid(),                              (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                            (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement(                             (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                            org.junit.Assert.assertNull(element);
                            }
);
                            }
);
                            var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(1);
                            var elem1: org.kevoree.modeling.microframework.test.cloud.Element = t1.createElement();
                            node0.setElement(elem1);
                            t0.lookup(node0.uuid(),                              (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                            (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement(                             (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                            org.junit.Assert.assertNull(element);
                            }
);
                            }
);
                            t1.lookup(node0.uuid(),                              (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                            (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getElement(                             (element : org.kevoree.modeling.microframework.test.cloud.Element) => {
                            org.junit.Assert.assertNotNull(element);
                            org.junit.Assert.assertEquals(element, elem1);
                            org.junit.Assert.assertEquals(element.now(), t1.now());
                            }
);
                            }
);
                            }
);
                        }

                        public objectModificationTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                            universe.newDimension(                             (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                            org.junit.Assert.assertNotNull(dimension0);
                            var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var node0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                            node0.setName("node at 0");
                            node0.setValue("0");
                            var elem0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                            node0.setElement(elem0);
                            var t1: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(1);
                            t1.lookup(node0.uuid(),                              (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                            (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).setName("node at 1");
                            (<org.kevoree.modeling.microframework.test.cloud.Node>kObject).setValue("1");
                            }
);
                            t0.lookup(node0.uuid(),                              (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                            org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getName(), "node at 0");
                            org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getValue(), "0");
                            }
);
                            t1.lookup(node0.uuid(),                              (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                            org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getName(), "node at 1");
                            org.junit.Assert.assertEquals((<org.kevoree.modeling.microframework.test.cloud.Node>kObject).getValue(), "1");
                            }
);
                            }
);
                        }

                    }

                    export class TraceTest {

                        public traceTest(): void {
                            var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                            universe.newDimension(                             (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                            var time0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                            var root: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            time0.setRoot(root);
                            root.setName("root");
                            var n1: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            n1.setName("n1");
                            var n2: org.kevoree.modeling.microframework.test.cloud.Node = time0.createNode();
                            n2.setName("n2");
                            root.addChildren(n1);
                            root.addChildren(n2);
                            }
);
                        }

                    }

                    export module xmi {
                        export class Serializer {

                            public serializeTest(): void {
                                var universe: org.kevoree.modeling.microframework.test.cloud.CloudUniverse = new org.kevoree.modeling.microframework.test.cloud.CloudUniverse(new org.kevoree.modeling.api.data.MemoryKDataBase());
                                universe.newDimension(                                 (dimension0 : org.kevoree.modeling.microframework.test.cloud.CloudDimension) => {
                                var t0: org.kevoree.modeling.microframework.test.cloud.CloudView = dimension0.time(0);
                                var nodeT0: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                nodeT0.setName("node0");
                                t0.setRoot(nodeT0);
                                var child0: org.kevoree.modeling.microframework.test.cloud.Element = t0.createElement();
                                nodeT0.setElement(child0);
                                var nodeT1: org.kevoree.modeling.microframework.test.cloud.Node = t0.createNode();
                                nodeT1.setName("n1");
                                nodeT0.addChildren(nodeT1);
                                t0.lookup(nodeT0.uuid(),                                  (root : org.kevoree.modeling.api.KObject<any, any>) => {
                                t0.xmi().save(root,                                  (result : string, error : java.lang.Throwable) => {
                                if (error != null) {
                                    error.printStackTrace();
                                }
                                }
);
                                }
);
                                }
);
                            }

                        }

                    }
                }
            }
        }
    }
}
