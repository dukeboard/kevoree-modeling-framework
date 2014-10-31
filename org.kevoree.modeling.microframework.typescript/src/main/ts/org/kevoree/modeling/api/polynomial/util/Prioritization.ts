
class Prioritization {

  public static SAMEPRIORITY: Prioritization = new Prioritization();
  public static HIGHDEGREES: Prioritization = new Prioritization();
  public static LOWDEGREES: Prioritization = new Prioritization();
  public equals(other: AccessMode): boolean {
        return this == other;
    }

}

