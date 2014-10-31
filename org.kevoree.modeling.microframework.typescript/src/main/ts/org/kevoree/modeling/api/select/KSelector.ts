///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../util/CallBackChain.ts"/>
///<reference path="../util/Helper.ts"/>
///<reference path="../../../../../java/util/ArrayList.ts"/>
///<reference path="../../../../../java/util/HashSet.ts"/>
///<reference path="../../../../../java/util/List.ts"/>
///<reference path="../../../../../java/util/Set.ts"/>

class KSelector {

  public static select(root: KObject, query: string, callback: Callback<List<KObject>>): void {
    var extractedQuery: KQuery = KQuery.extractFirstQuery(query);
    var relationNameRegex: string = extractedQuery.relationName.replace("*", ".*");
    var collected: Set<number> = new HashSet<number>();
    var raw: any[] = root.dimension().universe().storage().raw(root, AccessMode.READ);
    for (var i: number = 0; i < root.metaReferences().length; i++) {
      var reference: MetaReference = root.metaReferences()[i];
      if (reference.metaName().matches(relationNameRegex)) {
        var refPayLoad: any = raw[reference.index()];
        if (refPayLoad != null) {
          if (refPayLoad instanceof Set) {
            var casted: Set<number> = <Set<number>>refPayLoad;
            collected.addAll(casted);
          } else {
            var casted: number = <number>refPayLoad;
            collected.add(casted);
          }
        }
      }
    }
    root.view().lookupAll(collected, {on:function(resolveds: List<KObject>){
    var nextGeneration: List<KObject> = new ArrayList<KObject>();
    if (extractedQuery.params.isEmpty()) {
      nextGeneration.addAll(resolveds);
    } else {
      for (var i: number = 0; i < resolveds.size(); i++) {
        var resolved: KObject = resolveds.get(i);
        var selectedForNext: boolean = true;
        //TODO resolve for-each cycle
        var paramKey: string;
        for (paramKey in extractedQuery.params.keySet()) {
          var param: KQueryParam = extractedQuery.params.get(paramKey);
          for (var j: number = 0; j < resolved.metaAttributes().length; j++) {
            var metaAttribute: MetaAttribute = resolved.metaAttributes()[i];
            if (metaAttribute.metaName().matches(param.name().replace("*", ".*"))) {
              var o_raw: any = resolved.get(metaAttribute);
              if (o_raw != null) {
                if (o_raw.toString().matches(param.value().replace("*", ".*"))) {
                  if (param.isNegative()) {
                    selectedForNext = false;
                  }
                } else {
                  if (!param.isNegative()) {
                    selectedForNext = false;
                  }
                }
              } else {
                if (!param.isNegative() && !param.value().equals("null")) {
                  selectedForNext = false;
                }
              }
            }
          }
        }
        if (selectedForNext) {
          nextGeneration.add(resolved);
        }
      }
    }
    var childSelected: List<KObject> = new ArrayList<KObject>();
    if (extractedQuery.subQuery == null || extractedQuery.subQuery.isEmpty()) {
      childSelected.add(root);
      callback.on(nextGeneration);
    } else {
      Helper.forall(nextGeneration.toArray(new Array()), {on:function(kObject: KObject, next: Callback<Throwable>){
      KSelector.select(kObject, extractedQuery.subQuery, {on:function(kObjects: List<KObject>){
      childSelected.addAll(childSelected);
}});
}}, {on:function(throwable: Throwable){
      callback.on(childSelected);
}});
    }
}});
  }

}

