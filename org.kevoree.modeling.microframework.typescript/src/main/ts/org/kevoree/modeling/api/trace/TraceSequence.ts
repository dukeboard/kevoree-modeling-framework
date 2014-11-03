///<reference path="../Callback.ts"/>
///<reference path="../KActionType.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../json/JSONString.ts"/>
///<reference path="../json/Lexer.ts"/>
///<reference path="../json/JsonToken.ts"/>
///<reference path="../json/Type.ts"/>
///<reference path="unresolved/UnresolvedMetaAttribute.ts"/>
///<reference path="unresolved/UnresolvedMetaClass.ts"/>
///<reference path="unresolved/UnresolvedMetaReference.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/Collections.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>

class TraceSequence {

  private _traces: JUList<ModelTrace> = new JUArrayList<ModelTrace>();

  public traces(): ModelTrace[] {
    return this._traces.toArray(new Array());
  }

  public populate(addtraces: JUList<ModelTrace>): TraceSequence {
    this._traces.addAll(addtraces);
    return this;
  }

  public append(seq: TraceSequence): TraceSequence {
    this._traces.addAll(seq._traces);
    return this;
  }

  public parse(addtracesTxt: string): TraceSequence {
    var lexer: Lexer = new Lexer(addtracesTxt);
    var currentToken: JsonToken = lexer.nextToken();
    if (currentToken.tokenType() != Type.LEFT_BRACKET) {
      throw new Exception("Bad Format : expect [");
    }
    currentToken = lexer.nextToken();
    var keys: JUMap<string, string> = new JUHashMap<string, string>();
    var previousName: string = null;
    while (currentToken.tokenType() != Type.EOF && currentToken.tokenType() != Type.RIGHT_BRACKET){
      if (currentToken.tokenType() == Type.LEFT_BRACE) {
        keys.clear();
      }
      if (currentToken.tokenType() == Type.VALUE) {
        if (previousName != null) {
          keys.put(previousName, currentToken.value().toString());
          previousName = null;
        } else {
          previousName = currentToken.value().toString();
        }
      }
      if (currentToken.tokenType() == Type.RIGHT_BRACE) {
        var traceTypeRead: string = keys.get(ModelTraceConstants.traceType.toString());
        if (traceTypeRead.equals(KActionType.SET.toString())) {
          var srcFound: string = keys.get(ModelTraceConstants.src.toString());
          srcFound = JSONString.unescape(srcFound);
          this._traces.add(new ModelSetTrace(Long.parseLong(srcFound), new UnresolvedMetaAttribute(keys.get(ModelTraceConstants.meta.toString())), JSONString.unescape(keys.get(ModelTraceConstants.content.toString()))));
        }
        if (traceTypeRead.equals(KActionType.ADD.toString())) {
          var srcFound: string = keys.get(ModelTraceConstants.src.toString());
          srcFound = JSONString.unescape(srcFound);
          this._traces.add(new ModelAddTrace(Long.parseLong(srcFound), new UnresolvedMetaReference(keys.get(ModelTraceConstants.meta.toString())), Long.parseLong(keys.get(ModelTraceConstants.previouspath.toString())), new UnresolvedMetaClass(keys.get(ModelTraceConstants.typename.toString()))));
        }
        if (traceTypeRead.equals(KActionType.REMOVE.toString())) {
          var srcFound: string = keys.get(ModelTraceConstants.src.toString());
          srcFound = JSONString.unescape(srcFound);
          this._traces.add(new ModelRemoveTrace(Long.parseLong(srcFound), new UnresolvedMetaReference(keys.get(ModelTraceConstants.meta.toString())), Long.parseLong(keys.get(ModelTraceConstants.objpath.toString()))));
        }
      }
      currentToken = lexer.nextToken();
    }
    return this;
  }

  public toString(): string {
    var buffer: StringBuilder = new StringBuilder();
    buffer.append("[");
    var isFirst: boolean = true;
    for (var i: number = 0; i < this._traces.size(); i++) {
      var trace: ModelTrace = this._traces.get(i);
      if (!isFirst) {
        buffer.append(",\n");
      }
      buffer.append(trace);
      isFirst = false;
    }
    buffer.append("]");
    return buffer.toString();
  }

  public applyOn(target: KObject<any,any>, callback: Callback<Throwable>): boolean {
    var traceApplicator: ModelTraceApplicator = new ModelTraceApplicator(target);
    traceApplicator.applyTraceSequence(this, callback);
    return true;
  }

  public reverse(): TraceSequence {
    Collections.reverse(this._traces);
    return this;
  }

}

