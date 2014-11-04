///<reference path="../../../../api/KDimension.ts"/>
///<reference path="../../../../api/KObject.ts"/>
///<reference path="../../../../api/abs/AbstractKView.ts"/>
///<reference path="../../../../api/meta/MetaClass.ts"/>
///<reference path="../../../../api/time/TimeTree.ts"/>
///<reference path="../CloudView.ts"/>
///<reference path="../Element.ts"/>
///<reference path="../Node.ts"/>

class CloudViewImpl extends AbstractKView implements CloudView {

  constructor(now: number, dimension: KDimension) {
    super(now, dimension);
  }

  public internalCreate(clazz: MetaClass, timeTree: TimeTree, key: number): KObject {
    if (clazz == null) {
      return null;
    }
    switch (clazz.index()) {
      case 0: 
      return manageCache(new NodeImpl(this, METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE, key, now(), dimension(), timeTree));
      case 1: 
      return manageCache(new ElementImpl(this, METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT, key, now(), dimension(), timeTree));
      default: 
      return null;
    }
  }

  public metaClasses(): MetaClass[] {
    return CloudView.METACLASSES.values();
  }

  public createNode(): Node {
    return <Node>create(METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_NODE);
  }

  public createElement(): Element {
    return <Element>create(METACLASSES.ORG_KEVOREE_MODELING_MICROFRAMEWORK_TEST_CLOUD_ELEMENT);
  }

}

