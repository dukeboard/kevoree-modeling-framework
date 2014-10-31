///<reference path="trace/TraceSequence.ts"/>
///<reference path="../../../../java/util/List.ts"/>

interface ModelSlicer {

  slice(elems: List<KObject>, callback: Callback<TraceSequence>): void;

}

