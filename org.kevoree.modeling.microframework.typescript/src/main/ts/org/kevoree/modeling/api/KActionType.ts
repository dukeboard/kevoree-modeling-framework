
class KActionType {

  public static SET: KActionType = new KActionType("SET");
  public static ADD: KActionType = new KActionType("ADD");
  public static REMOVE: KActionType = new KActionType("DEL");
  public static NEW: KActionType = new KActionType("NEW");
  private code: string = "";

  constructor(code: string) {
    this.code = code;
  }

  public toString(): string {
    return this.code;
  }

  public equals(other: AccessMode): boolean {
        return this == other;
    }

}

