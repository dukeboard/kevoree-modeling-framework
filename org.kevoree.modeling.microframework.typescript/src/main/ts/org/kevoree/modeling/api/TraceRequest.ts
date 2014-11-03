
class TraceRequest {

  public static ATTRIBUTES_ONLY: TraceRequest = new TraceRequest();
  public static REFERENCES_ONLY: TraceRequest = new TraceRequest();
  public static ATTRIBUTES_REFERENCES: TraceRequest = new TraceRequest();
  public equals(other: AccessMode): boolean {
        return this == other;
    }

}

