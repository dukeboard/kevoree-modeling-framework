
class MetaType {

  public static STRING: MetaType = new MetaType();
  public static LONG: MetaType = new MetaType();
  public static INT: MetaType = new MetaType();
  public static BOOL: MetaType = new MetaType();
  public static SHORT: MetaType = new MetaType();
  public static DOUBLE: MetaType = new MetaType();
  public static FLOAT: MetaType = new MetaType();
  public equals(other: AccessMode): boolean {
        return this == other;
    }

}

