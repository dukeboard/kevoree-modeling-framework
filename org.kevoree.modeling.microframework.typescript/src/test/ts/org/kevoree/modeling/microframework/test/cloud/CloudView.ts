///<reference path="../../../api/KView.ts"/>
///<reference path="../../../api/meta/MetaClass.ts"/>

interface CloudView extends KView {

  createNode(): Node;

  createElement(): Element;

}

module CloudView { 

  class METACLASSES implements MetaClass {

    public static ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE: METACLASSES = new METACLASSES("org.kevoree.modeling.microframework.test.cloud.Node", 0);
    public static ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT: METACLASSES = new METACLASSES("org.kevoree.modeling.microframework.test.cloud.Element", 1);
    private _name: string = null;
    private _index: number = 0;

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

    public equals(other: AccessMode): boolean {
        return this == other;
    }

  }


}
