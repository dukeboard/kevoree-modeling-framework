///<reference path="../KActionType.ts"/>
///<reference path="../json/JSONString.ts"/>
///<reference path="../meta/Meta.ts"/>
///<reference path="../meta/MetaReference.ts"/>

class ModelRemoveTrace implements ModelTrace {

  private traceType: KActionType = KActionType.REMOVE;
  private srcKID: number = null;
  private objKID: number = null;
  private reference: MetaReference = null;

  constructor(srcKID: number, reference: MetaReference, objKID: number) {
    this.srcKID = srcKID;
    this.reference = reference;
    this.objKID = objKID;
  }

  public getObjKID(): number {
    return this.objKID;
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

  public toString(): string {
    var buffer: StringBuilder = new StringBuilder();
    buffer.append(ModelTraceConstants.openJSON);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.traceType);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.dp);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(KActionType.REMOVE);
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
    buffer.append(this.reference.metaName());
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.coma);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.objpath);
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.dp);
    buffer.append(ModelTraceConstants.bb);
    JSONString.encodeBuffer(buffer, this.objKID + "");
    buffer.append(ModelTraceConstants.bb);
    buffer.append(ModelTraceConstants.closeJSON);
    return buffer.toString();
  }

}

