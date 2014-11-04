///<reference path="trace/TraceSequence.ts"/>

interface ModelCompare {

  diff(origin: KObject<any,any>, target: KObject<any,any>, callback: Callback<TraceSequence>): void;

  union(origin: KObject<any,any>, target: KObject<any,any>, callback: Callback<TraceSequence>): void;

  intersection(origin: KObject<any,any>, target: KObject<any,any>, callback: Callback<TraceSequence>): void;

}

