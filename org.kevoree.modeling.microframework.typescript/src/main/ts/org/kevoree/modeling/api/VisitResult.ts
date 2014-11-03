
class VisitResult {

  public static CONTINUE: VisitResult = new VisitResult();
  public static SKIP: VisitResult = new VisitResult();
  public static STOP: VisitResult = new VisitResult();
  public equals(other: AccessMode): boolean {
        return this == other;
    }

}

