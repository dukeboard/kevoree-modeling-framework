///<reference path="../KActionType.ts"/>
///<reference path="../json/JSONString.ts"/>
///<reference path="../meta/Meta.ts"/>
///<reference path="../meta/MetaClass.ts"/>
///<reference path="../meta/MetaReference.ts"/>

class ModelAddTrace implements ModelTrace {

  private reference: MetaReference = null;
  private traceType: KActionType = KActionType.ADD;
  private srcKID: number = null;
  private previousKID: number = null;
  private metaClass: MetaClass = null;

  public getPreviousKID(): number {
    return this.previousKID;
  }

  public getMetaClass(): MetaClass {
    return this.metaClass;
  }

  constructor(srcKID: number, reference: MetaReference, previousKID: number, metaClass: MetaClass) {
    this.srcKID = srcKID;
    this.reference = reference;
    this.previousKID = previousKID;
    this.metaClass = metaClass;
  }

  public toString(): string {
    var buffer: StringBuilder = new StringBuilder();
    buffer.append(ModelTraceConstants.openJSON);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.traceType);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.dp);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(KActionType.ADD.toString());
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.coma);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.src);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.dp);
    buffer.append(ModelTraceConstants.bb);
    JSONString.encodeBuffer(buffer, this.srcKID + "");
    buffer.append(ModelTraceConstants.bb);
    if (this.reference != null) {
      buffer.append(ModelTraceConstants.coma);
      buffer.append(ModelTraceConstants.bb);
      buffer.append(ModelTraceConstants.meta);
      buffer.append(ModelTraceConstants.bb);
      buffer.append(ModelTraceConstants.dp);
      buffer.append(ModelTraceConstants.bb);
      buffer.append(this.reference.metaName());
      buffer.append(ModelTraceConstants.bb);
    }
    if (this.previousKID != null) {
      buffer.append(ModelTraceConstants.coma);
      buffer.append(ModelTraceConstants.bb);
      buffer.append(ModelTraceConstants.previouspath);
      buffer.append(ModelTraceConstants.bb);
      buffer.append(ModelTraceConstants.dp);
      buffer.append(ModelTraceConstants.bb);
      JSONString.encodeBuffer(buffer, this.previousKID + "");
      buffer.append(ModelTraceConstants.bb);
    }
    if (this.metaClass != null) {
      buffer.append(ModelTraceConstants.coma);
      buffer.append(ModelTraceConstants.bb);
      buffer.append(ModelTraceConstants.typename);
      buffer.append(ModelTraceConstants.bb);
      buffer.append(ModelTraceConstants.dp);
      buffer.append(ModelTraceConstants.bb);
      JSONString.encodeBuffer(buffer, this.metaClass.metaName());
      buffer.append(ModelTraceConstants.bb);
    }
    buffer.append(ModelTraceConstants.closeJSON);
    return buffer.toString();
  }

  public getMeta(): Meta {
    return this.reference;
  }

  public getTraceType(): KActionType {
    return this.traceType;
  }

  public getSrcKID(): number {
    return this.srcKID;
  }

}

