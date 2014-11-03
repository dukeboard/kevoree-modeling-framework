
class ModelTraceConstants {

  public static traceType: ModelTraceConstants = new ModelTraceConstants("type");
  public static src: ModelTraceConstants = new ModelTraceConstants("src");
  public static meta: ModelTraceConstants = new ModelTraceConstants("meta");
  public static previouspath: ModelTraceConstants = new ModelTraceConstants("prev");
  public static typename: ModelTraceConstants = new ModelTraceConstants("class");
  public static objpath: ModelTraceConstants = new ModelTraceConstants("orig");
  public static content: ModelTraceConstants = new ModelTraceConstants("val");
  public static openJSON: ModelTraceConstants = new ModelTraceConstants("{");
  public static closeJSON: ModelTraceConstants = new ModelTraceConstants("}");
  public static bb: ModelTraceConstants = new ModelTraceConstants("\"");
  public static coma: ModelTraceConstants = new ModelTraceConstants(",");
  public static dp: ModelTraceConstants = new ModelTraceConstants(":");
  private _code: string = "";

  constructor(p_code: string) {
    this._code = p_code;
  }

  public toString(): string {
    return this._code;
  }

  public equals(other: AccessMode): boolean {
        return this == other;
    }

}

