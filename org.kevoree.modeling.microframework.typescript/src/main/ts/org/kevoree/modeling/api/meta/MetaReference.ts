
interface MetaReference extends Meta {

  contained(): boolean;

  single(): boolean;

  metaType(): MetaClass;

  opposite(): MetaReference;

  origin(): MetaClass;

}

