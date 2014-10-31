
class XmlToken {

  public static XML_HEADER: XmlToken = new XmlToken();
  public static END_DOCUMENT: XmlToken = new XmlToken();
  public static START_TAG: XmlToken = new XmlToken();
  public static END_TAG: XmlToken = new XmlToken();
  public static COMMENT: XmlToken = new XmlToken();
  public static SINGLETON_TAG: XmlToken = new XmlToken();
  public equals(other: AccessMode): boolean {
        return this == other;
    }

}

