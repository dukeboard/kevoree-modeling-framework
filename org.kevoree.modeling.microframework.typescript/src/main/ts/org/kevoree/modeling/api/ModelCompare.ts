///<reference path="trace/TraceSequence.ts"/>

interface ModelCompare {

  diff(origin: KObject, target: KObject, callback: Callback<TraceSequence>): void;

  union(origin: KObject, target: KObject, callback: Callback<TraceSequence>): void;

  intersection(origin: KObject, target: KObject, callback: Callback<TraceSequence>): void;

}

