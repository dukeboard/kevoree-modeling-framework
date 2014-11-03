///<reference path="trace/TraceSequence.ts"/>
///<reference path="../../../../java/util/JUList.ts"/>

interface ModelSlicer {

  slice(elems: JUList<KObject<any,any>>, callback: Callback<TraceSequence>): void;

}

