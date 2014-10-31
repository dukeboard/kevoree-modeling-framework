
class Token {

  public static XML_HEADER: Token = new Token();
  public static END_DOCUMENT: Token = new Token();
  public static START_TAG: Token = new Token();
  public static END_TAG: Token = new Token();
  public static COMMENT: Token = new Token();
  public static SINGLETON_TAG: Token = new Token();
  public equals(other: AccessMode): boolean {
        return this == other;
    }

}

