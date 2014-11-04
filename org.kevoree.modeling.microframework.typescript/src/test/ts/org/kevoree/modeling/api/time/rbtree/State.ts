
class State {

  public static EXISTS: State = new State();
  public static DELETED: State = new State();
  public equals(other: AccessMode): boolean {
        return this == other;
    }

}

