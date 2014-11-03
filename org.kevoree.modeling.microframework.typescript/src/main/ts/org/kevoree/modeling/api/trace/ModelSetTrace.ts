///<reference path="../KActionType.ts"/>
///<reference path="../json/JSONString.ts"/>
///<reference path="../meta/Meta.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>

class ModelSetTrace implements ModelTrace {

  private traceType: KActionType = KActionType.SET;
  private srcKID: number = null;
  private attribute: MetaAttribute = null;
  private content: any = null;

  constructor(srcKID: number, attribute: MetaAttribute, content: any) {
    this.srcKID = srcKID;
    this.attribute = attribute;
    this.content = content;
  }

  public getTraceType(): KActionType {
    return this.traceType;
  }

  public getSrcKID(): number {
    return this.srcKID;
  }

  public getMeta(): Meta {
    return this.attribute;
  }

  public getContent(): any {
    return this.content;
  }

  public toString(): string {
    var buffer: StringBuilder = new StringBuilder();
    buffer.append(ModelTraceConstants.openJSON);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.traceType);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.dp);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(KActionType.SET);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.coma);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.src);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.dp);
    buffer.append(ModelTraceConstants.bb);
    JSONString.encodeBuffer(buffer, this.srcKID + "");
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.coma);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.meta);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.dp);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(this.attribute.metaName());
    buffer.append(ModelTraceConstants.bb);
    if (this.content != null) {
      buffer.append(ModelTraceConstants.coma);
      buffer.append(ModelTraceConstants.bb);
      buffer.append(ModelTraceConstants.content);
      buffer.append(ModelTraceConstants.bb);
      buffer.append(ModelTraceConstants.dp);
      buffer.append(ModelTraceConstants.bb);
      JSONString.encodeBuffer(buffer, this.content.toString());
      buffer.append(ModelTraceConstants.bb);
    }
    buffer.append(ModelTraceConstants.closeJSON);
    return buffer.toString();
  }

}

