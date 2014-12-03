module org {
    export module kevoree {
        export module modeling {
            export module api {
                export module abs {
                    export class AbstractKDimension<A extends org.kevoree.modeling.api.KView, B extends org.kevoree.modeling.api.KDimension<any, any, any>, C extends org.kevoree.modeling.api.KUniverse<any>> implements org.kevoree.modeling.api.KDimension<any, any, any> {

                        private _universe: org.kevoree.modeling.api.KUniverse<any>;
                        private _key: number;
                        constructor(p_universe: org.kevoree.modeling.api.KUniverse<any>, p_key: number) {
                            this._universe = p_universe;
                            this._key = p_key;
                        }

                        public key(): number {
                            return this._key;
                        }

                        public universe(): C {
                            return <C>this._universe;
                        }

                        public save(callback: (p : java.lang.Throwable) => void): void {
                            this.universe().storage().save(this, callback);
                        }

                        public saveUnload(callback: (p : java.lang.Throwable) => void): void {
                            this.universe().storage().saveUnload(this, callback);
                        }

                        public delete(callback: (p : java.lang.Throwable) => void): void {
                            this.universe().storage().delete(this, callback);
                        }

                        public discard(callback: (p : java.lang.Throwable) => void): void {
                            this.universe().storage().discard(this, callback);
                        }

                        public parent(callback: (p : B) => void): void {
                        }

                        public children(callback: (p : B[]) => void): void {
                        }

                        public fork(callback: (p : B) => void): void {
                        }

                        public time(timePoint: number): A {
                            return this.internal_create(timePoint);
                        }

                        public listen(listener: (p : org.kevoree.modeling.api.KEvent) => void, scope: org.kevoree.modeling.api.event.ListenerScope): void {
                            this.universe().storage().eventBroker().registerListener(this, listener, scope);
                        }

                        public internal_create(timePoint: number): A {
                            throw "Abstract method";
                        }

                        public equals(obj: any): boolean {
                            if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKDimension)) {
                                return false;
                            } else {
                                var casted: org.kevoree.modeling.api.abs.AbstractKDimension<any, any, any> = <org.kevoree.modeling.api.abs.AbstractKDimension<any, any, any>>obj;
                                return casted._key == this._key;
                            }
                        }

                    }

                    export class AbstractKObject<A extends org.kevoree.modeling.api.KObject<any, any>, B extends org.kevoree.modeling.api.KView> implements org.kevoree.modeling.api.KObject<any, any> {

                        private _view: B;
                        private _uuid: number;
                        private _timeTree: org.kevoree.modeling.api.time.TimeTree;
                        private _metaClass: org.kevoree.modeling.api.meta.MetaClass;
                        constructor(p_view: B, p_uuid: number, p_timeTree: org.kevoree.modeling.api.time.TimeTree, p_metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            this._view = p_view;
                            this._uuid = p_uuid;
                            this._timeTree = p_timeTree;
                            this._metaClass = p_metaClass;
                        }

                        public view(): B {
                            return this._view;
                        }

                        public uuid(): number {
                            return this._uuid;
                        }

                        public metaClass(): org.kevoree.modeling.api.meta.MetaClass {
                            return this._metaClass;
                        }

                        public isRoot(): boolean {
                            var isRoot: boolean = <boolean>this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX];
                            if (isRoot == null) {
                                return false;
                            } else {
                                return isRoot;
                            }
                        }

                        public setRoot(isRoot: boolean): void {
                            this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = isRoot;
                        }

                        public now(): number {
                            return this._view.now();
                        }

                        public timeTree(): org.kevoree.modeling.api.time.TimeTree {
                            return this._timeTree;
                        }

                        public dimension(): org.kevoree.modeling.api.KDimension<any, any, any> {
                            return this._view.dimension();
                        }

                        public path(callback: (p : string) => void): void {
                            if (this.isRoot()) {
                                callback("/");
                            } else {
                                this.parent( (parent : org.kevoree.modeling.api.KObject<any, any>) => {
                                    if (parent == null) {
                                        callback(null);
                                    } else {
                                        parent.path( (parentPath : string) => {
                                            callback(org.kevoree.modeling.api.util.Helper.path(parentPath, this.referenceInParent(), this));
                                        });
                                    }
                                });
                            }
                        }

                        public parentUuid(): number {
                            return <number>this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[org.kevoree.modeling.api.data.Index.PARENT_INDEX];
                        }

                        public parent(callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void {
                            var parentKID: number = this.parentUuid();
                            if (parentKID == null) {
                                callback(null);
                            } else {
                                this._view.lookup(parentKID, callback);
                            }
                        }

                        public referenceInParent(): org.kevoree.modeling.api.meta.MetaReference {
                            return <org.kevoree.modeling.api.meta.MetaReference>this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX];
                        }

                        public delete(callback: (p : java.lang.Throwable) => void): void {
                            var toRemove: org.kevoree.modeling.api.KObject<any, any> = this;
                            var rawPayload: any[] = this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.DELETE);
                            var payload: any = rawPayload[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                            if (payload != null) {
                                try {
                                    var refs: java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference> = <java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference>>payload;
                                    var refArr: number[] = refs.keySet().toArray(new Array());
                                    this.view().lookupAll(refArr,  (resolved : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                        for (var i: number = 0; i < resolved.length; i++) {
                                            if (resolved[i] != null) {
                                                resolved[i].mutate(org.kevoree.modeling.api.KActionType.REMOVE, refs.get(refArr[i]), toRemove, false);
                                            }
                                        }
                                        callback(null);
                                    });
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        e.printStackTrace();
                                        callback(e);
                                    }
                                 }
                            } else {
                                callback(new java.lang.Exception("Out of cache error"));
                            }
                        }

                        public select(query: string, callback: (p : org.kevoree.modeling.api.KObject<any, any>[]) => void): void {
                            org.kevoree.modeling.api.select.KSelector.select(this, query, callback);
                        }

                        public stream(query: string, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void {
                        }

                        public listen(listener: (p : org.kevoree.modeling.api.KEvent) => void, scope: org.kevoree.modeling.api.event.ListenerScope): void {
                            this.view().dimension().universe().storage().eventBroker().registerListener(this, listener, scope);
                        }

                        public jump(time: number, callback: (p : A) => void): void {
                            this.view().dimension().time(time).lookup(this._uuid,  (kObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                callback(<A>kObject);
                            });
                        }

                        public domainKey(): string {
                            var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                            var atts: org.kevoree.modeling.api.meta.MetaAttribute[] = this.metaAttributes();
                            for (var i: number = 0; i < atts.length; i++) {
                                var att: org.kevoree.modeling.api.meta.MetaAttribute = atts[i];
                                if (att.key()) {
                                    if (builder.length != 0) {
                                        builder.append(",");
                                    }
                                    builder.append(att.metaName());
                                    builder.append("=");
                                    var payload: any = this.get(att);
                                    if (payload != null) {
                                        builder.append(payload.toString());
                                    }
                                }
                            }
                            return builder.toString();
                        }

                        public get(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any {
                            return attribute.strategy().extrapolate(this, attribute);
                        }

                        public set(attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void {
                            attribute.strategy().mutate(this, attribute, payload);
                            this.view().dimension().universe().storage().eventBroker().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.SET, this, attribute, payload));
                        }

                        private getCreateOrUpdatePayloadList(obj: org.kevoree.modeling.api.KObject<any, any>, payloadIndex: number): any {
                            var previous: any = this.view().dimension().universe().storage().raw(obj, org.kevoree.modeling.api.data.AccessMode.WRITE)[payloadIndex];
                            if (previous == null) {
                                if (payloadIndex == org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX) {
                                    previous = new java.util.HashMap<number, org.kevoree.modeling.api.meta.MetaReference>();
                                } else {
                                    previous = new java.util.HashSet<number>();
                                }
                                this.view().dimension().universe().storage().raw(obj, org.kevoree.modeling.api.data.AccessMode.WRITE)[payloadIndex] = previous;
                            }
                            return previous;
                        }

                        private removeFromContainer(param: org.kevoree.modeling.api.KObject<any, any>): void {
                            if (param != null && param.parentUuid() != null && param.parentUuid() != this._uuid) {
                                this.view().lookup(param.parentUuid(),  (parent : org.kevoree.modeling.api.KObject<any, any>) => {
                                    parent.mutate(org.kevoree.modeling.api.KActionType.REMOVE, param.referenceInParent(), param, true);
                                });
                            }
                        }

                        public mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject<any, any>, setOpposite: boolean): void {
                            if (actionType.equals(org.kevoree.modeling.api.KActionType.ADD)) {
                                if (metaReference.single()) {
                                    this.mutate(org.kevoree.modeling.api.KActionType.SET, metaReference, param, setOpposite);
                                } else {
                                    var previousList: java.util.Set<number> = <java.util.Set<number>>this.getCreateOrUpdatePayloadList(this, metaReference.index());
                                    previousList.add(param.uuid());
                                    if (metaReference.opposite() != null && setOpposite) {
                                        param.mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false);
                                    }
                                    if (metaReference.contained()) {
                                        this.removeFromContainer(param);
                                        (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>param).set_parent(this._uuid, metaReference);
                                    }
                                    var inboundRefs: java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference> = <java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference>>this.getCreateOrUpdatePayloadList(param, org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX);
                                    inboundRefs.put(this.uuid(), metaReference);
                                    var event: org.kevoree.modeling.api.KEvent = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                                    this.view().dimension().universe().storage().eventBroker().notify(event);
                                }
                            } else {
                                if (actionType.equals(org.kevoree.modeling.api.KActionType.SET)) {
                                    if (!metaReference.single()) {
                                        this.mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference, param, setOpposite);
                                    } else {
                                        if (param == null) {
                                            this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite);
                                        } else {
                                            var payload: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var previous: any = payload[metaReference.index()];
                                            if (previous != null) {
                                                this.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference, null, setOpposite);
                                            }
                                            payload[metaReference.index()] = param.uuid();
                                            if (metaReference.contained()) {
                                                this.removeFromContainer(param);
                                                (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>param).set_parent(this._uuid, metaReference);
                                            }
                                            var inboundRefs: java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference> = <java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference>>this.getCreateOrUpdatePayloadList(param, org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX);
                                            inboundRefs.put(this.uuid(), metaReference);
                                            var self: org.kevoree.modeling.api.KObject<any, any> = this;
                                            if (metaReference.opposite() != null && setOpposite) {
                                                if (previous != null) {
                                                    this.view().lookup(<number>previous,  (resolved : org.kevoree.modeling.api.KObject<any, any>) => {
                                                        resolved.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false);
                                                    });
                                                }
                                                param.mutate(org.kevoree.modeling.api.KActionType.ADD, metaReference.opposite(), this, false);
                                            }
                                            var event: org.kevoree.modeling.api.KEvent = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                                            this.view().dimension().universe().storage().eventBroker().notify(event);
                                        }
                                    }
                                } else {
                                    if (actionType.equals(org.kevoree.modeling.api.KActionType.REMOVE)) {
                                        if (metaReference.single()) {
                                            var raw: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var previousKid: any = raw[metaReference.index()];
                                            raw[metaReference.index()] = null;
                                            if (previousKid != null) {
                                                var self: org.kevoree.modeling.api.KObject<any, any> = this;
                                                this._view.dimension().universe().storage().lookup(this._view, <number>previousKid,  (resolvedParam : org.kevoree.modeling.api.KObject<any, any>) => {
                                                    if (resolvedParam != null) {
                                                        if (metaReference.contained()) {
                                                            (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>resolvedParam).set_parent(null, null);
                                                        }
                                                        if (metaReference.opposite() != null && setOpposite) {
                                                            resolvedParam.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), self, false);
                                                        }
                                                        var inboundRefs: java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference> = <java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference>>this.getCreateOrUpdatePayloadList(resolvedParam, org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX);
                                                        inboundRefs.remove(this.uuid());
                                                    }
                                                });
                                                var event: org.kevoree.modeling.api.KEvent = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, previousKid);
                                                this.view().dimension().universe().storage().eventBroker().notify(event);
                                            }
                                        } else {
                                            var payload: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                            var previous: any = payload[metaReference.index()];
                                            if (previous != null) {
                                                var previousList: java.util.Set<number> = <java.util.Set<number>>previous;
                                                previousList.remove(param.uuid());
                                                if (metaReference.contained()) {
                                                    (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>param).set_parent(null, null);
                                                }
                                                if (metaReference.opposite() != null && setOpposite) {
                                                    param.mutate(org.kevoree.modeling.api.KActionType.REMOVE, metaReference.opposite(), this, false);
                                                }
                                                var event: org.kevoree.modeling.api.KEvent = new org.kevoree.modeling.api.event.DefaultKEvent(actionType, this, metaReference, param);
                                                this.view().dimension().universe().storage().eventBroker().notify(event);
                                            }
                                            var inboundRefs: java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference> = <java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference>>this.getCreateOrUpdatePayloadList(param, org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX);
                                            inboundRefs.remove(this.uuid());
                                        }
                                    }
                                }
                            }
                        }

                        public size(metaReference: org.kevoree.modeling.api.meta.MetaReference): number {
                            var raw: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            var ref: any = raw[metaReference.index()];
                            if (ref == null) {
                                return 0;
                            } else {
                                var refSet: java.util.Set<any> = <java.util.Set<any>>ref;
                                return refSet.size();
                            }
                        }

                        public each<C extends org.kevoree.modeling.api.KObject<any, any>> (metaReference: org.kevoree.modeling.api.meta.MetaReference, callback: (p : C) => void, end: (p : java.lang.Throwable) => void): void {
                            var o: any = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ)[metaReference.index()];
                            if (o == null) {
                                if (end != null) {
                                    end(null);
                                } else {
                                    callback(null);
                                }
                            } else {
                                if (o instanceof java.util.Set) {
                                    var objs: java.util.Set<number> = <java.util.Set<number>>o;
                                    var setContent: number[] = objs.toArray(new Array());
                                    this.view().lookupAll(setContent,  (result : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                        var endAlreadyCalled: boolean = false;
                                        try {
                                            for (var l: number = 0; l < result.length; l++) {
                                                callback(<C>result[l]);
                                            }
                                            endAlreadyCalled = true;
                                            if (end != null) {
                                                end(null);
                                            }
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Throwable) {
                                                var t: java.lang.Throwable = <java.lang.Throwable>$ex$;
                                                if (!endAlreadyCalled) {
                                                    if (end != null) {
                                                        end(t);
                                                    }
                                                }
                                            }
                                         }
                                    });
                                } else {
                                    this.view().lookup(<number>o,  (resolved : org.kevoree.modeling.api.KObject<any, any>) => {
                                        if (callback != null) {
                                            callback(<C>resolved);
                                        }
                                        if (end != null) {
                                            end(null);
                                        }
                                    });
                                }
                            }
                        }

                        public visitAttributes(visitor: (p : org.kevoree.modeling.api.meta.MetaAttribute, p1 : any) => void): void {
                            var metaAttributes: org.kevoree.modeling.api.meta.MetaAttribute[] = this.metaAttributes();
                            for (var i: number = 0; i < metaAttributes.length; i++) {
                                visitor(metaAttributes[i], this.get(metaAttributes[i]));
                            }
                        }

                        public metaAttribute(name: string): org.kevoree.modeling.api.meta.MetaAttribute {
                            for (var i: number = 0; i < this.metaAttributes().length; i++) {
                                if (this.metaAttributes()[i].metaName().equals(name)) {
                                    return this.metaAttributes()[i];
                                }
                            }
                            return null;
                        }

                        public metaReference(name: string): org.kevoree.modeling.api.meta.MetaReference {
                            for (var i: number = 0; i < this.metaReferences().length; i++) {
                                if (this.metaReferences()[i].metaName().equals(name)) {
                                    return this.metaReferences()[i];
                                }
                            }
                            return null;
                        }

                        public metaOperation(name: string): org.kevoree.modeling.api.meta.MetaOperation {
                            for (var i: number = 0; i < this.metaOperations().length; i++) {
                                if (this.metaOperations()[i].metaName().equals(name)) {
                                    return this.metaOperations()[i];
                                }
                            }
                            return null;
                        }

                        public visit(visitor: (p : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (p : java.lang.Throwable) => void): void {
                            this.internal_visit(visitor, end, false, false, null);
                        }

                        private internal_visit(visitor: (p : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (p : java.lang.Throwable) => void, deep: boolean, treeOnly: boolean, alreadyVisited: java.util.HashSet<number>): void {
                            if (alreadyVisited != null) {
                                alreadyVisited.add(this.uuid());
                            }
                            var toResolveds: java.util.Set<number> = new java.util.HashSet<number>();
                            for (var i: number = 0; i < this.metaReferences().length; i++) {
                                var reference: org.kevoree.modeling.api.meta.MetaReference = this.metaReferences()[i];
                                if (!(treeOnly && !reference.contained())) {
                                    var raw: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                                    var o: any = null;
                                    if (raw != null) {
                                        o = raw[reference.index()];
                                    }
                                    if (o != null) {
                                        if (o instanceof java.util.Set) {
                                            var ol: java.util.Set<number> = <java.util.Set<number>>o;
                                            var olArr: number[] = ol.toArray(new Array());
                                            for (var k: number = 0; k < olArr.length; k++) {
                                                toResolveds.add(olArr[k]);
                                            }
                                        } else {
                                            toResolveds.add(<number>o);
                                        }
                                    }
                                }
                            }
                            if (toResolveds.isEmpty()) {
                                end(null);
                            } else {
                                this.view().lookupAll(toResolveds.toArray(new Array()),  (resolveds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    var nextDeep: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                                    for (var i: number = 0; i < resolveds.length; i++) {
                                        var resolved: org.kevoree.modeling.api.KObject<any, any> = resolveds[i];
                                        var result: org.kevoree.modeling.api.VisitResult = visitor(resolved);
                                        if (result.equals(org.kevoree.modeling.api.VisitResult.STOP)) {
                                            end(null);
                                        } else {
                                            if (deep) {
                                                if (result.equals(org.kevoree.modeling.api.VisitResult.CONTINUE)) {
                                                    if (alreadyVisited == null || !alreadyVisited.contains(resolved.uuid())) {
                                                        nextDeep.add(resolved);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (!nextDeep.isEmpty()) {
                                        var ii: number[] = new Array();
                                        ii[0] = 0;
                                        var next: java.util.List<(p : java.lang.Throwable) => void> = new java.util.ArrayList<(p : java.lang.Throwable) => void>();
                                        next.add( (throwable : java.lang.Throwable) => {
                                            ii[0] = ii[0] + 1;
                                            if (ii[0] == nextDeep.size()) {
                                                end(null);
                                            } else {
                                                if (treeOnly) {
                                                    nextDeep.get(ii[0]).treeVisit(visitor, next.get(0));
                                                } else {
                                                    nextDeep.get(ii[0]).graphVisit(visitor, next.get(0));
                                                }
                                            }
                                        });
                                        if (treeOnly) {
                                            nextDeep.get(ii[0]).treeVisit(visitor, next.get(0));
                                        } else {
                                            nextDeep.get(ii[0]).graphVisit(visitor, next.get(0));
                                        }
                                    } else {
                                        end(null);
                                    }
                                });
                            }
                        }

                        public graphVisit(visitor: (p : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (p : java.lang.Throwable) => void): void {
                            this.internal_visit(visitor, end, true, false, new java.util.HashSet<number>());
                        }

                        public treeVisit(visitor: (p : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (p : java.lang.Throwable) => void): void {
                            this.internal_visit(visitor, end, true, true, null);
                        }

                        public toJSON(): string {
                            return org.kevoree.modeling.api.data.JsonRaw.encode(this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ), this._uuid, this._metaClass);
                        }

                        public toString(): string {
                            return this.toJSON();
                        }

                        public traces(request: org.kevoree.modeling.api.TraceRequest): org.kevoree.modeling.api.trace.ModelTrace[] {
                            var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
                            if (org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY.equals(request) || org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
                                for (var i: number = 0; i < this.metaAttributes().length; i++) {
                                    var current: org.kevoree.modeling.api.meta.MetaAttribute = this.metaAttributes()[i];
                                    var payload: any = this.get(current);
                                    if (payload != null) {
                                        traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(this._uuid, current, payload));
                                    }
                                }
                            }
                            if (org.kevoree.modeling.api.TraceRequest.REFERENCES_ONLY.equals(request) || org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
                                for (var i: number = 0; i < this.metaReferences().length; i++) {
                                    var ref: org.kevoree.modeling.api.meta.MetaReference = this.metaReferences()[i];
                                    var raw: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                                    var o: any = null;
                                    if (raw != null) {
                                        o = raw[ref.index()];
                                    }
                                    if (o instanceof java.util.Set) {
                                        var contents: java.util.Set<number> = <java.util.Set<number>>o;
                                        var contentsArr: number[] = contents.toArray(new Array());
                                        for (var j: number = 0; j < contentsArr.length; j++) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, contentsArr[j], null));
                                        }
                                    } else {
                                        if (o != null) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(this._uuid, ref, <number>o, null));
                                        }
                                    }
                                }
                            }
                            return traces.toArray(new Array());
                        }

                        public inbounds(callback: (p : org.kevoree.modeling.api.InboundReference) => void, end: (p : java.lang.Throwable) => void): void {
                            var rawPayload: any[] = this.view().dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (rawPayload == null) {
                                end(new java.lang.Exception("Object not initialized."));
                            } else {
                                var payload: any = rawPayload[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                if (payload != null) {
                                    if (payload instanceof java.util.Map) {
                                        var refs: java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference> = <java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference>>payload;
                                        var oppositeKids: java.util.Set<number> = new java.util.HashSet<number>();
                                        oppositeKids.addAll(refs.keySet());
                                        this._view.lookupAll(oppositeKids.toArray(new Array()),  (oppositeElements : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                            if (oppositeElements != null) {
                                                for (var k: number = 0; k < oppositeElements.length; k++) {
                                                    var opposite: org.kevoree.modeling.api.KObject<any, any> = oppositeElements[k];
                                                    var metaRef: org.kevoree.modeling.api.meta.MetaReference = refs.get(opposite.uuid());
                                                    if (metaRef != null) {
                                                        var reference: org.kevoree.modeling.api.InboundReference = new org.kevoree.modeling.api.InboundReference(metaRef, opposite);
                                                        try {
                                                            if (callback != null) {
                                                                callback(reference);
                                                            }
                                                        } catch ($ex$) {
                                                            if ($ex$ instanceof java.lang.Throwable) {
                                                                var t: java.lang.Throwable = <java.lang.Throwable>$ex$;
                                                                if (end != null) {
                                                                    end(t);
                                                                }
                                                            }
                                                         }
                                                    } else {
                                                        if (end != null) {
                                                            end(new java.lang.Exception("MetaReference not found with index:" + metaRef + " in refs of " + opposite.metaClass().metaName()));
                                                        }
                                                    }
                                                }
                                                if (end != null) {
                                                    end(null);
                                                }
                                            } else {
                                                if (end != null) {
                                                    end(new java.lang.Exception("Could not resolve opposite objects"));
                                                }
                                            }
                                        });
                                    } else {
                                        if (end != null) {
                                            end(new java.lang.Exception("Inbound refs payload is not a cset"));
                                        }
                                    }
                                } else {
                                    if (end != null) {
                                        end(null);
                                    }
                                }
                            }
                        }

                        public set_parent(p_parentKID: number, p_metaReference: org.kevoree.modeling.api.meta.MetaReference): void {
                            var raw: any[] = this._view.dimension().universe().storage().raw(this, org.kevoree.modeling.api.data.AccessMode.WRITE);
                            raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] = p_parentKID;
                            raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] = p_metaReference;
                        }

                        public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                            throw "Abstract method";
                        }

                        public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                            throw "Abstract method";
                        }

                        public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
                            throw "Abstract method";
                        }

                        public equals(obj: any): boolean {
                            if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKObject)) {
                                return false;
                            } else {
                                var casted: org.kevoree.modeling.api.abs.AbstractKObject<any, any> = <org.kevoree.modeling.api.abs.AbstractKObject<any, any>>obj;
                                return (casted.uuid() == this._uuid) && this._view.equals(casted._view);
                            }
                        }

                    }

                    export class AbstractKUniverse<A extends org.kevoree.modeling.api.KDimension<any, any, any>> implements org.kevoree.modeling.api.KUniverse<any> {

                        private _storage: org.kevoree.modeling.api.data.KStore;
                        constructor() {
                            this._storage = new org.kevoree.modeling.api.data.DefaultKStore();
                        }

                        public connect(callback: (p : java.lang.Throwable) => void): void {
                            this._storage.connect(callback);
                        }

                        public close(callback: (p : java.lang.Throwable) => void): void {
                            this._storage.close(callback);
                        }

                        public storage(): org.kevoree.modeling.api.data.KStore {
                            return this._storage;
                        }

                        public newDimension(): A {
                            var nextKey: number = this._storage.nextDimensionKey();
                            var newDimension: A = this.internal_create(nextKey);
                            this.storage().initDimension(newDimension);
                            return newDimension;
                        }

                        public internal_create(key: number): A {
                            throw "Abstract method";
                        }

                        public dimension(key: number): A {
                            var newDimension: A = this.internal_create(key);
                            this.storage().initDimension(newDimension);
                            return newDimension;
                        }

                        public saveAll(callback: (p : boolean) => void): void {
                        }

                        public deleteAll(callback: (p : boolean) => void): void {
                        }

                        public unloadAll(callback: (p : boolean) => void): void {
                        }

                        public disable(listener: (p : org.kevoree.modeling.api.KEvent) => void): void {
                        }

                        public stream(query: string, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void {
                        }

                        public listen(listener: (p : org.kevoree.modeling.api.KEvent) => void, scope: org.kevoree.modeling.api.event.ListenerScope): void {
                            this.storage().eventBroker().registerListener(this, listener, scope);
                        }

                        public setEventBroker(eventBroker: org.kevoree.modeling.api.event.KEventBroker): org.kevoree.modeling.api.KUniverse<any> {
                            this.storage().setEventBroker(eventBroker);
                            return this;
                        }

                        public setDataBase(dataBase: org.kevoree.modeling.api.data.KDataBase): org.kevoree.modeling.api.KUniverse<any> {
                            this.storage().setDataBase(dataBase);
                            return this;
                        }

                        public setOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, operation: (p : org.kevoree.modeling.api.KObject<any, any>, p1 : any[], p2 : (p : any) => void) => void): void {
                            this.storage().operationManager().registerOperation(metaOperation, operation);
                        }

                    }

                    export class AbstractKView implements org.kevoree.modeling.api.KView {

                        private _now: number;
                        private _dimension: org.kevoree.modeling.api.KDimension<any, any, any>;
                        constructor(p_now: number, p_dimension: org.kevoree.modeling.api.KDimension<any, any, any>) {
                            this._now = p_now;
                            this._dimension = p_dimension;
                        }

                        public now(): number {
                            return this._now;
                        }

                        public dimension(): org.kevoree.modeling.api.KDimension<any, any, any> {
                            return this._dimension;
                        }

                        public metaClass(fqName: string): org.kevoree.modeling.api.meta.MetaClass {
                            var metaClasses: org.kevoree.modeling.api.meta.MetaClass[] = this.metaClasses();
                            for (var i: number = 0; i < metaClasses.length; i++) {
                                if (metaClasses[i].metaName().equals(fqName)) {
                                    return metaClasses[i];
                                }
                            }
                            return null;
                        }

                        public createFQN(metaClassName: string): org.kevoree.modeling.api.KObject<any, any> {
                            return this.create(this.metaClass(metaClassName));
                        }

                        public setRoot(elem: org.kevoree.modeling.api.KObject<any, any>, callback: (p : java.lang.Throwable) => void): void {
                            (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>elem).set_parent(null, null);
                            (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>elem).setRoot(true);
                            this.dimension().universe().storage().setRoot(elem, callback);
                        }

                        public select(query: string, callback: (p : org.kevoree.modeling.api.KObject<any, any>[]) => void): void {
                            this.dimension().universe().storage().getRoot(this,  (rootObj : org.kevoree.modeling.api.KObject<any, any>) => {
                                var cleanedQuery: string = query;
                                if (cleanedQuery.equals("/")) {
                                    var res: java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                                    if (rootObj != null) {
                                        res.add(rootObj);
                                    }
                                    callback(res.toArray(new Array()));
                                } else {
                                    if (cleanedQuery.startsWith("/")) {
                                        cleanedQuery = cleanedQuery.substring(1);
                                    }
                                    org.kevoree.modeling.api.select.KSelector.select(rootObj, cleanedQuery, callback);
                                }
                            });
                        }

                        public lookup(kid: number, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void {
                            this.dimension().universe().storage().lookup(this, kid, callback);
                        }

                        public lookupAll(keys: number[], callback: (p : org.kevoree.modeling.api.KObject<any, any>[]) => void): void {
                            this.dimension().universe().storage().lookupAll(this, keys, callback);
                        }

                        public stream(query: string, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void {
                        }

                        public createProxy(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: number): org.kevoree.modeling.api.KObject<any, any> {
                            return this.internalCreate(clazz, timeTree, key);
                        }

                        public create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject<any, any> {
                            var newObj: org.kevoree.modeling.api.KObject<any, any> = this.internalCreate(clazz, new org.kevoree.modeling.api.time.DefaultTimeTree().insert(this.now()), this.dimension().universe().storage().nextObjectKey());
                            if (newObj != null) {
                                this.dimension().universe().storage().initKObject(newObj, this);
                                this.dimension().universe().storage().eventBroker().notify(new org.kevoree.modeling.api.event.DefaultKEvent(org.kevoree.modeling.api.KActionType.NEW, newObj, clazz, null));
                            }
                            return newObj;
                        }

                        public listen(listener: (p : org.kevoree.modeling.api.KEvent) => void, scope: org.kevoree.modeling.api.event.ListenerScope): void {
                            this.dimension().universe().storage().eventBroker().registerListener(this, listener, scope);
                        }

                        public internalCreate(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: number): org.kevoree.modeling.api.KObject<any, any> {
                            throw "Abstract method";
                        }

                        public metaClasses(): org.kevoree.modeling.api.meta.MetaClass[] {
                            throw "Abstract method";
                        }

                        public diff(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.diff(origin, target, callback);
                        }

                        public merge(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.merge(origin, target, callback);
                        }

                        public intersection(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.intersection(origin, target, callback);
                        }

                        public slice(elems: java.util.List<org.kevoree.modeling.api.KObject<any, any>>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            org.kevoree.modeling.api.operation.DefaultModelSlicer.slice(elems, callback);
                        }

                        public clone<A extends org.kevoree.modeling.api.KObject<any, any>> (o: A, callback: (p : A) => void): void {
                            org.kevoree.modeling.api.operation.DefaultModelCloner.clone(o, callback);
                        }

                        public json(): org.kevoree.modeling.api.ModelFormat {
                            return new org.kevoree.modeling.api.json.JsonFormat(this);
                        }

                        public xmi(): org.kevoree.modeling.api.ModelFormat {
                            return new org.kevoree.modeling.api.xmi.XmiFormat(this);
                        }

                        public equals(obj: any): boolean {
                            if (!(obj instanceof org.kevoree.modeling.api.abs.AbstractKView)) {
                                return false;
                            } else {
                                var casted: org.kevoree.modeling.api.abs.AbstractKView = <org.kevoree.modeling.api.abs.AbstractKView>obj;
                                return (casted._now == this._now) && this._dimension.equals(casted._dimension);
                            }
                        }

                    }

                }
                export interface Callback<A> {

                    on(a: A): void;

                }

                export module data {
                    export class AccessMode {

                        public static READ: AccessMode = new AccessMode();
                        public static WRITE: AccessMode = new AccessMode();
                        public static DELETE: AccessMode = new AccessMode();
                        public equals(other: any): boolean {
                            return this == other;
                        }
                        public static _AccessModeVALUES : AccessMode[] = [
                            AccessMode.READ
                            ,AccessMode.WRITE
                            ,AccessMode.DELETE
                        ];
                        public static values():AccessMode[]{
                            return AccessMode._AccessModeVALUES;
                        }
                    }

                    export module cache {
                        export class DimensionCache {

                            public timeTreeCache: java.util.Map<number, org.kevoree.modeling.api.time.TimeTree> = new java.util.HashMap<number, org.kevoree.modeling.api.time.TimeTree>();
                            public timesCaches: java.util.Map<number, org.kevoree.modeling.api.data.cache.TimeCache> = new java.util.HashMap<number, org.kevoree.modeling.api.data.cache.TimeCache>();
                            public roots: org.kevoree.modeling.api.time.rbtree.LongRBTree = null;
                        }

                        export class TimeCache {

                            public payload_cache: java.util.Map<number, org.kevoree.modeling.api.data.CacheEntry> = new java.util.HashMap<number, org.kevoree.modeling.api.data.CacheEntry>();
                            public root: org.kevoree.modeling.api.KObject<any, any> = null;
                            public rootDirty: boolean = false;
                        }

                    }
                    export class CacheEntry {

                        public timeTree: org.kevoree.modeling.api.time.TimeTree;
                        public metaClass: org.kevoree.modeling.api.meta.MetaClass;
                        public raw: any[];
                    }

                    export class DefaultKStore implements org.kevoree.modeling.api.data.KStore {

                        public static KEY_SEP: string = ',';
                        private _db: org.kevoree.modeling.api.data.KDataBase;
                        private caches: java.util.Map<number, org.kevoree.modeling.api.data.cache.DimensionCache> = new java.util.HashMap<number, org.kevoree.modeling.api.data.cache.DimensionCache>();
                        private _eventBroker: org.kevoree.modeling.api.event.KEventBroker;
                        private _operationManager: org.kevoree.modeling.api.util.KOperationManager;
                        private _objectKeyCalculator: org.kevoree.modeling.api.data.KeyCalculator = null;
                        private _dimensionKeyCalculator: org.kevoree.modeling.api.data.KeyCalculator = null;
                        private isConnected: boolean = false;
                        private static UNIVERSE_NOT_CONNECTED_ERROR: string = "Please connect your universe prior to create a dimension or an object";
                        private static OUT_OF_CACHE_MESSAGE: string = "KMF Error: your object is out of cache, you probably kept an old reference. Please reload it with a lookup";
                        private static INDEX_RESOLVED_DIM: number = 0;
                        private static INDEX_RESOLVED_TIME: number = 1;
                        private static INDEX_RESOLVED_TIMETREE: number = 2;
                        constructor() {
                            this._db = new org.kevoree.modeling.api.data.MemoryKDataBase();
                            this._eventBroker = new org.kevoree.modeling.api.event.DefaultKBroker();
                            this._operationManager = new org.kevoree.modeling.api.util.DefaultOperationManager(this);
                        }

                        public connect(callback: (p : java.lang.Throwable) => void): void {
                            if (this._db == null) {
                                callback(new java.lang.Exception("Please attach a KDataBase first !"));
                            }
                            var keys: string[] = new Array();
                            keys[0] = this.keyLastPrefix();
                            this._db.get(keys,  (strings : string[], error : java.lang.Throwable) => {
                                if (error != null) {
                                    if (callback != null) {
                                        callback(error);
                                    }
                                } else {
                                    if (strings.length == 1) {
                                        try {
                                            var payloadPrefix: string = strings[0];
                                            if (payloadPrefix == null || payloadPrefix.equals("")) {
                                                payloadPrefix = "0";
                                            }
                                            var newPrefix: number = java.lang.Short.parseShort(payloadPrefix);
                                            var keys2: string[] = new Array();
                                            keys2[0] = this.keyLastDimIndex(payloadPrefix);
                                            keys2[1] = this.keyLastObjIndex(payloadPrefix);
                                            this._db.get(keys2,  (strings : string[], error : java.lang.Throwable) => {
                                                if (error != null) {
                                                    if (callback != null) {
                                                        callback(error);
                                                    }
                                                } else {
                                                    if (strings.length == 2) {
                                                        try {
                                                            var dimIndexPayload: string = strings[0];
                                                            if (dimIndexPayload == null || dimIndexPayload.equals("")) {
                                                                dimIndexPayload = "0";
                                                            }
                                                            var objIndexPayload: string = strings[1];
                                                            if (objIndexPayload == null || objIndexPayload.equals("")) {
                                                                objIndexPayload = "0";
                                                            }
                                                            var newDimIndex: number = java.lang.Long.parseLong(dimIndexPayload);
                                                            var newObjIndex: number = java.lang.Long.parseLong(objIndexPayload);
                                                            var keys3: string[][] = new Array(new Array());
                                                            var payloadKeys3: string[] = new Array();
                                                            payloadKeys3[0] = this.keyLastPrefix();
                                                            if (newPrefix == java.lang.Short.MAX_VALUE) {
                                                                payloadKeys3[1] = "" + java.lang.Short.MIN_VALUE;
                                                            } else {
                                                                payloadKeys3[1] = "" + (newPrefix + 1);
                                                            }
                                                            keys3[0] = payloadKeys3;
                                                            this._db.put(keys3,  (throwable : java.lang.Throwable) => {
                                                                this._dimensionKeyCalculator = new org.kevoree.modeling.api.data.KeyCalculator(newPrefix, newDimIndex);
                                                                this._objectKeyCalculator = new org.kevoree.modeling.api.data.KeyCalculator(newPrefix, newObjIndex);
                                                                this.isConnected = true;
                                                                if (callback != null) {
                                                                    callback(null);
                                                                }
                                                            });
                                                        } catch ($ex$) {
                                                            if ($ex$ instanceof java.lang.Exception) {
                                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                if (callback != null) {
                                                                    callback(e);
                                                                }
                                                            }
                                                         }
                                                    } else {
                                                        if (callback != null) {
                                                            callback(new java.lang.Exception("Error while connecting the KDataStore..."));
                                                        }
                                                    }
                                                }
                                            });
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                if (callback != null) {
                                                    callback(e);
                                                }
                                            }
                                         }
                                    } else {
                                        if (callback != null) {
                                            callback(new java.lang.Exception("Error while connecting the KDataStore..."));
                                        }
                                    }
                                }
                            });
                        }

                        public close(callback: (p : java.lang.Throwable) => void): void {
                            this.isConnected = false;
                        }

                        private keyTree(dim: number, key: number): string {
                            return "" + dim + DefaultKStore.KEY_SEP + key;
                        }

                        private keyRoot(dim: number): string {
                            return "" + dim + DefaultKStore.KEY_SEP + "root";
                        }

                        private keyRootTree(dim: org.kevoree.modeling.api.KDimension<any, any, any>): string {
                            return "" + dim.key() + DefaultKStore.KEY_SEP + "root";
                        }

                        private keyPayload(dim: number, time: number, key: number): string {
                            return "" + dim + DefaultKStore.KEY_SEP + time + DefaultKStore.KEY_SEP + key;
                        }

                        private keyLastPrefix(): string {
                            return "ring_prefix";
                        }

                        private keyLastDimIndex(prefix: string): string {
                            return "index_dim_" + prefix;
                        }

                        private keyLastObjIndex(prefix: string): string {
                            return "index_obj_" + prefix;
                        }

                        public nextDimensionKey(): number {
                            if (this._dimensionKeyCalculator == null) {
                                throw new java.lang.RuntimeException(DefaultKStore.UNIVERSE_NOT_CONNECTED_ERROR);
                            }
                            return this._dimensionKeyCalculator.nextKey();
                        }

                        public nextObjectKey(): number {
                            if (this._objectKeyCalculator == null) {
                                throw new java.lang.RuntimeException(DefaultKStore.UNIVERSE_NOT_CONNECTED_ERROR);
                            }
                            return this._objectKeyCalculator.nextKey();
                        }

                        public initDimension(dimension: org.kevoree.modeling.api.KDimension<any, any, any>): void {
                        }

                        public initKObject(obj: org.kevoree.modeling.api.KObject<any, any>, originView: org.kevoree.modeling.api.KView): void {
                            this.write_tree(obj.dimension().key(), obj.uuid(), obj.timeTree());
                            var cacheEntry: org.kevoree.modeling.api.data.CacheEntry = new org.kevoree.modeling.api.data.CacheEntry();
                            cacheEntry.raw = new Array();
                            cacheEntry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
                            cacheEntry.metaClass = obj.metaClass();
                            cacheEntry.timeTree = obj.timeTree();
                            this.write_cache(obj.dimension().key(), obj.now(), obj.uuid(), cacheEntry);
                        }

                        public raw(origin: org.kevoree.modeling.api.KObject<any, any>, accessMode: org.kevoree.modeling.api.data.AccessMode): any[] {
                            var resolvedTime: number = origin.timeTree().resolve(origin.now());
                            var needCopy: boolean = accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE) && resolvedTime != origin.now();
                            var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(origin.dimension().key());
                            if (dimensionCache == null) {
                                throw new java.lang.RuntimeException(DefaultKStore.OUT_OF_CACHE_MESSAGE);
                            }
                            var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(resolvedTime);
                            if (timeCache == null) {
                                throw new java.lang.RuntimeException(DefaultKStore.OUT_OF_CACHE_MESSAGE);
                            }
                            var entry: org.kevoree.modeling.api.data.CacheEntry = timeCache.payload_cache.get(origin.uuid());
                            if (entry == null) {
                                throw new java.lang.RuntimeException(DefaultKStore.OUT_OF_CACHE_MESSAGE);
                            }
                            var payload: any[] = entry.raw;
                            if (accessMode.equals(org.kevoree.modeling.api.data.AccessMode.DELETE)) {
                                entry.timeTree.delete(origin.now());
                                entry.raw = null;
                                return payload;
                            }
                            if (!needCopy) {
                                if (accessMode.equals(org.kevoree.modeling.api.data.AccessMode.WRITE)) {
                                    payload[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
                                }
                                return payload;
                            } else {
                                var cloned: any[] = new Array();
                                cloned[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
                                for (var i: number = 0; i < payload.length; i++) {
                                    var resolved: any = payload[i];
                                    if (resolved != null) {
                                        if (resolved instanceof java.util.Set) {
                                            var clonedSet: java.util.HashSet<number> = new java.util.HashSet<number>();
                                            clonedSet.addAll(<java.util.Set<number>>resolved);
                                            cloned[i] = clonedSet;
                                        } else {
                                            if (resolved instanceof java.util.List) {
                                                var clonedList: java.util.ArrayList<number> = new java.util.ArrayList<number>();
                                                clonedList.addAll(<java.util.List<number>>resolved);
                                                cloned[i] = clonedList;
                                            } else {
                                                cloned[i] = resolved;
                                            }
                                        }
                                    }
                                }
                                var clonedEntry: org.kevoree.modeling.api.data.CacheEntry = new org.kevoree.modeling.api.data.CacheEntry();
                                clonedEntry.raw = cloned;
                                clonedEntry.metaClass = entry.metaClass;
                                clonedEntry.timeTree = entry.timeTree;
                                entry.timeTree.insert(origin.now());
                                this.write_cache(origin.dimension().key(), origin.now(), origin.uuid(), clonedEntry);
                                return clonedEntry.raw;
                            }
                        }

                        public discard(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
                            this.caches.remove(dimension.key());
                            if (callback != null) {
                                callback(null);
                            }
                        }

                        public delete(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
                            throw new java.lang.RuntimeException("Not implemented yet !");
                        }

                        public save(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
                            var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimension.key());
                            if (dimensionCache == null) {
                                callback(null);
                            } else {
                                var times: number[] = dimensionCache.timesCaches.keySet().toArray(new Array());
                                var sizeCache: number = this.size_dirties(dimensionCache) + 2;
                                var payloads: string[][] = new Array(new Array());
                                var i: number = 0;
                                for (var j: number = 0; j < times.length; j++) {
                                    var now: number = times[j];
                                    var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(now);
                                    var keys: number[] = timeCache.payload_cache.keySet().toArray(new Array());
                                    for (var k: number = 0; k < keys.length; k++) {
                                        var idObj: number = keys[k];
                                        var cached_entry: org.kevoree.modeling.api.data.CacheEntry = timeCache.payload_cache.get(idObj);
                                        var cached_raw: any[] = cached_entry.raw;
                                        if (cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] != null && cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX].toString().equals("true")) {
                                            var payloadA: string[] = new Array();
                                            payloadA[0] = this.keyPayload(dimension.key(), now, idObj);
                                            payloadA[1] = org.kevoree.modeling.api.data.JsonRaw.encode(cached_raw, idObj, cached_entry.metaClass);
                                            payloads[i] = payloadA;
                                            cached_raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = false;
                                            i++;
                                        }
                                    }
                                }
                                var keyArr: number[] = dimensionCache.timeTreeCache.keySet().toArray(new Array());
                                for (var l: number = 0; l < keyArr.length; l++) {
                                    var timeTreeKey: number = keyArr[l];
                                    var timeTree: org.kevoree.modeling.api.time.TimeTree = dimensionCache.timeTreeCache.get(timeTreeKey);
                                    if (timeTree.isDirty()) {
                                        var payloadC: string[] = new Array();
                                        payloadC[0] = this.keyTree(dimension.key(), timeTreeKey);
                                        payloadC[1] = timeTree.toString();
                                        payloads[i] = payloadC;
                                        (<org.kevoree.modeling.api.time.DefaultTimeTree>timeTree).setDirty(false);
                                        i++;
                                    }
                                }
                                if (dimensionCache.roots.dirty) {
                                    var payloadD: string[] = new Array();
                                    payloadD[0] = this.keyRootTree(dimension);
                                    payloadD[1] = dimensionCache.roots.serialize();
                                    payloads[i] = payloadD;
                                    dimensionCache.roots.dirty = false;
                                    i++;
                                }
                                var payloadDim: string[] = new Array();
                                payloadDim[0] = this.keyLastDimIndex("" + this._dimensionKeyCalculator.prefix());
                                payloadDim[1] = "" + this._dimensionKeyCalculator.lastComputedIndex();
                                payloads[i] = payloadDim;
                                i++;
                                var payloadObj: string[] = new Array();
                                payloadObj[0] = this.keyLastDimIndex("" + this._objectKeyCalculator.prefix());
                                payloadObj[1] = "" + this._objectKeyCalculator.lastComputedIndex();
                                payloads[i] = payloadObj;
                                this._db.put(payloads, callback);
                                this._eventBroker.flush(dimension.key());
                            }
                        }

                        public saveUnload(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (p : java.lang.Throwable) => void): void {
                            this.save(dimension,  (throwable : java.lang.Throwable) => {
                                if (throwable == null) {
                                    this.discard(dimension, callback);
                                } else {
                                    callback(throwable);
                                }
                            });
                        }

                        public lookup(originView: org.kevoree.modeling.api.KView, key: number, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void {
                            var keys: number[] = new Array();
                            keys[0] = key;
                            this.lookupAll(originView, keys,  (kObjects : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                if (kObjects.length == 1) {
                                    if (callback != null) {
                                        callback(kObjects[0]);
                                    }
                                } else {
                                    if (callback != null) {
                                        callback(null);
                                    }
                                }
                            });
                        }

                        public lookupAll(originView: org.kevoree.modeling.api.KView, keys: number[], callback: (p : org.kevoree.modeling.api.KObject<any, any>[]) => void): void {
                            this.internal_resolve_dim_time(originView, keys,  (objects : any[][]) => {
                                var resolved: org.kevoree.modeling.api.KObject<any, any>[] = new Array();
                                var toLoadIndexes: java.util.List<number> = new java.util.ArrayList<number>();
                                for (var i: number = 0; i < objects.length; i++) {
                                    if (objects[i][DefaultKStore.INDEX_RESOLVED_TIME] != null) {
                                        var entry: org.kevoree.modeling.api.data.CacheEntry = this.read_cache(<number>objects[i][DefaultKStore.INDEX_RESOLVED_DIM], <number>objects[i][DefaultKStore.INDEX_RESOLVED_TIME], keys[i]);
                                        if (entry == null) {
                                            toLoadIndexes.add(i);
                                        } else {
                                            resolved[i] = originView.createProxy(entry.metaClass, entry.timeTree, keys[i]);
                                        }
                                    }
                                }
                                if (toLoadIndexes.isEmpty()) {
                                    callback(resolved);
                                } else {
                                    var toLoadKeys: string[] = new Array();
                                    for (var i: number = 0; i < toLoadIndexes.size(); i++) {
                                        var toLoadIndex: number = toLoadIndexes.get(i);
                                        toLoadKeys[i] = this.keyPayload(<number>objects[toLoadIndex][DefaultKStore.INDEX_RESOLVED_DIM], <number>objects[toLoadIndex][DefaultKStore.INDEX_RESOLVED_TIME], keys[i]);
                                    }
                                    this._db.get(toLoadKeys,  (strings : string[], error : java.lang.Throwable) => {
                                        if (error != null) {
                                            error.printStackTrace();
                                            callback(null);
                                        } else {
                                            for (var i: number = 0; i < strings.length; i++) {
                                                if (strings[i] != null) {
                                                    var index: number = toLoadIndexes.get(i);
                                                    var entry: org.kevoree.modeling.api.data.CacheEntry = org.kevoree.modeling.api.data.JsonRaw.decode(strings[i], originView, <number>objects[index][DefaultKStore.INDEX_RESOLVED_TIME]);
                                                    if (entry != null) {
                                                        entry.timeTree = <org.kevoree.modeling.api.time.TimeTree>objects[index][DefaultKStore.INDEX_RESOLVED_TIMETREE];
                                                        resolved[i] = originView.createProxy(entry.metaClass, entry.timeTree, keys[index]);
                                                        this.write_cache(<number>objects[i][DefaultKStore.INDEX_RESOLVED_DIM], <number>objects[i][DefaultKStore.INDEX_RESOLVED_TIME], keys[index], entry);
                                                    }
                                                }
                                            }
                                            callback(resolved);
                                        }
                                    });
                                }
                            });
                        }

                        public getRoot(originView: org.kevoree.modeling.api.KView, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void {
                            this.resolve_roots(originView.dimension(),  (longRBTree : org.kevoree.modeling.api.time.rbtree.LongRBTree) => {
                                if (longRBTree == null) {
                                    callback(null);
                                } else {
                                    var resolved: org.kevoree.modeling.api.time.rbtree.LongTreeNode = longRBTree.previousOrEqual(originView.now());
                                    if (resolved == null) {
                                        callback(null);
                                    } else {
                                        this.lookup(originView, resolved.value, callback);
                                    }
                                }
                            });
                        }

                        public setRoot(newRoot: org.kevoree.modeling.api.KObject<any, any>, callback: (p : java.lang.Throwable) => void): void {
                            this.resolve_roots(newRoot.dimension(),  (longRBTree : org.kevoree.modeling.api.time.rbtree.LongRBTree) => {
                                longRBTree.insert(newRoot.now(), newRoot.uuid());
                                (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>newRoot).setRoot(true);
                                if (callback != null) {
                                    callback(null);
                                }
                            });
                        }

                        public eventBroker(): org.kevoree.modeling.api.event.KEventBroker {
                            return this._eventBroker;
                        }

                        public setEventBroker(p_eventBroker: org.kevoree.modeling.api.event.KEventBroker): void {
                            this._eventBroker = p_eventBroker;
                        }

                        public dataBase(): org.kevoree.modeling.api.data.KDataBase {
                            return this._db;
                        }

                        public setDataBase(p_dataBase: org.kevoree.modeling.api.data.KDataBase): void {
                            this._db = p_dataBase;
                        }

                        public operationManager(): org.kevoree.modeling.api.util.KOperationManager {
                            return this._operationManager;
                        }

                        private read_cache(dimensionKey: number, timeKey: number, uuid: number): org.kevoree.modeling.api.data.CacheEntry {
                            var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimensionKey);
                            if (dimensionCache != null) {
                                var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(timeKey);
                                if (timeCache == null) {
                                    return null;
                                } else {
                                    return timeCache.payload_cache.get(uuid);
                                }
                            } else {
                                return null;
                            }
                        }

                        private write_cache(dimensionKey: number, timeKey: number, uuid: number, cacheEntry: org.kevoree.modeling.api.data.CacheEntry): void {
                            var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimensionKey);
                            if (dimensionCache == null) {
                                dimensionCache = new org.kevoree.modeling.api.data.cache.DimensionCache();
                                this.caches.put(dimensionKey, dimensionCache);
                            }
                            var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(timeKey);
                            if (timeCache == null) {
                                timeCache = new org.kevoree.modeling.api.data.cache.TimeCache();
                                dimensionCache.timesCaches.put(timeKey, timeCache);
                            }
                            timeCache.payload_cache.put(uuid, cacheEntry);
                        }

                        private write_tree(dimensionKey: number, uuid: number, timeTree: org.kevoree.modeling.api.time.TimeTree): void {
                            var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimensionKey);
                            if (dimensionCache == null) {
                                dimensionCache = new org.kevoree.modeling.api.data.cache.DimensionCache();
                                this.caches.put(dimensionKey, dimensionCache);
                            }
                            dimensionCache.timeTreeCache.put(uuid, timeTree);
                        }

                        private write_roots(dimensionKey: number, timeTree: org.kevoree.modeling.api.time.rbtree.LongRBTree): void {
                            var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimensionKey);
                            if (dimensionCache == null) {
                                dimensionCache = new org.kevoree.modeling.api.data.cache.DimensionCache();
                                this.caches.put(dimensionKey, dimensionCache);
                            }
                            dimensionCache.roots = timeTree;
                        }

                        private size_dirties(dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache): number {
                            var times: number[] = dimensionCache.timesCaches.keySet().toArray(new Array());
                            var sizeCache: number = 0;
                            for (var i: number = 0; i < times.length; i++) {
                                var timeCache: org.kevoree.modeling.api.data.cache.TimeCache = dimensionCache.timesCaches.get(times[i]);
                                if (timeCache != null) {
                                    var keys: number[] = timeCache.payload_cache.keySet().toArray(new Array());
                                    for (var k: number = 0; k < keys.length; k++) {
                                        var idObj: number = keys[k];
                                        var cachedEntry: org.kevoree.modeling.api.data.CacheEntry = timeCache.payload_cache.get(idObj);
                                        if (cachedEntry != null && cachedEntry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] != null && cachedEntry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX].toString().equals("true")) {
                                            sizeCache++;
                                        }
                                    }
                                    if (timeCache.rootDirty) {
                                        sizeCache++;
                                    }
                                }
                            }
                            var ids: number[] = dimensionCache.timeTreeCache.keySet().toArray(new Array());
                            for (var k: number = 0; k < ids.length; k++) {
                                var timeTree: org.kevoree.modeling.api.time.TimeTree = dimensionCache.timeTreeCache.get(ids[k]);
                                if (timeTree != null && timeTree.isDirty()) {
                                    sizeCache++;
                                }
                            }
                            if (dimensionCache.roots.dirty) {
                                sizeCache++;
                            }
                            return sizeCache;
                        }

                        private internal_resolve_dim_time(originView: org.kevoree.modeling.api.KView, uuids: number[], callback: (p : any[][]) => void): void {
                            var result: any[][] = new Array(new Array());
                            this.resolve_timeTrees(originView.dimension(), uuids,  (timeTrees : org.kevoree.modeling.api.time.TimeTree[]) => {
                                for (var i: number = 0; i < timeTrees.length; i++) {
                                    var resolved: any[] = new Array();
                                    resolved[DefaultKStore.INDEX_RESOLVED_DIM] = originView.dimension().key();
                                    resolved[DefaultKStore.INDEX_RESOLVED_TIME] = timeTrees[i].resolve(originView.now());
                                    resolved[DefaultKStore.INDEX_RESOLVED_TIMETREE] = timeTrees[i];
                                    result[i] = resolved;
                                }
                                callback(result);
                            });
                        }

                        private resolve_timeTrees(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, keys: number[], callback: (p : org.kevoree.modeling.api.time.TimeTree[]) => void): void {
                            var toLoad: java.util.List<number> = new java.util.ArrayList<number>();
                            var result: org.kevoree.modeling.api.time.TimeTree[] = new Array();
                            for (var i: number = 0; i < keys.length; i++) {
                                var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimension.key());
                                if (dimensionCache == null) {
                                    toLoad.add(i);
                                } else {
                                    var cachedTree: org.kevoree.modeling.api.time.TimeTree = dimensionCache.timeTreeCache.get(keys[i]);
                                    if (cachedTree != null) {
                                        result[i] = cachedTree;
                                    } else {
                                        toLoad.add(i);
                                    }
                                }
                            }
                            if (toLoad.isEmpty()) {
                                callback(result);
                            } else {
                                var toLoadKeys: string[] = new Array();
                                for (var i: number = 0; i < toLoad.size(); i++) {
                                    toLoadKeys[i] = this.keyTree(dimension.key(), keys[toLoad.get(i)]);
                                }
                                this._db.get(toLoadKeys,  (res : string[], error : java.lang.Throwable) => {
                                    if (error != null) {
                                        error.printStackTrace();
                                    }
                                    for (var i: number = 0; i < res.length; i++) {
                                        var newTree: org.kevoree.modeling.api.time.DefaultTimeTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
                                        try {
                                            if (res[i] != null) {
                                                newTree.load(res[i]);
                                            } else {
                                                newTree.insert(dimension.key());
                                            }
                                            this.write_tree(dimension.key(), keys[toLoad.get(i)], newTree);
                                            result[toLoad.get(i)] = newTree;
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                            }
                                         }
                                    }
                                    callback(result);
                                });
                            }
                        }

                        private resolve_roots(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (p : org.kevoree.modeling.api.time.rbtree.LongRBTree) => void): void {
                            var dimensionCache: org.kevoree.modeling.api.data.cache.DimensionCache = this.caches.get(dimension.key());
                            if (dimensionCache != null && dimensionCache.roots != null) {
                                callback(dimensionCache.roots);
                            } else {
                                var keys: string[] = new Array();
                                keys[0] = this.keyRoot(dimension.key());
                                this._db.get(keys,  (res : string[], error : java.lang.Throwable) => {
                                    var tree: org.kevoree.modeling.api.time.rbtree.LongRBTree = new org.kevoree.modeling.api.time.rbtree.LongRBTree();
                                    if (error != null) {
                                        error.printStackTrace();
                                    } else {
                                        if (res != null && res.length == 1 && res[0] != null && !res[0].equals("")) {
                                            try {
                                                tree.unserialize(res[0]);
                                            } catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                    e.printStackTrace();
                                                }
                                             }
                                        }
                                    }
                                    this.write_roots(dimension.key(), tree);
                                    callback(tree);
                                });
                            }
                        }

                    }

                    export class IDRange {

                        private min: number = 0;
                        private current: number = 0;
                        private max: number = 0;
                        private threshold: number;
                        constructor(min: number, max: number, threshold: number) {
                            this.min = min;
                            this.current = min;
                            this.max = max;
                            this.threshold = threshold;
                        }

                        public newUuid(): number {
                            var res: number = this.current;
                            this.current++;
                            return res;
                        }

                        public isThresholdReached(): boolean {
                            return (this.max - this.min) <= this.threshold;
                        }

                        public isEmpty(): boolean {
                            return this.current > this.max;
                        }

                    }

                    export class Index {

                        public static PARENT_INDEX: number = 0;
                        public static INBOUNDS_INDEX: number = 1;
                        public static IS_DIRTY_INDEX: number = 2;
                        public static IS_ROOT_INDEX: number = 3;
                        public static REF_IN_PARENT_INDEX: number = 4;
                        public static RESERVED_INDEXES: number = 5;
                    }

                    export class JsonRaw {

                        public static SEP: string = "@";
                        public static decode(payload: string, currentView: org.kevoree.modeling.api.KView, now: number): org.kevoree.modeling.api.data.CacheEntry {
                            if (payload == null) {
                                return null;
                            }
                            var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(payload);
                            var currentAttributeName: string = null;
                            var arrayPayload: java.util.Set<string> = null;
                            var content: java.util.Map<string, any> = new java.util.HashMap<string, any>();
                            var currentToken: org.kevoree.modeling.api.json.JsonToken = lexer.nextToken();
                            while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF){
                                if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACKET)) {
                                    arrayPayload = new java.util.HashSet<string>();
                                } else {
                                    if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACKET)) {
                                        content.put(currentAttributeName, arrayPayload);
                                        arrayPayload = null;
                                        currentAttributeName = null;
                                    } else {
                                        if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACE)) {
                                        } else {
                                            if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACE)) {
                                            } else {
                                                if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.VALUE)) {
                                                    if (currentAttributeName == null) {
                                                        currentAttributeName = currentToken.value().toString();
                                                    } else {
                                                        if (arrayPayload == null) {
                                                            content.put(currentAttributeName, currentToken.value().toString());
                                                            currentAttributeName = null;
                                                        } else {
                                                            arrayPayload.add(currentToken.value().toString());
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                currentToken = lexer.nextToken();
                            }
                            if (content.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META) == null) {
                                return null;
                            } else {
                                var entry: org.kevoree.modeling.api.data.CacheEntry = new org.kevoree.modeling.api.data.CacheEntry();
                                entry.metaClass = currentView.metaClass(content.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META).toString());
                                entry.raw = new Array();
                                entry.raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = false;
                                var metaKeys: string[] = content.keySet().toArray(new Array());
                                for (var i: number = 0; i < metaKeys.length; i++) {
                                    if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META)) {
                                        var inbounds: java.util.HashMap<number, org.kevoree.modeling.api.meta.MetaReference> = new java.util.HashMap<number, org.kevoree.modeling.api.meta.MetaReference>();
                                        entry.raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = inbounds;
                                        var raw_payload: any = content.get(metaKeys[i]);
                                        try {
                                            var raw_keys: java.util.HashSet<string> = <java.util.HashSet<string>>raw_payload;
                                            var raw_keys_p: string[] = raw_keys.toArray(new Array());
                                            for (var j: number = 0; j < raw_keys_p.length; j++) {
                                                var raw_elem: string = raw_keys_p[j];
                                                var tuple: string[] = raw_elem.split(JsonRaw.SEP);
                                                if (tuple.length == 3) {
                                                    var raw_k: number = java.lang.Long.parseLong(tuple[0]);
                                                    var foundMeta: org.kevoree.modeling.api.meta.MetaClass = currentView.metaClass(tuple[1].trim());
                                                    if (foundMeta != null) {
                                                        var metaReference: org.kevoree.modeling.api.meta.MetaReference = foundMeta.metaReference(tuple[2].trim());
                                                        if (metaReference != null) {
                                                            inbounds.put(raw_k, metaReference);
                                                        }
                                                    }
                                                }
                                            }
                                        } catch ($ex$) {
                                            if ($ex$ instanceof java.lang.Exception) {
                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                e.printStackTrace();
                                            }
                                         }
                                    } else {
                                        if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_META)) {
                                            try {
                                                entry.raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] = java.lang.Long.parseLong(content.get(metaKeys[i]).toString());
                                            } catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                    e.printStackTrace();
                                                }
                                             }
                                        } else {
                                            if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_REF_META)) {
                                                try {
                                                    var raw_payload_ref: string = content.get(metaKeys[i]).toString();
                                                    var elemsRefs: string[] = raw_payload_ref.split(JsonRaw.SEP);
                                                    if (elemsRefs.length == 2) {
                                                        var foundMeta: org.kevoree.modeling.api.meta.MetaClass = currentView.metaClass(elemsRefs[0].trim());
                                                        if (foundMeta != null) {
                                                            var metaReference: org.kevoree.modeling.api.meta.MetaReference = foundMeta.metaReference(elemsRefs[1].trim());
                                                            if (metaReference != null) {
                                                                entry.raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] = metaReference;
                                                            }
                                                        }
                                                    }
                                                } catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Exception) {
                                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                        e.printStackTrace();
                                                    }
                                                 }
                                            } else {
                                                if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT)) {
                                                    try {
                                                        if ("true".equals(content.get(metaKeys[i]))) {
                                                            entry.raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = true;
                                                        } else {
                                                            entry.raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = false;
                                                        }
                                                    } catch ($ex$) {
                                                        if ($ex$ instanceof java.lang.Exception) {
                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                            e.printStackTrace();
                                                        }
                                                     }
                                                } else {
                                                    if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META)) {
                                                    } else {
                                                        var metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute = entry.metaClass.metaAttribute(metaKeys[i]);
                                                        var metaReference: org.kevoree.modeling.api.meta.MetaReference = entry.metaClass.metaReference(metaKeys[i]);
                                                        var insideContent: any = content.get(metaKeys[i]);
                                                        if (insideContent != null) {
                                                            if (metaAttribute != null) {
                                                                entry.raw[metaAttribute.index()] = metaAttribute.strategy().load(insideContent.toString(), metaAttribute, now);
                                                            } else {
                                                                if (metaReference != null) {
                                                                    if (metaReference.single()) {
                                                                        try {
                                                                            entry.raw[metaReference.index()] = java.lang.Long.parseLong(insideContent.toString());
                                                                        } catch ($ex$) {
                                                                            if ($ex$ instanceof java.lang.Exception) {
                                                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                                e.printStackTrace();
                                                                            }
                                                                         }
                                                                    } else {
                                                                        try {
                                                                            var convertedRaw: java.util.Set<number> = new java.util.HashSet<number>();
                                                                            var plainRawSet: java.util.Set<string> = <java.util.Set<string>>insideContent;
                                                                            var plainRawList: string[] = plainRawSet.toArray(new Array());
                                                                            for (var l: number = 0; l < plainRawList.length; l++) {
                                                                                var plainRaw: string = plainRawList[l];
                                                                                try {
                                                                                    var converted: number = java.lang.Long.parseLong(plainRaw);
                                                                                    convertedRaw.add(converted);
                                                                                } catch ($ex$) {
                                                                                    if ($ex$ instanceof java.lang.Exception) {
                                                                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                                        e.printStackTrace();
                                                                                    }
                                                                                 }
                                                                            }
                                                                            entry.raw[metaReference.index()] = convertedRaw;
                                                                        } catch ($ex$) {
                                                                            if ($ex$ instanceof java.lang.Exception) {
                                                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                                e.printStackTrace();
                                                                            }
                                                                         }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                return entry;
                            }
                        }

                        public static encode(raw: any[], uuid: number, p_metaClass: org.kevoree.modeling.api.meta.MetaClass): string {
                            var metaReferences: org.kevoree.modeling.api.meta.MetaReference[] = p_metaClass.metaReferences();
                            var metaAttributes: org.kevoree.modeling.api.meta.MetaAttribute[] = p_metaClass.metaAttributes();
                            var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                            builder.append("{\n");
                            builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META + "\" : \"");
                            builder.append(p_metaClass.metaName());
                            builder.append("\",\n");
                            builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID + "\" : \"");
                            builder.append(uuid);
                            if (raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] != null && raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX].toString().equals("true")) {
                                builder.append("\",\n");
                                builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT + "\" : \"");
                                builder.append("true");
                            }
                            if (raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] != null) {
                                builder.append("\",\n");
                                builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_META + "\" : \"");
                                builder.append(raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX].toString());
                            }
                            if (raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] != null) {
                                builder.append("\",\n");
                                builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_REF_META + "\" : \"");
                                try {
                                    builder.append((<org.kevoree.modeling.api.meta.MetaReference>raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX]).origin().metaName());
                                    builder.append(JsonRaw.SEP);
                                    builder.append((<org.kevoree.modeling.api.meta.MetaReference>raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX]).metaName());
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        e.printStackTrace();
                                    }
                                 }
                            }
                            if (raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] != null) {
                                builder.append("\",\n");
                                builder.append("\t\"" + org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META + "\" : [");
                                try {
                                    var elemsInRaw: java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference> = <java.util.Map<number, org.kevoree.modeling.api.meta.MetaReference>>raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX];
                                    var elemsArr: number[] = elemsInRaw.keySet().toArray(new Array());
                                    var isFirst: boolean = true;
                                    for (var j: number = 0; j < elemsArr.length; j++) {
                                        if (!isFirst) {
                                            builder.append(",");
                                        }
                                        builder.append("\"");
                                        builder.append(elemsArr[j]);
                                        builder.append(JsonRaw.SEP);
                                        var ref: org.kevoree.modeling.api.meta.MetaReference = elemsInRaw.get(elemsArr[j]);
                                        builder.append(ref.origin().metaName());
                                        builder.append(JsonRaw.SEP);
                                        builder.append(ref.metaName());
                                        builder.append("\"");
                                        isFirst = false;
                                    }
                                } catch ($ex$) {
                                    if ($ex$ instanceof java.lang.Exception) {
                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                        e.printStackTrace();
                                    }
                                 }
                                builder.append("]");
                                builder.append(",\n");
                            } else {
                                builder.append("\",\n");
                            }
                            for (var i: number = 0; i < metaAttributes.length; i++) {
                                var payload_res: any = raw[metaAttributes[i].index()];
                                if (payload_res != null) {
                                    var attrsPayload: string = metaAttributes[i].strategy().save(payload_res);
                                    if (attrsPayload != null) {
                                        builder.append("\t");
                                        builder.append("\"");
                                        builder.append(metaAttributes[i].metaName());
                                        builder.append("\":\"");
                                        builder.append(attrsPayload);
                                        builder.append("\",\n");
                                    }
                                }
                            }
                            for (var i: number = 0; i < metaReferences.length; i++) {
                                var refPayload: any = raw[metaReferences[i].index()];
                                if (refPayload != null) {
                                    builder.append("\t");
                                    builder.append("\"");
                                    builder.append(metaReferences[i].metaName());
                                    builder.append("\":");
                                    if (metaReferences[i].single()) {
                                        builder.append("\"");
                                        builder.append(refPayload);
                                        builder.append("\"");
                                    } else {
                                        var elems: java.util.Set<number> = <java.util.Set<number>>refPayload;
                                        var elemsArr: number[] = elems.toArray(new Array());
                                        var isFirst: boolean = true;
                                        builder.append(" [");
                                        for (var j: number = 0; j < elemsArr.length; j++) {
                                            if (!isFirst) {
                                                builder.append(",");
                                            }
                                            builder.append("\"");
                                            builder.append(elemsArr[j]);
                                            builder.append("\"");
                                            isFirst = false;
                                        }
                                        builder.append("]");
                                    }
                                    builder.append(",\n");
                                }
                            }
                            builder.append("}\n");
                            return builder.toString();
                        }

                    }

                    export interface KDataBase {

                        get(keys: string[], callback: (p : string[], p1 : java.lang.Throwable) => void): void;

                        put(payloads: string[][], error: (p : java.lang.Throwable) => void): void;

                        remove(keys: string[], error: (p : java.lang.Throwable) => void): void;

                        commit(error: (p : java.lang.Throwable) => void): void;

                        close(error: (p : java.lang.Throwable) => void): void;

                    }

                    export class KeyCalculator {

                        public static LONG_LIMIT_JS: number = 0x001FFFFFFFFFFFFF;
                        public static INDEX_LIMIT: number = 0x0000001FFFFFFFFF;
                        private _prefix: number;
                        private _currentIndex: number;
                        constructor(prefix: number, currentIndex: number) {
                            this._prefix = (<number>prefix) << 53 - 16;
                            this._currentIndex = currentIndex;
                        }

                        public nextKey(): number {
                            if (this._currentIndex == KeyCalculator.INDEX_LIMIT) {
                                throw new java.lang.IndexOutOfBoundsException("Object Index could not be created because it exceeded the capacity of the current prefix. Ask for a new prefix.");
                            }
                            this._currentIndex++;
                            var objectKey: number = this._prefix + this._currentIndex;
                            if (objectKey > KeyCalculator.LONG_LIMIT_JS) {
                                throw new java.lang.IndexOutOfBoundsException("Object Index exceeds teh maximum JavaScript number capacity. (2^53)");
                            }
                            return objectKey;
                        }

                        public lastComputedIndex(): number {
                            return this._currentIndex;
                        }

                        public prefix(): number {
                            return <number>(this._prefix >> 53 - 16);
                        }

                    }

                    export interface KStore {

                        lookup(originView: org.kevoree.modeling.api.KView, key: number, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void;

                        lookupAll(originView: org.kevoree.modeling.api.KView, key: number[], callback: (p : org.kevoree.modeling.api.KObject<any, any>[]) => void): void;

                        raw(origin: org.kevoree.modeling.api.KObject<any, any>, accessMode: org.kevoree.modeling.api.data.AccessMode): any[];

                        save(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (p : java.lang.Throwable) => void): void;

                        saveUnload(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (p : java.lang.Throwable) => void): void;

                        discard(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (p : java.lang.Throwable) => void): void;

                        delete(dimension: org.kevoree.modeling.api.KDimension<any, any, any>, callback: (p : java.lang.Throwable) => void): void;

                        initKObject(obj: org.kevoree.modeling.api.KObject<any, any>, originView: org.kevoree.modeling.api.KView): void;

                        initDimension(dimension: org.kevoree.modeling.api.KDimension<any, any, any>): void;

                        nextDimensionKey(): number;

                        nextObjectKey(): number;

                        getRoot(originView: org.kevoree.modeling.api.KView, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void;

                        setRoot(newRoot: org.kevoree.modeling.api.KObject<any, any>, callback: (p : java.lang.Throwable) => void): void;

                        eventBroker(): org.kevoree.modeling.api.event.KEventBroker;

                        setEventBroker(broker: org.kevoree.modeling.api.event.KEventBroker): void;

                        dataBase(): org.kevoree.modeling.api.data.KDataBase;

                        setDataBase(dataBase: org.kevoree.modeling.api.data.KDataBase): void;

                        operationManager(): org.kevoree.modeling.api.util.KOperationManager;

                        connect(callback: (p : java.lang.Throwable) => void): void;

                        close(callback: (p : java.lang.Throwable) => void): void;

                    }

                    export class MemoryKDataBase implements org.kevoree.modeling.api.data.KDataBase {

                        private backend: java.util.HashMap<string, string> = new java.util.HashMap<string, string>();
                        public static DEBUG: boolean = false;
                        public put(payloads: string[][], callback: (p : java.lang.Throwable) => void): void {
                            for (var i: number = 0; i < payloads.length; i++) {
                                this.backend.put(payloads[i][0], payloads[i][1]);
                                if (MemoryKDataBase.DEBUG) {
                                    System.out.println("PUT " + payloads[i][0] + "->" + payloads[i][1]);
                                }
                            }
                            callback(null);
                        }

                        public get(keys: string[], callback: (p : string[], p1 : java.lang.Throwable) => void): void {
                            var values: string[] = new Array();
                            for (var i: number = 0; i < keys.length; i++) {
                                values[i] = this.backend.get(keys[i]);
                                if (MemoryKDataBase.DEBUG) {
                                    System.out.println("GET " + keys[i] + "->" + values[i]);
                                }
                            }
                            callback(values, null);
                        }

                        public remove(keys: string[], callback: (p : java.lang.Throwable) => void): void {
                            for (var i: number = 0; i < keys.length; i++) {
                                this.backend.remove(keys[i]);
                            }
                            callback(null);
                        }

                        public commit(callback: (p : java.lang.Throwable) => void): void {
                            callback(null);
                        }

                        public close(callback: (p : java.lang.Throwable) => void): void {
                            this.backend.clear();
                        }

                    }

                }
                export module event {
                    export class DefaultKBroker implements org.kevoree.modeling.api.event.KEventBroker {

                        private universeListeners: java.util.List<(p : org.kevoree.modeling.api.KEvent) => void> = new java.util.ArrayList<(p : org.kevoree.modeling.api.KEvent) => void>();
                        private dimensionListeners: java.util.Map<number, java.util.List<(p : org.kevoree.modeling.api.KEvent) => void>> = new java.util.HashMap<number, java.util.List<(p : org.kevoree.modeling.api.KEvent) => void>>();
                        private timeListeners: java.util.List<org.kevoree.modeling.api.event.ListenerRegistration> = new java.util.ArrayList<org.kevoree.modeling.api.event.ListenerRegistration>();
                        private objectListeners: java.util.List<org.kevoree.modeling.api.event.ListenerRegistration> = new java.util.ArrayList<org.kevoree.modeling.api.event.ListenerRegistration>();
                        constructor() {
                        }

                        public registerListener(origin: any, listener: (p : org.kevoree.modeling.api.KEvent) => void, scope: org.kevoree.modeling.api.event.ListenerScope): void {
                            if (origin instanceof org.kevoree.modeling.api.abs.AbstractKUniverse) {
                                this.universeListeners.add(listener);
                            } else {
                                if (origin instanceof org.kevoree.modeling.api.abs.AbstractKDimension) {
                                    var dimListeners: java.util.List<(p : org.kevoree.modeling.api.KEvent) => void> = this.dimensionListeners.get((<org.kevoree.modeling.api.KDimension<any, any, any>>origin).key());
                                    if (dimListeners == null) {
                                        dimListeners = new java.util.ArrayList<(p : org.kevoree.modeling.api.KEvent) => void>();
                                        this.dimensionListeners.put((<org.kevoree.modeling.api.KDimension<any, any, any>>origin).key(), dimListeners);
                                    }
                                    dimListeners.add(listener);
                                } else {
                                    if (origin instanceof org.kevoree.modeling.api.abs.AbstractKView) {
                                        var sc: org.kevoree.modeling.api.event.ListenerScope = scope;
                                        if (sc == null) {
                                            sc = org.kevoree.modeling.api.event.ListenerScope.DIMENSION;
                                        }
                                        var reg: org.kevoree.modeling.api.event.ListenerRegistration = new org.kevoree.modeling.api.event.ListenerRegistration(listener, sc, (<org.kevoree.modeling.api.abs.AbstractKView>origin).dimension().key(), (<org.kevoree.modeling.api.abs.AbstractKView>origin).now(), 0);
                                        this.timeListeners.add(reg);
                                    } else {
                                        if (origin instanceof org.kevoree.modeling.api.abs.AbstractKObject) {
                                            var sc: org.kevoree.modeling.api.event.ListenerScope = scope;
                                            if (sc == null) {
                                                sc = org.kevoree.modeling.api.event.ListenerScope.TIME;
                                            }
                                            var reg: org.kevoree.modeling.api.event.ListenerRegistration = new org.kevoree.modeling.api.event.ListenerRegistration(listener, sc, (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>origin).dimension().key(), (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>origin).now(), (<org.kevoree.modeling.api.abs.AbstractKObject<any, any>>origin).uuid());
                                            this.objectListeners.add(reg);
                                        }
                                    }
                                }
                            }
                        }

                        public notify(event: org.kevoree.modeling.api.KEvent): void {
                            for (var i: number = 0; i < this.universeListeners.size(); i++) {
                                var listener: (p : org.kevoree.modeling.api.KEvent) => void = this.universeListeners.get(i);
                                listener(event);
                            }
                            var dimList: java.util.List<(p : org.kevoree.modeling.api.KEvent) => void> = this.dimensionListeners.get(event.dimension());
                            if (dimList != null) {
                                for (var j: number = 0; j < dimList.size(); j++) {
                                    var listener: (p : org.kevoree.modeling.api.KEvent) => void = dimList.get(j);
                                    listener(event);
                                }
                            }
                            for (var k: number = 0; k < this.timeListeners.size(); k++) {
                                var reg: org.kevoree.modeling.api.event.ListenerRegistration = this.timeListeners.get(k);
                                if ((reg.scope().value() & org.kevoree.modeling.api.event.ListenerScope.UNIVERSE.value()) != 0) {
                                    if (reg.time() == event.time()) {
                                        reg.listener()(event);
                                    }
                                } else {
                                    if (reg.dimension() == event.dimension() && reg.time() == event.time()) {
                                        reg.listener()(event);
                                    }
                                }
                            }
                            for (var l: number = 0; l < this.objectListeners.size(); l++) {
                                var reg: org.kevoree.modeling.api.event.ListenerRegistration = this.objectListeners.get(l);
                                if ((reg.scope().value() & org.kevoree.modeling.api.event.ListenerScope.UNIVERSE.value()) != 0) {
                                    if (reg.uuid() == event.uuid()) {
                                        reg.listener()(event);
                                    }
                                } else {
                                    if ((reg.scope().value() & org.kevoree.modeling.api.event.ListenerScope.DIMENSION.value()) != 0) {
                                        if (reg.dimension() == event.dimension() && reg.uuid() == event.uuid()) {
                                            reg.listener()(event);
                                        }
                                    } else {
                                        if (reg.dimension() == event.dimension() && reg.time() == event.time() && reg.uuid() == event.uuid()) {
                                            reg.listener()(event);
                                        }
                                    }
                                }
                            }
                        }

                        public flush(dimensionKey: number): void {
                        }

                    }

                    export class DefaultKEvent implements org.kevoree.modeling.api.KEvent {

                        private _dimensionKey: number;
                        private _time: number;
                        private _uuid: number;
                        private _actionType: org.kevoree.modeling.api.KActionType;
                        private _metaClass: org.kevoree.modeling.api.meta.MetaClass;
                        private _metaElement: org.kevoree.modeling.api.meta.Meta;
                        private _value: any;
                        private static LEFT_BRACE: string = "{";
                        private static RIGHT_BRACE: string = "}";
                        private static DIMENSION_KEY: string = "dim";
                        private static TIME_KEY: string = "time";
                        private static UUID_KEY: string = "uuid";
                        private static TYPE_KEY: string = "type";
                        private static CLASS_KEY: string = "class";
                        private static ELEMENT_KEY: string = "elem";
                        private static VALUE_KEY: string = "value";
                        constructor(p_type: org.kevoree.modeling.api.KActionType, p_source: org.kevoree.modeling.api.KObject<any, any>, p_meta: org.kevoree.modeling.api.meta.Meta, p_newValue: any) {
                            if (p_source != null) {
                                this._dimensionKey = p_source.dimension().key();
                                this._time = p_source.now();
                                this._uuid = p_source.uuid();
                                this._metaClass = p_source.metaClass();
                            }
                            if (p_type != null) {
                                this._actionType = p_type;
                            }
                            if (p_meta != null) {
                                this._metaElement = p_meta;
                            }
                            if (p_newValue != null) {
                                this._value = p_newValue;
                            }
                        }

                        public dimension(): number {
                            return this._dimensionKey;
                        }

                        public time(): number {
                            return this._time;
                        }

                        public uuid(): number {
                            return this._uuid;
                        }

                        public actionType(): org.kevoree.modeling.api.KActionType {
                            return this._actionType;
                        }

                        public metaClass(): org.kevoree.modeling.api.meta.MetaClass {
                            return this._metaClass;
                        }

                        public metaElement(): org.kevoree.modeling.api.meta.Meta {
                            return this._metaElement;
                        }

                        public value(): any {
                            return this._value;
                        }

                        public toString(): string {
                            return this.toJSON();
                        }

                        public toJSON(): string {
                            var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                            sb.append(DefaultKEvent.LEFT_BRACE);
                            sb.append("\"").append(DefaultKEvent.DIMENSION_KEY).append("\":\"").append(this._dimensionKey).append("\",");
                            sb.append("\"").append(DefaultKEvent.TIME_KEY).append("\":\"").append(this._time).append("\",");
                            sb.append("\"").append(DefaultKEvent.UUID_KEY).append("\":\"").append(this._uuid).append("\",");
                            sb.append("\"").append(DefaultKEvent.TYPE_KEY).append("\":\"").append(this._actionType.toString()).append("\",");
                            sb.append("\"").append(DefaultKEvent.CLASS_KEY).append("\":\"").append(this._metaClass.metaName()).append("\"");
                            if (this._metaElement != null) {
                                sb.append(",\"").append(DefaultKEvent.ELEMENT_KEY).append("\":\"").append(this._metaElement.metaName()).append("\"");
                            }
                            if (this._value != null) {
                                sb.append(",\"").append(DefaultKEvent.VALUE_KEY).append("\":\"").append(org.kevoree.modeling.api.json.JsonString.encode(this._value.toString())).append("\"");
                            }
                            sb.append(DefaultKEvent.RIGHT_BRACE);
                            return sb.toString();
                        }

                        public static fromJSON(payload: string): org.kevoree.modeling.api.KEvent {
                            var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(payload);
                            var currentToken: org.kevoree.modeling.api.json.JsonToken = lexer.nextToken();
                            if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.LEFT_BRACE) {
                                var currentAttributeName: string = null;
                                var event: org.kevoree.modeling.api.event.DefaultKEvent = new org.kevoree.modeling.api.event.DefaultKEvent(null, null, null, null);
                                currentToken = lexer.nextToken();
                                while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF){
                                    if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.VALUE) {
                                        if (currentAttributeName == null) {
                                            currentAttributeName = currentToken.value().toString();
                                        } else {
                                            org.kevoree.modeling.api.event.DefaultKEvent.setEventAttribute(event, currentAttributeName, currentToken.value().toString());
                                            currentAttributeName = null;
                                        }
                                    }
                                    currentToken = lexer.nextToken();
                                }
                                return event;
                            }
                            return null;
                        }

                        private static setEventAttribute(event: org.kevoree.modeling.api.event.DefaultKEvent, currentAttributeName: string, value: string): void {
                            if (currentAttributeName.equals(DefaultKEvent.DIMENSION_KEY)) {
                                event._dimensionKey = java.lang.Long.parseLong(value);
                            } else {
                                if (currentAttributeName.equals(DefaultKEvent.TIME_KEY)) {
                                    event._time = java.lang.Long.parseLong(value);
                                } else {
                                    if (currentAttributeName.equals(DefaultKEvent.UUID_KEY)) {
                                        event._uuid = java.lang.Long.parseLong(value);
                                    } else {
                                        if (currentAttributeName.equals(DefaultKEvent.TYPE_KEY)) {
                                            event._actionType = org.kevoree.modeling.api.KActionType.parse(value);
                                        } else {
                                            if (currentAttributeName.equals(DefaultKEvent.CLASS_KEY)) {
                                            } else {
                                                if (currentAttributeName.equals(DefaultKEvent.ELEMENT_KEY)) {
                                                } else {
                                                    if (currentAttributeName.equals(DefaultKEvent.VALUE_KEY)) {
                                                        event._value = org.kevoree.modeling.api.json.JsonString.unescape(value);
                                                    } else {
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }

                    export interface KEventBroker {

                        registerListener(origin: any, listener: (p : org.kevoree.modeling.api.KEvent) => void, scope: org.kevoree.modeling.api.event.ListenerScope): void;

                        notify(event: org.kevoree.modeling.api.KEvent): void;

                        flush(dimensionKey: number): void;

                    }

                    export class ListenerRegistration {

                        public _scope: org.kevoree.modeling.api.event.ListenerScope;
                        public _listener: (p : org.kevoree.modeling.api.KEvent) => void;
                        public _dim: number;
                        public _time: number;
                        public _uuid: number;
                        constructor(plistener: (p : org.kevoree.modeling.api.KEvent) => void, pscope: org.kevoree.modeling.api.event.ListenerScope, pdim: number, ptime: number, puuid: number) {
                            this._listener = plistener;
                            this._scope = pscope;
                            this._dim = pdim;
                            this._time = ptime;
                            this._uuid = puuid;
                        }

                        public scope(): org.kevoree.modeling.api.event.ListenerScope {
                            return this._scope;
                        }

                        public listener(): (p : org.kevoree.modeling.api.KEvent) => void {
                            return this._listener;
                        }

                        public dimension(): number {
                            return this._dim;
                        }

                        public time(): number {
                            return this._time;
                        }

                        public uuid(): number {
                            return this._uuid;
                        }

                    }

                    export class ListenerScope {

                        public static TIME: ListenerScope = new ListenerScope(1);
                        public static DIMENSION: ListenerScope = new ListenerScope(2);
                        public static UNIVERSE: ListenerScope = new ListenerScope(4);
                        private _value: number;
                        constructor(pvalue: number) {
                            this._value = pvalue;
                        }

                        public value(): number {
                            return this._value;
                        }

                        public equals(other: any): boolean {
                            return this == other;
                        }
                        public static _ListenerScopeVALUES : ListenerScope[] = [
                            ListenerScope.TIME
                            ,ListenerScope.DIMENSION
                            ,ListenerScope.UNIVERSE
                        ];
                        public static values():ListenerScope[]{
                            return ListenerScope._ListenerScopeVALUES;
                        }
                    }

                }
                export module extrapolation {
                    export class DiscreteExtrapolation implements org.kevoree.modeling.api.extrapolation.Extrapolation {

                        private static INSTANCE: org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation;
                        public static instance(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                            if (DiscreteExtrapolation.INSTANCE == null) {
                                DiscreteExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation();
                            }
                            return DiscreteExtrapolation.INSTANCE;
                        }

                        public extrapolate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute): any {
                            var payload: any[] = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ);
                            if (payload != null) {
                                return payload[attribute.index()];
                            } else {
                                return null;
                            }
                        }

                        public mutate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void {
                            var internalPayload: any[] = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
                            if (internalPayload != null) {
                                internalPayload[attribute.index()] = payload;
                            }
                        }

                        public save(cache: any): string {
                            if (cache != null) {
                                return cache.toString();
                            } else {
                                return null;
                            }
                        }

                        public load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: number): any {
                            return org.kevoree.modeling.api.extrapolation.DiscreteExtrapolation.convertRaw(attribute, payload);
                        }

                        public static convertRaw(attribute: org.kevoree.modeling.api.meta.MetaAttribute, raw: any): any {
                            try {
                                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.STRING)) {
                                    return raw.toString();
                                } else {
                                    if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.LONG)) {
                                        return java.lang.Long.parseLong(raw.toString());
                                    } else {
                                        if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.INT)) {
                                            return java.lang.Integer.parseInt(raw.toString());
                                        } else {
                                            if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.BOOL)) {
                                                return raw.toString().equals("true");
                                            } else {
                                                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.SHORT)) {
                                                    return java.lang.Short.parseShort(raw.toString());
                                                } else {
                                                    if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.DOUBLE)) {
                                                        return java.lang.Double.parseDouble(raw.toString());
                                                    } else {
                                                        if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.FLOAT)) {
                                                            return java.lang.Float.parseFloat(raw.toString());
                                                        } else {
                                                            return null;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                    e.printStackTrace();
                                    return null;
                                }
                             }
                        }

                    }

                    export interface Extrapolation {

                        extrapolate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;

                        mutate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;

                        save(cache: any): string;

                        load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: number): any;

                    }

                    export class PolynomialExtrapolation implements org.kevoree.modeling.api.extrapolation.Extrapolation {

                        private static INSTANCE: org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation;
                        public extrapolate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute): any {
                            var pol: org.kevoree.modeling.api.polynomial.PolynomialModel = <org.kevoree.modeling.api.polynomial.PolynomialModel>current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[attribute.index()];
                            if (pol != null) {
                                var extrapolatedValue: number = pol.extrapolate(current.now());
                                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.DOUBLE)) {
                                    return extrapolatedValue;
                                } else {
                                    if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.LONG)) {
                                        return extrapolatedValue.longValue();
                                    } else {
                                        if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.FLOAT)) {
                                            return extrapolatedValue.floatValue();
                                        } else {
                                            if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.INT)) {
                                                return extrapolatedValue.intValue();
                                            } else {
                                                if (attribute.metaType().equals(org.kevoree.modeling.api.meta.MetaType.SHORT)) {
                                                    return extrapolatedValue.shortValue();
                                                } else {
                                                    return null;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                return null;
                            }
                        }

                        public mutate(current: org.kevoree.modeling.api.KObject<any, any>, attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void {
                            var raw: any[] = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ);
                            var previous: any = raw[attribute.index()];
                            if (previous == null) {
                                var pol: org.kevoree.modeling.api.polynomial.PolynomialModel = new org.kevoree.modeling.api.polynomial.DefaultPolynomialModel(current.now(), attribute.precision(), 20, 1, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
                                pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
                            } else {
                                var previousPol: org.kevoree.modeling.api.polynomial.PolynomialModel = <org.kevoree.modeling.api.polynomial.PolynomialModel>previous;
                                if (!previousPol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()))) {
                                    var pol: org.kevoree.modeling.api.polynomial.PolynomialModel = new org.kevoree.modeling.api.polynomial.DefaultPolynomialModel(previousPol.lastIndex(), attribute.precision(), 20, 1, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
                                    pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
                                    pol.insert(current.now(), java.lang.Double.parseDouble(payload.toString()));
                                    current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE)[attribute.index()] = pol;
                                } else {
                                    if (previousPol.isDirty()) {
                                        raw[org.kevoree.modeling.api.data.Index.IS_DIRTY_INDEX] = true;
                                    }
                                }
                            }
                        }

                        public save(cache: any): string {
                            try {
                                return (<org.kevoree.modeling.api.polynomial.PolynomialModel>cache).save();
                            } catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                    e.printStackTrace();
                                    return null;
                                }
                             }
                        }

                        public load(payload: string, attribute: org.kevoree.modeling.api.meta.MetaAttribute, now: number): any {
                            var pol: org.kevoree.modeling.api.polynomial.PolynomialModel = new org.kevoree.modeling.api.polynomial.DefaultPolynomialModel(now, attribute.precision(), 20, 1, org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES);
                            pol.load(payload);
                            return pol;
                        }

                        public static instance(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                            if (PolynomialExtrapolation.INSTANCE == null) {
                                PolynomialExtrapolation.INSTANCE = new org.kevoree.modeling.api.extrapolation.PolynomialExtrapolation();
                            }
                            return PolynomialExtrapolation.INSTANCE;
                        }

                    }

                }
                export class InboundReference {

                    private reference: org.kevoree.modeling.api.meta.MetaReference;
                    private object: org.kevoree.modeling.api.KObject<any, any>;
                    constructor(reference: org.kevoree.modeling.api.meta.MetaReference, object: org.kevoree.modeling.api.KObject<any, any>) {
                        this.reference = reference;
                        this.object = object;
                    }

                    public getReference(): org.kevoree.modeling.api.meta.MetaReference {
                        return this.reference;
                    }

                    public getObject(): org.kevoree.modeling.api.KObject<any, any> {
                        return this.object;
                    }

                }

                export module json {
                    export class JsonFormat implements org.kevoree.modeling.api.ModelFormat {

                        private _view: org.kevoree.modeling.api.KView;
                        constructor(p_view: org.kevoree.modeling.api.KView) {
                            this._view = p_view;
                        }

                        public save(model: org.kevoree.modeling.api.KObject<any, any>, callback: (p : string, p1 : java.lang.Throwable) => void): void {
                            org.kevoree.modeling.api.json.JsonModelSerializer.serialize(model, callback);
                        }

                        public load(payload: string, callback: (p : java.lang.Throwable) => void): void {
                            org.kevoree.modeling.api.json.JsonModelLoader.load(this._view, payload, callback);
                        }

                    }

                    export class JsonModelLoader {

                        public static load(factory: org.kevoree.modeling.api.KView, payload: string, callback: (p : java.lang.Throwable) => void): void {
                            if (payload == null) {
                                callback(null);
                            } else {
                                var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(payload);
                                var currentToken: org.kevoree.modeling.api.json.JsonToken = lexer.nextToken();
                                if (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.LEFT_BRACKET) {
                                    callback(null);
                                } else {
                                    var alls: java.util.List<java.util.Map<string, any>> = new java.util.ArrayList<java.util.Map<string, any>>();
                                    var content: java.util.Map<string, any> = new java.util.HashMap<string, any>();
                                    var currentAttributeName: string = null;
                                    var arrayPayload: java.util.Set<string> = null;
                                    currentToken = lexer.nextToken();
                                    while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF){
                                        if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACKET)) {
                                            arrayPayload = new java.util.HashSet<string>();
                                        } else {
                                            if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACKET)) {
                                                content.put(currentAttributeName, arrayPayload);
                                                arrayPayload = null;
                                                currentAttributeName = null;
                                            } else {
                                                if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.LEFT_BRACE)) {
                                                    content = new java.util.HashMap<string, any>();
                                                } else {
                                                    if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.RIGHT_BRACE)) {
                                                        alls.add(content);
                                                        content = new java.util.HashMap<string, any>();
                                                    } else {
                                                        if (currentToken.tokenType().equals(org.kevoree.modeling.api.json.Type.VALUE)) {
                                                            if (currentAttributeName == null) {
                                                                currentAttributeName = currentToken.value().toString();
                                                            } else {
                                                                if (arrayPayload == null) {
                                                                    content.put(currentAttributeName, currentToken.value().toString());
                                                                    currentAttributeName = null;
                                                                } else {
                                                                    arrayPayload.add(currentToken.value().toString());
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        currentToken = lexer.nextToken();
                                    }
                                    for (var i: number = 0; i < alls.size(); i++) {
                                        var elem: java.util.Map<string, any> = alls.get(i);
                                        var meta: string = elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META).toString();
                                        var kid: number = java.lang.Long.parseLong(elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_UUID).toString());
                                        var isRoot: boolean = false;
                                        var root: any = elem.get(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT);
                                        if (root != null) {
                                            isRoot = root.toString().equals("true");
                                        }
                                        var timeTree: org.kevoree.modeling.api.time.TimeTree = new org.kevoree.modeling.api.time.DefaultTimeTree();
                                        timeTree.insert(factory.now());
                                        var metaClass: org.kevoree.modeling.api.meta.MetaClass = factory.metaClass(meta);
                                        var current: org.kevoree.modeling.api.KObject<any, any> = factory.createProxy(metaClass, timeTree, kid);
                                        factory.dimension().universe().storage().initKObject(current, factory);
                                        if (isRoot) {
                                            factory.setRoot(current, null);
                                        }
                                        var raw: any[] = factory.dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.WRITE);
                                        var metaKeys: string[] = elem.keySet().toArray(new Array());
                                        if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.INBOUNDS_META)) {
                                            var inbounds: java.util.HashMap<number, org.kevoree.modeling.api.meta.MetaReference> = new java.util.HashMap<number, org.kevoree.modeling.api.meta.MetaReference>();
                                            raw[org.kevoree.modeling.api.data.Index.INBOUNDS_INDEX] = inbounds;
                                            var inbounds_payload: any = content.get(metaKeys[i]);
                                            try {
                                                var raw_keys: java.util.HashSet<string> = <java.util.HashSet<string>>inbounds_payload;
                                                var raw_keys_p: string[] = raw_keys.toArray(new Array());
                                                for (var j: number = 0; j < raw_keys_p.length; j++) {
                                                    var raw_elem: string = raw_keys_p[j];
                                                    var tuple: string[] = raw_elem.split(org.kevoree.modeling.api.data.JsonRaw.SEP);
                                                    if (tuple.length == 3) {
                                                        var raw_k: number = java.lang.Long.parseLong(tuple[0]);
                                                        var foundMeta: org.kevoree.modeling.api.meta.MetaClass = factory.metaClass(tuple[1].trim());
                                                        if (foundMeta != null) {
                                                            var metaReference: org.kevoree.modeling.api.meta.MetaReference = foundMeta.metaReference(tuple[2].trim());
                                                            if (metaReference != null) {
                                                                inbounds.put(raw_k, metaReference);
                                                            }
                                                        }
                                                    }
                                                }
                                            } catch ($ex$) {
                                                if ($ex$ instanceof java.lang.Exception) {
                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                    e.printStackTrace();
                                                }
                                             }
                                        } else {
                                            if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_META)) {
                                                try {
                                                    raw[org.kevoree.modeling.api.data.Index.PARENT_INDEX] = java.lang.Long.parseLong(content.get(metaKeys[i]).toString());
                                                } catch ($ex$) {
                                                    if ($ex$ instanceof java.lang.Exception) {
                                                        var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                        e.printStackTrace();
                                                    }
                                                 }
                                            } else {
                                                if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.PARENT_REF_META)) {
                                                    try {
                                                        var parentRef_payload: string = content.get(metaKeys[i]).toString();
                                                        var elems: string[] = parentRef_payload.split(org.kevoree.modeling.api.data.JsonRaw.SEP);
                                                        if (elems.length == 2) {
                                                            var foundMeta: org.kevoree.modeling.api.meta.MetaClass = factory.metaClass(elems[0].trim());
                                                            if (foundMeta != null) {
                                                                var metaReference: org.kevoree.modeling.api.meta.MetaReference = foundMeta.metaReference(elems[1].trim());
                                                                if (metaReference != null) {
                                                                    raw[org.kevoree.modeling.api.data.Index.REF_IN_PARENT_INDEX] = metaReference;
                                                                }
                                                            }
                                                        }
                                                    } catch ($ex$) {
                                                        if ($ex$ instanceof java.lang.Exception) {
                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                            e.printStackTrace();
                                                        }
                                                     }
                                                } else {
                                                    if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_ROOT)) {
                                                        try {
                                                            if ("true".equals(content.get(metaKeys[i]))) {
                                                                raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = true;
                                                            } else {
                                                                raw[org.kevoree.modeling.api.data.Index.IS_ROOT_INDEX] = false;
                                                            }
                                                        } catch ($ex$) {
                                                            if ($ex$ instanceof java.lang.Exception) {
                                                                var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                e.printStackTrace();
                                                            }
                                                         }
                                                    } else {
                                                        if (metaKeys[i].equals(org.kevoree.modeling.api.json.JsonModelSerializer.KEY_META)) {
                                                        } else {
                                                            var metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute = metaClass.metaAttribute(metaKeys[i]);
                                                            var metaReference: org.kevoree.modeling.api.meta.MetaReference = metaClass.metaReference(metaKeys[i]);
                                                            var insideContent: any = content.get(metaKeys[i]);
                                                            if (insideContent != null) {
                                                                if (metaAttribute != null) {
                                                                    raw[metaAttribute.index()] = metaAttribute.strategy().load(insideContent.toString(), metaAttribute, factory.now());
                                                                } else {
                                                                    if (metaReference != null) {
                                                                        if (metaReference.single()) {
                                                                            try {
                                                                                raw[metaReference.index()] = java.lang.Long.parseLong(insideContent.toString());
                                                                            } catch ($ex$) {
                                                                                if ($ex$ instanceof java.lang.Exception) {
                                                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                                    e.printStackTrace();
                                                                                }
                                                                             }
                                                                        } else {
                                                                            try {
                                                                                var convertedRaw: java.util.Set<number> = new java.util.HashSet<number>();
                                                                                var plainRawSet: java.util.Set<string> = <java.util.Set<string>>insideContent;
                                                                                var plainRawList: string[] = plainRawSet.toArray(new Array());
                                                                                for (var l: number = 0; l < plainRawList.length; l++) {
                                                                                    var plainRaw: string = plainRawList[l];
                                                                                    try {
                                                                                        var converted: number = java.lang.Long.parseLong(plainRaw);
                                                                                        convertedRaw.add(converted);
                                                                                    } catch ($ex$) {
                                                                                        if ($ex$ instanceof java.lang.Exception) {
                                                                                            var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                                            e.printStackTrace();
                                                                                        }
                                                                                     }
                                                                                }
                                                                                raw[metaReference.index()] = convertedRaw;
                                                                            } catch ($ex$) {
                                                                                if ($ex$ instanceof java.lang.Exception) {
                                                                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                                                                    e.printStackTrace();
                                                                                }
                                                                             }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (callback != null) {
                                        callback(null);
                                    }
                                }
                            }
                        }

                    }

                    export class JsonModelSerializer {

                        public static KEY_META: string = "@meta";
                        public static KEY_UUID: string = "@uuid";
                        public static KEY_ROOT: string = "@root";
                        public static PARENT_META: string = "@parent";
                        public static PARENT_REF_META: string = "@ref";
                        public static INBOUNDS_META: string = "@inbounds";
                        public static serialize(model: org.kevoree.modeling.api.KObject<any, any>, callback: (p : string, p1 : java.lang.Throwable) => void): void {
                            var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                            builder.append("[\n");
                            org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(model, builder);
                            model.graphVisit( (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                                builder.append(",");
                                org.kevoree.modeling.api.json.JsonModelSerializer.printJSON(elem, builder);
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            },  (throwable : java.lang.Throwable) => {
                                builder.append("]\n");
                                callback(builder.toString(), throwable);
                            });
                        }

                        public static printJSON(elem: org.kevoree.modeling.api.KObject<any, any>, builder: java.lang.StringBuilder): void {
                            builder.append("{\n");
                            builder.append("\t\"" + JsonModelSerializer.KEY_META + "\" : \"");
                            builder.append(elem.metaClass().metaName());
                            builder.append("\",\n");
                            builder.append("\t\"" + JsonModelSerializer.KEY_UUID + "\" : \"");
                            builder.append(elem.uuid() + "");
                            if (elem.isRoot()) {
                                builder.append("\",\n");
                                builder.append("\t\"" + JsonModelSerializer.KEY_ROOT + "\" : \"");
                                builder.append("true");
                            }
                            builder.append("\",\n");
                            for (var i: number = 0; i < elem.metaAttributes().length; i++) {
                                var payload: any = elem.get(elem.metaAttributes()[i]);
                                if (payload != null) {
                                    builder.append("\t");
                                    builder.append("\"");
                                    builder.append(elem.metaAttributes()[i].metaName());
                                    builder.append("\" : \"");
                                    builder.append(payload.toString());
                                    builder.append("\",\n");
                                }
                            }
                            for (var i: number = 0; i < elem.metaReferences().length; i++) {
                                var raw: any[] = elem.view().dimension().universe().storage().raw(elem, org.kevoree.modeling.api.data.AccessMode.READ);
                                var payload: any = null;
                                if (raw != null) {
                                    payload = raw[elem.metaReferences()[i].index()];
                                }
                                if (payload != null) {
                                    builder.append("\t");
                                    builder.append("\"");
                                    builder.append(elem.metaReferences()[i].metaName());
                                    builder.append("\" :");
                                    if (elem.metaReferences()[i].single()) {
                                        builder.append("\"");
                                        builder.append(payload.toString());
                                        builder.append("\"");
                                    } else {
                                        var elems: java.util.Set<number> = <java.util.Set<number>>payload;
                                        var elemsArr: number[] = elems.toArray(new Array());
                                        var isFirst: boolean = true;
                                        builder.append(" [");
                                        for (var j: number = 0; j < elemsArr.length; j++) {
                                            if (!isFirst) {
                                                builder.append(",");
                                            }
                                            builder.append("\"");
                                            builder.append(elemsArr[j] + "");
                                            builder.append("\"");
                                            isFirst = false;
                                        }
                                        builder.append("]");
                                    }
                                    builder.append(",\n");
                                }
                            }
                            builder.append("}\n");
                        }

                    }

                    export class JsonString {

                        private static ESCAPE_CHAR: string = '\\';
                        public static encodeBuffer(buffer: java.lang.StringBuilder, chain: string): void {
                            if (chain == null) {
                                return;
                            }
                            var i: number = 0;
                            while (i < chain.length){
                                var ch: string = chain.charAt(i);
                                if (ch == '"') {
                                    buffer.append(JsonString.ESCAPE_CHAR);
                                    buffer.append('"');
                                } else {
                                    if (ch == JsonString.ESCAPE_CHAR) {
                                        buffer.append(JsonString.ESCAPE_CHAR);
                                        buffer.append(JsonString.ESCAPE_CHAR);
                                    } else {
                                        if (ch == '\n') {
                                            buffer.append(JsonString.ESCAPE_CHAR);
                                            buffer.append('n');
                                        } else {
                                            if (ch == '\r') {
                                                buffer.append(JsonString.ESCAPE_CHAR);
                                                buffer.append('r');
                                            } else {
                                                if (ch == '\t') {
                                                    buffer.append(JsonString.ESCAPE_CHAR);
                                                    buffer.append('t');
                                                } else {
                                                    if (ch == '\u2028') {
                                                        buffer.append(JsonString.ESCAPE_CHAR);
                                                        buffer.append('u');
                                                        buffer.append('2');
                                                        buffer.append('0');
                                                        buffer.append('2');
                                                        buffer.append('8');
                                                    } else {
                                                        if (ch == '\u2029') {
                                                            buffer.append(JsonString.ESCAPE_CHAR);
                                                            buffer.append('u');
                                                            buffer.append('2');
                                                            buffer.append('0');
                                                            buffer.append('2');
                                                            buffer.append('9');
                                                        } else {
                                                            buffer.append(ch);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                i = i + 1;
                            }
                        }

                        public static encode(chain: string): string {
                            var sb: java.lang.StringBuilder = new java.lang.StringBuilder();
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(sb, chain);
                            return sb.toString();
                        }

                        public static unescape(src: string): string {
                            if (src == null) {
                                return null;
                            }
                            if (src.length == 0) {
                                return src;
                            }
                            var builder: java.lang.StringBuilder = null;
                            var i: number = 0;
                            while (i < src.length){
                                var current: string = src.charAt(i);
                                if (current == JsonString.ESCAPE_CHAR) {
                                    if (builder == null) {
                                        builder = new java.lang.StringBuilder();
                                        builder.append(src.substring(0, i));
                                    }
                                    i++;
                                    var current2: string = src.charAt(i);
                                    switch (current2) {
                                        case '"': 
                                        builder.append('\"');
                                        break;
                                        case '\\': 
                                        builder.append(current2);
                                        break;
                                        case '/': 
                                        builder.append(current2);
                                        break;
                                        case 'b': 
                                        builder.append('\b');
                                        break;
                                        case 'f': 
                                        builder.append('\f');
                                        break;
                                        case 'n': 
                                        builder.append('\n');
                                        break;
                                        case 'r': 
                                        builder.append('\r');
                                        break;
                                        case 't': 
                                        builder.append('\t');
                                        break;
                                    }
                                } else {
                                    if (builder != null) {
                                        builder = builder.append(current);
                                    }
                                }
                                i++;
                            }
                            if (builder != null) {
                                return builder.toString();
                            } else {
                                return src;
                            }
                        }

                    }

                    export class JsonToken {

                        private _tokenType: org.kevoree.modeling.api.json.Type;
                        private _value: any;
                        constructor(p_tokenType: org.kevoree.modeling.api.json.Type, p_value: any) {
                            this._tokenType = p_tokenType;
                            this._value = p_value;
                        }

                        public toString(): string {
                            var v: string;
                            if (this._value != null) {
                                v = " (" + this._value + ")";
                            } else {
                                v = "";
                            }
                            var result: string = this._tokenType.toString() + v;
                            return result;
                        }

                        public tokenType(): org.kevoree.modeling.api.json.Type {
                            return this._tokenType;
                        }

                        public value(): any {
                            return this._value;
                        }

                    }

                    export class Lexer {

                        private bytes: string;
                        private EOF: org.kevoree.modeling.api.json.JsonToken;
                        private BOOLEAN_LETTERS: java.util.HashSet<string> = null;
                        private DIGIT: java.util.HashSet<string> = null;
                        private index: number = 0;
                        private static DEFAULT_BUFFER_SIZE: number = 1024 * 4;
                        constructor(payload: string) {
                            this.bytes = payload;
                            this.EOF = new org.kevoree.modeling.api.json.JsonToken(org.kevoree.modeling.api.json.Type.EOF, null);
                        }

                        public isSpace(c: string): boolean {
                            return c == ' ' || c == '\r' || c == '\n' || c == '\t';
                        }

                        private nextChar(): string {
                            return this.bytes.charAt(this.index++);
                        }

                        private peekChar(): string {
                            return this.bytes.charAt(this.index);
                        }

                        private isDone(): boolean {
                            return this.index >= this.bytes.length;
                        }

                        private isBooleanLetter(c: string): boolean {
                            if (this.BOOLEAN_LETTERS == null) {
                                this.BOOLEAN_LETTERS = new java.util.HashSet<string>();
                                this.BOOLEAN_LETTERS.add('f');
                                this.BOOLEAN_LETTERS.add('a');
                                this.BOOLEAN_LETTERS.add('l');
                                this.BOOLEAN_LETTERS.add('s');
                                this.BOOLEAN_LETTERS.add('e');
                                this.BOOLEAN_LETTERS.add('t');
                                this.BOOLEAN_LETTERS.add('r');
                                this.BOOLEAN_LETTERS.add('u');
                            }
                            return this.BOOLEAN_LETTERS.contains(c);
                        }

                        private isDigit(c: string): boolean {
                            if (this.DIGIT == null) {
                                this.DIGIT = new java.util.HashSet<string>();
                                this.DIGIT.add('0');
                                this.DIGIT.add('1');
                                this.DIGIT.add('2');
                                this.DIGIT.add('3');
                                this.DIGIT.add('4');
                                this.DIGIT.add('5');
                                this.DIGIT.add('6');
                                this.DIGIT.add('7');
                                this.DIGIT.add('8');
                                this.DIGIT.add('9');
                            }
                            return this.DIGIT.contains(c);
                        }

                        private isValueLetter(c: string): boolean {
                            return c == '-' || c == '+' || c == '.' || this.isDigit(c) || this.isBooleanLetter(c);
                        }

                        public nextToken(): org.kevoree.modeling.api.json.JsonToken {
                            if (this.isDone()) {
                                return this.EOF;
                            }
                            var tokenType: org.kevoree.modeling.api.json.Type = org.kevoree.modeling.api.json.Type.EOF;
                            var c: string = this.nextChar();
                            var currentValue: java.lang.StringBuilder = new java.lang.StringBuilder();
                            var jsonValue: any = null;
                            while (!this.isDone() && this.isSpace(c)){
                                c = this.nextChar();
                            }
                            if ('"' == c) {
                                tokenType = org.kevoree.modeling.api.json.Type.VALUE;
                                if (!this.isDone()) {
                                    c = this.nextChar();
                                    while (this.index < this.bytes.length && c != '"'){
                                        currentValue.append(c);
                                        if (c == '\\' && this.index < this.bytes.length) {
                                            c = this.nextChar();
                                            currentValue.append(c);
                                        }
                                        c = this.nextChar();
                                    }
                                    jsonValue = currentValue.toString();
                                }
                            } else {
                                if ('{' == c) {
                                    tokenType = org.kevoree.modeling.api.json.Type.LEFT_BRACE;
                                } else {
                                    if ('}' == c) {
                                        tokenType = org.kevoree.modeling.api.json.Type.RIGHT_BRACE;
                                    } else {
                                        if ('[' == c) {
                                            tokenType = org.kevoree.modeling.api.json.Type.LEFT_BRACKET;
                                        } else {
                                            if (']' == c) {
                                                tokenType = org.kevoree.modeling.api.json.Type.RIGHT_BRACKET;
                                            } else {
                                                if (':' == c) {
                                                    tokenType = org.kevoree.modeling.api.json.Type.COLON;
                                                } else {
                                                    if (',' == c) {
                                                        tokenType = org.kevoree.modeling.api.json.Type.COMMA;
                                                    } else {
                                                        if (!this.isDone()) {
                                                            while (this.isValueLetter(c)){
                                                                currentValue.append(c);
                                                                if (!this.isValueLetter(this.peekChar())) {
                                                                    break;
                                                                } else {
                                                                    c = this.nextChar();
                                                                }
                                                            }
                                                            var v: string = currentValue.toString();
                                                            if ("true".equals(v.toLowerCase())) {
                                                                jsonValue = true;
                                                            } else {
                                                                if ("false".equals(v.toLowerCase())) {
                                                                    jsonValue = false;
                                                                } else {
                                                                    jsonValue = v.toLowerCase();
                                                                }
                                                            }
                                                            tokenType = org.kevoree.modeling.api.json.Type.VALUE;
                                                        } else {
                                                            tokenType = org.kevoree.modeling.api.json.Type.EOF;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return new org.kevoree.modeling.api.json.JsonToken(tokenType, jsonValue);
                        }

                    }

                    export class Type {

                        public static VALUE: Type = new Type(0);
                        public static LEFT_BRACE: Type = new Type(1);
                        public static RIGHT_BRACE: Type = new Type(2);
                        public static LEFT_BRACKET: Type = new Type(3);
                        public static RIGHT_BRACKET: Type = new Type(4);
                        public static COMMA: Type = new Type(5);
                        public static COLON: Type = new Type(6);
                        public static EOF: Type = new Type(42);
                        private _value: number;
                        constructor(p_value: number) {
                            this._value = p_value;
                        }

                        public equals(other: any): boolean {
                            return this == other;
                        }
                        public static _TypeVALUES : Type[] = [
                            Type.VALUE
                            ,Type.LEFT_BRACE
                            ,Type.RIGHT_BRACE
                            ,Type.LEFT_BRACKET
                            ,Type.RIGHT_BRACKET
                            ,Type.COMMA
                            ,Type.COLON
                            ,Type.EOF
                        ];
                        public static values():Type[]{
                            return Type._TypeVALUES;
                        }
                    }

                }
                export class KActionType {

                    public static CALL: KActionType = new KActionType("CALL");
                    public static SET: KActionType = new KActionType("SET");
                    public static ADD: KActionType = new KActionType("ADD");
                    public static REMOVE: KActionType = new KActionType("DEL");
                    public static NEW: KActionType = new KActionType("NEW");
                    private _code: string = "";
                    constructor(code: string) {
                        this._code = code;
                    }

                    public toString(): string {
                        return this._code;
                    }

                    public code(): string {
                        return this._code;
                    }

                    public static parse(s: string): org.kevoree.modeling.api.KActionType {
                        for (var i: number = 0; i < org.kevoree.modeling.api.KActionType.values().length; i++) {
                            var current: org.kevoree.modeling.api.KActionType = org.kevoree.modeling.api.KActionType.values()[i];
                            if (current.code().equals(s)) {
                                return current;
                            }
                        }
                        return null;
                    }

                    public equals(other: any): boolean {
                        return this == other;
                    }
                    public static _KActionTypeVALUES : KActionType[] = [
                        KActionType.CALL
                        ,KActionType.SET
                        ,KActionType.ADD
                        ,KActionType.REMOVE
                        ,KActionType.NEW
                    ];
                    public static values():KActionType[]{
                        return KActionType._KActionTypeVALUES;
                    }
                }

                export interface KDimension<A extends org.kevoree.modeling.api.KView, B extends org.kevoree.modeling.api.KDimension<any, any, any>, C extends org.kevoree.modeling.api.KUniverse<any>> {

                    key(): number;

                    parent(callback: (p : B) => void): void;

                    children(callback: (p : B[]) => void): void;

                    fork(callback: (p : B) => void): void;

                    save(callback: (p : java.lang.Throwable) => void): void;

                    saveUnload(callback: (p : java.lang.Throwable) => void): void;

                    delete(callback: (p : java.lang.Throwable) => void): void;

                    discard(callback: (p : java.lang.Throwable) => void): void;

                    time(timePoint: number): A;

                    universe(): C;

                    equals(other: any): boolean;

                }

                export interface KEvent {

                    dimension(): number;

                    time(): number;

                    uuid(): number;

                    actionType(): org.kevoree.modeling.api.KActionType;

                    metaClass(): org.kevoree.modeling.api.meta.MetaClass;

                    metaElement(): org.kevoree.modeling.api.meta.Meta;

                    value(): any;

                    toJSON(): string;

                }

                export interface KObject<A extends org.kevoree.modeling.api.KObject<any, any>, B extends org.kevoree.modeling.api.KView> {

                    dimension(): org.kevoree.modeling.api.KDimension<any, any, any>;

                    isRoot(): boolean;

                    uuid(): number;

                    path(callback: (p : string) => void): void;

                    view(): B;

                    delete(callback: (p : java.lang.Throwable) => void): void;

                    parent(callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void;

                    parentUuid(): number;

                    select(query: string, callback: (p : org.kevoree.modeling.api.KObject<any, any>[]) => void): void;

                    stream(query: string, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void;

                    listen(listener: (p : org.kevoree.modeling.api.KEvent) => void, scope: org.kevoree.modeling.api.event.ListenerScope): void;

                    visitAttributes(visitor: (p : org.kevoree.modeling.api.meta.MetaAttribute, p1 : any) => void): void;

                    visit(visitor: (p : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (p : java.lang.Throwable) => void): void;

                    graphVisit(visitor: (p : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (p : java.lang.Throwable) => void): void;

                    treeVisit(visitor: (p : org.kevoree.modeling.api.KObject<any, any>) => org.kevoree.modeling.api.VisitResult, end: (p : java.lang.Throwable) => void): void;

                    now(): number;

                    jump(time: number, callback: (p : A) => void): void;

                    timeTree(): org.kevoree.modeling.api.time.TimeTree;

                    referenceInParent(): org.kevoree.modeling.api.meta.MetaReference;

                    domainKey(): string;

                    metaClass(): org.kevoree.modeling.api.meta.MetaClass;

                    metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[];

                    metaReferences(): org.kevoree.modeling.api.meta.MetaReference[];

                    metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[];

                    metaAttribute(name: string): org.kevoree.modeling.api.meta.MetaAttribute;

                    metaReference(name: string): org.kevoree.modeling.api.meta.MetaReference;

                    metaOperation(name: string): org.kevoree.modeling.api.meta.MetaOperation;

                    mutate(actionType: org.kevoree.modeling.api.KActionType, metaReference: org.kevoree.modeling.api.meta.MetaReference, param: org.kevoree.modeling.api.KObject<any, any>, setOpposite: boolean): void;

                    each<C extends org.kevoree.modeling.api.KObject<any, any>> (metaReference: org.kevoree.modeling.api.meta.MetaReference, callback: (p : C) => void, end: (p : java.lang.Throwable) => void): void;

                    inbounds(callback: (p : org.kevoree.modeling.api.InboundReference) => void, end: (p : java.lang.Throwable) => void): void;

                    traces(request: org.kevoree.modeling.api.TraceRequest): org.kevoree.modeling.api.trace.ModelTrace[];

                    get(attribute: org.kevoree.modeling.api.meta.MetaAttribute): any;

                    set(attribute: org.kevoree.modeling.api.meta.MetaAttribute, payload: any): void;

                    toJSON(): string;

                    equals(other: any): boolean;

                }

                export interface KOperation {

                    on(source: org.kevoree.modeling.api.KObject<any, any>, params: any[], result: (p : any) => void): void;

                }

                export interface KUniverse<A extends org.kevoree.modeling.api.KDimension<any, any, any>> {

                    connect(callback: (p : java.lang.Throwable) => void): void;

                    close(callback: (p : java.lang.Throwable) => void): void;

                    newDimension(): A;

                    dimension(key: number): A;

                    saveAll(callback: (p : boolean) => void): void;

                    deleteAll(callback: (p : boolean) => void): void;

                    unloadAll(callback: (p : boolean) => void): void;

                    disable(listener: (p : org.kevoree.modeling.api.KEvent) => void): void;

                    stream(query: string, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void;

                    storage(): org.kevoree.modeling.api.data.KStore;

                    listen(listener: (p : org.kevoree.modeling.api.KEvent) => void, scope: org.kevoree.modeling.api.event.ListenerScope): void;

                    setEventBroker(eventBroker: org.kevoree.modeling.api.event.KEventBroker): org.kevoree.modeling.api.KUniverse<any>;

                    setDataBase(dataBase: org.kevoree.modeling.api.data.KDataBase): org.kevoree.modeling.api.KUniverse<any>;

                    setOperation(metaOperation: org.kevoree.modeling.api.meta.MetaOperation, operation: (p : org.kevoree.modeling.api.KObject<any, any>, p1 : any[], p2 : (p : any) => void) => void): void;

                }

                export interface KView {

                    createFQN(metaClassName: string): org.kevoree.modeling.api.KObject<any, any>;

                    create(clazz: org.kevoree.modeling.api.meta.MetaClass): org.kevoree.modeling.api.KObject<any, any>;

                    setRoot(elem: org.kevoree.modeling.api.KObject<any, any>, callback: (p : java.lang.Throwable) => void): void;

                    select(query: string, callback: (p : org.kevoree.modeling.api.KObject<any, any>[]) => void): void;

                    lookup(key: number, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void;

                    lookupAll(keys: number[], callback: (p : org.kevoree.modeling.api.KObject<any, any>[]) => void): void;

                    stream(query: string, callback: (p : org.kevoree.modeling.api.KObject<any, any>) => void): void;

                    metaClasses(): org.kevoree.modeling.api.meta.MetaClass[];

                    metaClass(fqName: string): org.kevoree.modeling.api.meta.MetaClass;

                    dimension(): org.kevoree.modeling.api.KDimension<any, any, any>;

                    now(): number;

                    createProxy(clazz: org.kevoree.modeling.api.meta.MetaClass, timeTree: org.kevoree.modeling.api.time.TimeTree, key: number): org.kevoree.modeling.api.KObject<any, any>;

                    listen(listener: (p : org.kevoree.modeling.api.KEvent) => void, scope: org.kevoree.modeling.api.event.ListenerScope): void;

                    diff(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void;

                    merge(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void;

                    intersection(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void;

                    slice(elems: java.util.List<org.kevoree.modeling.api.KObject<any, any>>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void;

                    clone<A extends org.kevoree.modeling.api.KObject<any, any>> (o: A, callback: (p : A) => void): void;

                    json(): org.kevoree.modeling.api.ModelFormat;

                    xmi(): org.kevoree.modeling.api.ModelFormat;

                    equals(other: any): boolean;

                }

                export module meta {
                    export interface Meta {

                        metaName(): string;

                        index(): number;

                    }

                    export interface MetaAttribute extends org.kevoree.modeling.api.meta.Meta {

                        key(): boolean;

                        origin(): org.kevoree.modeling.api.meta.MetaClass;

                        metaType(): org.kevoree.modeling.api.meta.MetaType;

                        strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation;

                        precision(): number;

                        setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void;

                    }

                    export interface MetaClass extends org.kevoree.modeling.api.meta.Meta {

                        metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[];

                        metaReferences(): org.kevoree.modeling.api.meta.MetaReference[];

                        metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[];

                        metaAttribute(name: string): org.kevoree.modeling.api.meta.MetaAttribute;

                        metaReference(name: string): org.kevoree.modeling.api.meta.MetaReference;

                        metaOperation(name: string): org.kevoree.modeling.api.meta.MetaOperation;

                    }

                    export interface MetaOperation extends org.kevoree.modeling.api.meta.Meta {

                        origin(): org.kevoree.modeling.api.meta.MetaClass;

                    }

                    export interface MetaReference extends org.kevoree.modeling.api.meta.Meta {

                        contained(): boolean;

                        single(): boolean;

                        metaType(): org.kevoree.modeling.api.meta.MetaClass;

                        opposite(): org.kevoree.modeling.api.meta.MetaReference;

                        origin(): org.kevoree.modeling.api.meta.MetaClass;

                    }

                    export class MetaType {

                        public static STRING: MetaType = new MetaType();
                        public static LONG: MetaType = new MetaType();
                        public static INT: MetaType = new MetaType();
                        public static BOOL: MetaType = new MetaType();
                        public static SHORT: MetaType = new MetaType();
                        public static DOUBLE: MetaType = new MetaType();
                        public static FLOAT: MetaType = new MetaType();
                        public equals(other: any): boolean {
                            return this == other;
                        }
                        public static _MetaTypeVALUES : MetaType[] = [
                            MetaType.STRING
                            ,MetaType.LONG
                            ,MetaType.INT
                            ,MetaType.BOOL
                            ,MetaType.SHORT
                            ,MetaType.DOUBLE
                            ,MetaType.FLOAT
                        ];
                        public static values():MetaType[]{
                            return MetaType._MetaTypeVALUES;
                        }
                    }

                }
                export interface ModelAttributeVisitor {

                    visit(metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute, value: any): void;

                }

                export interface ModelFormat {

                    save(model: org.kevoree.modeling.api.KObject<any, any>, callback: (p : string, p1 : java.lang.Throwable) => void): void;

                    load(payload: string, callback: (p : java.lang.Throwable) => void): void;

                }

                export interface ModelListener {

                    on(evt: org.kevoree.modeling.api.KEvent): void;

                }

                export interface ModelVisitor {

                    visit(elem: org.kevoree.modeling.api.KObject<any, any>): org.kevoree.modeling.api.VisitResult;

                }

                export module operation {
                    export class DefaultModelCloner {

                        public static clone<A extends org.kevoree.modeling.api.KObject<any, any>> (originalObject: A, callback: (p : A) => void): void {
                            if (originalObject == null || originalObject.view() == null || originalObject.view().dimension() == null) {
                                callback(null);
                            } else {
                                originalObject.view().dimension().fork( (o : org.kevoree.modeling.api.KDimension<any, any, any>) => {
                                    o.time(originalObject.view().now()).lookup(originalObject.uuid(),  (clonedObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                        callback(<A>clonedObject);
                                    });
                                });
                            }
                        }

                    }

                    export class DefaultModelCompare {

                        public static diff(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, false, false, callback);
                        }

                        public static merge(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, false, true, callback);
                        }

                        public static intersection(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            org.kevoree.modeling.api.operation.DefaultModelCompare.internal_diff(origin, target, true, false, callback);
                        }

                        private static internal_diff(origin: org.kevoree.modeling.api.KObject<any, any>, target: org.kevoree.modeling.api.KObject<any, any>, inter: boolean, merge: boolean, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
                            var tracesRef: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
                            var objectsMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any, any>> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject<any, any>>();
                            traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(origin, target, inter, merge, false, true));
                            tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(origin, target, inter, merge, true, false));
                            origin.treeVisit( (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                                objectsMap.put(elem.uuid(), elem);
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            },  (throwable : java.lang.Throwable) => {
                                if (throwable != null) {
                                    throwable.printStackTrace();
                                    callback(null);
                                } else {
                                    target.treeVisit( (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                                        var childPath: number = elem.uuid();
                                        if (objectsMap.containsKey(childPath)) {
                                            if (inter) {
                                                var currentReference: org.kevoree.modeling.api.meta.MetaReference = null;
                                                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
                                            }
                                            traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, false, true));
                                            tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, true, false));
                                            objectsMap.remove(childPath);
                                        } else {
                                            if (!inter) {
                                                var currentReference: org.kevoree.modeling.api.meta.MetaReference = null;
                                                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
                                                traces.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(elem, elem, true, merge, false, true));
                                                tracesRef.addAll(org.kevoree.modeling.api.operation.DefaultModelCompare.internal_createTraces(elem, elem, true, merge, true, false));
                                            }
                                        }
                                        return org.kevoree.modeling.api.VisitResult.CONTINUE;
                                    },  (throwable : java.lang.Throwable) => {
                                        if (throwable != null) {
                                            throwable.printStackTrace();
                                            callback(null);
                                        } else {
                                            traces.addAll(tracesRef);
                                            if (!inter && !merge) {
                                                var diffChildKeys: number[] = objectsMap.keySet().toArray(new Array());
                                                for (var i: number = 0; i < diffChildKeys.length; i++) {
                                                    var diffChildKey: number = diffChildKeys[i];
                                                    var diffChild: org.kevoree.modeling.api.KObject<any, any> = objectsMap.get(diffChildKey);
                                                    var src: number = diffChild.parentUuid();
                                                    traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(src, diffChild.referenceInParent(), diffChild.uuid()));
                                                }
                                            }
                                            callback(new org.kevoree.modeling.api.trace.TraceSequence().populate(traces));
                                        }
                                    });
                                }
                            });
                        }

                        private static internal_createTraces(current: org.kevoree.modeling.api.KObject<any, any>, sibling: org.kevoree.modeling.api.KObject<any, any>, inter: boolean, merge: boolean, references: boolean, attributes: boolean): java.util.List<org.kevoree.modeling.api.trace.ModelTrace> {
                            var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
                            var values: java.util.Map<org.kevoree.modeling.api.meta.MetaAttribute, string> = new java.util.HashMap<org.kevoree.modeling.api.meta.MetaAttribute, string>();
                            if (attributes) {
                                if (current != null) {
                                    current.visitAttributes( (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => {
                                        if (value == null) {
                                            values.put(metaAttribute, null);
                                        } else {
                                            values.put(metaAttribute, value.toString());
                                        }
                                    });
                                }
                                if (sibling != null) {
                                    sibling.visitAttributes( (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => {
                                        var flatAtt2: string = null;
                                        if (value != null) {
                                            flatAtt2 = value.toString();
                                        }
                                        var flatAtt1: string = values.get(metaAttribute);
                                        var isEquals: boolean = true;
                                        if (flatAtt1 == null) {
                                            if (flatAtt2 == null) {
                                                isEquals = true;
                                            } else {
                                                isEquals = false;
                                            }
                                        } else {
                                            isEquals = flatAtt1.equals(flatAtt2);
                                        }
                                        if (isEquals) {
                                            if (inter) {
                                                traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
                                            }
                                        } else {
                                            if (!inter) {
                                                traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
                                            }
                                        }
                                        values.remove(metaAttribute);
                                    });
                                }
                                if (!inter && !merge && !values.isEmpty()) {
                                    var mettaAttributes: org.kevoree.modeling.api.meta.MetaAttribute[] = values.keySet().toArray(new Array());
                                    for (var i: number = 0; i < mettaAttributes.length; i++) {
                                        var hashLoopRes: org.kevoree.modeling.api.meta.MetaAttribute = mettaAttributes[i];
                                        traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(current.uuid(), hashLoopRes, null));
                                        values.remove(hashLoopRes);
                                    }
                                }
                            }
                            var valuesRef: java.util.Map<org.kevoree.modeling.api.meta.MetaReference, any> = new java.util.HashMap<org.kevoree.modeling.api.meta.MetaReference, any>();
                            if (references) {
                                for (var i: number = 0; i < current.metaReferences().length; i++) {
                                    var reference: org.kevoree.modeling.api.meta.MetaReference = current.metaReferences()[i];
                                    var payload: any = current.view().dimension().universe().storage().raw(current, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
                                    valuesRef.put(reference, payload);
                                }
                                if (sibling != null) {
                                    for (var i: number = 0; i < sibling.metaReferences().length; i++) {
                                        var reference: org.kevoree.modeling.api.meta.MetaReference = sibling.metaReferences()[i];
                                        var payload2: any = sibling.view().dimension().universe().storage().raw(sibling, org.kevoree.modeling.api.data.AccessMode.READ)[reference.index()];
                                        var payload1: any = valuesRef.get(reference);
                                        if (reference.single()) {
                                            var isEquals: boolean = true;
                                            if (payload1 == null) {
                                                if (payload2 == null) {
                                                    isEquals = true;
                                                } else {
                                                    isEquals = false;
                                                }
                                            } else {
                                                isEquals = payload1.equals(payload2);
                                            }
                                            if (isEquals) {
                                                if (inter) {
                                                    if (payload2 != null) {
                                                        traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, <number>payload2, null));
                                                    }
                                                }
                                            } else {
                                                if (!inter) {
                                                    traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, <number>payload2, null));
                                                }
                                            }
                                        } else {
                                            if (payload1 == null && payload2 != null) {
                                                var siblingToAdd: number[] = (<java.util.Set<number>>payload2).toArray(new Array());
                                                for (var j: number = 0; j < siblingToAdd.length; j++) {
                                                    var siblingElem: number = siblingToAdd[j];
                                                    if (!inter) {
                                                        traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, siblingElem, null));
                                                    }
                                                }
                                            } else {
                                                if (payload1 != null) {
                                                    var currentPaths: number[] = (<java.util.Set<number>>payload1).toArray(new Array());
                                                    for (var j: number = 0; j < currentPaths.length; j++) {
                                                        var currentPath: number = currentPaths[j];
                                                        var isFound: boolean = false;
                                                        if (payload2 != null) {
                                                            var siblingPaths: java.util.Set<number> = <java.util.Set<number>>payload2;
                                                            isFound = siblingPaths.contains(currentPath);
                                                        }
                                                        if (isFound) {
                                                            if (inter) {
                                                                traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(current.uuid(), reference, currentPath, null));
                                                            }
                                                        } else {
                                                            if (!inter) {
                                                                traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(current.uuid(), reference, currentPath));
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        valuesRef.remove(reference);
                                    }
                                    if (!inter && !merge && !valuesRef.isEmpty()) {
                                        var metaReferences: org.kevoree.modeling.api.meta.MetaReference[] = valuesRef.keySet().toArray(new Array());
                                        for (var i: number = 0; i < metaReferences.length; i++) {
                                            var hashLoopResRef: org.kevoree.modeling.api.meta.MetaReference = metaReferences[i];
                                            var payload: any = valuesRef.get(hashLoopResRef);
                                            if (payload != null) {
                                                if (payload instanceof java.util.Set) {
                                                    var toRemoveSet: number[] = (<java.util.Set<number>>payload).toArray(new Array());
                                                    for (var j: number = 0; j < toRemoveSet.length; j++) {
                                                        var toRemovePath: number = toRemoveSet[j];
                                                        traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(current.uuid(), hashLoopResRef, toRemovePath));
                                                    }
                                                } else {
                                                    traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(current.uuid(), hashLoopResRef, <number>payload));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return traces;
                        }

                    }

                    export class DefaultModelSlicer {

                        private static internal_prune(elem: org.kevoree.modeling.api.KObject<any, any>, traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace>, cache: java.util.Map<number, org.kevoree.modeling.api.KObject<any, any>>, parentMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any, any>>, callback: (p : java.lang.Throwable) => void): void {
                            var parents: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                            var parentExplorer: java.util.List<(p : org.kevoree.modeling.api.KObject<any, any>) => void> = new java.util.ArrayList<(p : org.kevoree.modeling.api.KObject<any, any>) => void>();
                            parentExplorer.add( (currentParent : org.kevoree.modeling.api.KObject<any, any>) => {
                                if (currentParent != null && parentMap.get(currentParent.uuid()) == null && cache.get(currentParent.uuid()) == null) {
                                    parents.add(currentParent);
                                    currentParent.parent(parentExplorer.get(0));
                                    callback(null);
                                } else {
                                    java.util.Collections.reverse(parents);
                                    var parentsArr: org.kevoree.modeling.api.KObject<any, any>[] = parents.toArray(new Array());
                                    for (var k: number = 0; k < parentsArr.length; k++) {
                                        var parent: org.kevoree.modeling.api.KObject<any, any> = parentsArr[k];
                                        if (parent.parentUuid() != null) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(parent.parentUuid(), parent.referenceInParent(), parent.uuid(), parent.metaClass()));
                                        }
                                        var toAdd: org.kevoree.modeling.api.trace.ModelTrace[] = elem.traces(org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY);
                                        for (var i: number = 0; i < toAdd.length; i++) {
                                            traces.add(toAdd[i]);
                                        }
                                        parentMap.put(parent.uuid(), parent);
                                    }
                                    if (cache.get(elem.uuid()) == null && parentMap.get(elem.uuid()) == null) {
                                        if (elem.parentUuid() != null) {
                                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid(), elem.metaClass()));
                                        }
                                        var toAdd: org.kevoree.modeling.api.trace.ModelTrace[] = elem.traces(org.kevoree.modeling.api.TraceRequest.ATTRIBUTES_ONLY);
                                        for (var i: number = 0; i < toAdd.length; i++) {
                                            traces.add(toAdd[i]);
                                        }
                                    }
                                    cache.put(elem.uuid(), elem);
                                    elem.graphVisit( (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                                        if (cache.get(elem.uuid()) == null) {
                                            org.kevoree.modeling.api.operation.DefaultModelSlicer.internal_prune(elem, traces, cache, parentMap,  (throwable : java.lang.Throwable) => {
                                            });
                                        }
                                        return org.kevoree.modeling.api.VisitResult.CONTINUE;
                                    },  (throwable : java.lang.Throwable) => {
                                        callback(null);
                                    });
                                }
                            });
                            traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(elem.uuid(), null, elem.uuid(), elem.metaClass()));
                            elem.parent(parentExplorer.get(0));
                        }

                        public static slice(elems: java.util.List<org.kevoree.modeling.api.KObject<any, any>>, callback: (p : org.kevoree.modeling.api.trace.TraceSequence) => void): void {
                            var traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
                            var tempMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any, any>> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject<any, any>>();
                            var parentMap: java.util.Map<number, org.kevoree.modeling.api.KObject<any, any>> = new java.util.HashMap<number, org.kevoree.modeling.api.KObject<any, any>>();
                            var elemsArr: org.kevoree.modeling.api.KObject<any, any>[] = elems.toArray(new Array());
                            org.kevoree.modeling.api.util.Helper.forall(elemsArr,  (obj : org.kevoree.modeling.api.KObject<any, any>, next : (p : java.lang.Throwable) => void) => {
                                org.kevoree.modeling.api.operation.DefaultModelSlicer.internal_prune(obj, traces, tempMap, parentMap, next);
                            },  (throwable : java.lang.Throwable) => {
                                var toLinkKeysArr: number[] = tempMap.keySet().toArray(new Array());
                                for (var k: number = 0; k < toLinkKeysArr.length; k++) {
                                    var toLink: org.kevoree.modeling.api.KObject<any, any> = tempMap.get(toLinkKeysArr[k]);
                                    var toAdd: org.kevoree.modeling.api.trace.ModelTrace[] = toLink.traces(org.kevoree.modeling.api.TraceRequest.REFERENCES_ONLY);
                                    for (var i: number = 0; i < toAdd.length; i++) {
                                        traces.add(toAdd[i]);
                                    }
                                }
                                callback(new org.kevoree.modeling.api.trace.TraceSequence().populate(traces));
                            });
                        }

                    }

                }
                export module polynomial {
                    export class DefaultPolynomialModel implements org.kevoree.modeling.api.polynomial.PolynomialModel {

                        private weights: number[];
                        private timeOrigin: number;
                        private samples: java.util.List<org.kevoree.modeling.api.polynomial.util.DataSample> = new java.util.ArrayList<org.kevoree.modeling.api.polynomial.util.DataSample>();
                        private degradeFactor: number;
                        private prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization;
                        private maxDegree: number;
                        private toleratedError: number;
                        private _lastIndex: number = -1;
                        private static sep: string = "/";
                        private _isDirty: boolean = false;
                        constructor(timeOrigin: number, toleratedError: number, maxDegree: number, degradeFactor: number, prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization) {
                            this.timeOrigin = timeOrigin;
                            this.degradeFactor = degradeFactor;
                            this.prioritization = prioritization;
                            this.maxDegree = maxDegree;
                            this.toleratedError = toleratedError;
                        }

                        public getSamples(): java.util.List<org.kevoree.modeling.api.polynomial.util.DataSample> {
                            return this.samples;
                        }

                        public getDegree(): number {
                            if (this.weights == null) {
                                return -1;
                            } else {
                                return this.weights.length - 1;
                            }
                        }

                        public getTimeOrigin(): number {
                            return this.timeOrigin;
                        }

                        private getMaxErr(degree: number, toleratedError: number, maxDegree: number, prioritization: org.kevoree.modeling.api.polynomial.util.Prioritization): number {
                            var tol: number = toleratedError;
                            if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.HIGHDEGREES) {
                                tol = toleratedError / Math.pow(2, maxDegree - degree);
                            } else {
                                if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.LOWDEGREES) {
                                    tol = toleratedError / Math.pow(2, degree + 0.5);
                                } else {
                                    if (prioritization == org.kevoree.modeling.api.polynomial.util.Prioritization.SAMEPRIORITY) {
                                        tol = toleratedError * degree * 2 / (2 * maxDegree);
                                    }
                                }
                            }
                            return tol;
                        }

                        private internal_feed(time: number, value: number): void {
                            if (this.weights == null) {
                                this.weights = new Array();
                                this.weights[0] = value;
                                this.timeOrigin = time;
                                this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
                            }
                        }

                        private maxError(computedWeights: number[], time: number, value: number): number {
                            var maxErr: number = 0;
                            var temp: number = 0;
                            var ds: org.kevoree.modeling.api.polynomial.util.DataSample;
                            for (var i: number = 0; i < this.samples.size(); i++) {
                                ds = this.samples.get(i);
                                var val: number = this.internal_extrapolate(ds.time, computedWeights);
                                temp = Math.abs(val - ds.value);
                                if (temp > maxErr) {
                                    maxErr = temp;
                                }
                            }
                            temp = Math.abs(this.internal_extrapolate(time, computedWeights) - value);
                            if (temp > maxErr) {
                                maxErr = temp;
                            }
                            return maxErr;
                        }

                        public comparePolynome(p2: org.kevoree.modeling.api.polynomial.DefaultPolynomialModel, err: number): boolean {
                            if (this.weights.length != p2.weights.length) {
                                return false;
                            }
                            for (var i: number = 0; i < this.weights.length; i++) {
                                if (Math.abs(this.weights[i] - this.weights[i]) > err) {
                                    return false;
                                }
                            }
                            return true;
                        }

                        private internal_extrapolate(time: number, weights: number[]): number {
                            var result: number = 0;
                            var t: number = (<number>(time - this.timeOrigin)) / this.degradeFactor;
                            var power: number = 1;
                            for (var j: number = 0; j < weights.length; j++) {
                                result += weights[j] * power;
                                power = power * t;
                            }
                            return result;
                        }

                        public extrapolate(time: number): number {
                            return this.internal_extrapolate(time, this.weights);
                        }

                        public insert(time: number, value: number): boolean {
                            if (this.weights == null) {
                                this.internal_feed(time, value);
                                this._lastIndex = time;
                                this._isDirty = true;
                                return true;
                            }
                            var maxError: number = this.getMaxErr(this.getDegree(), this.toleratedError, this.maxDegree, this.prioritization);
                            if (Math.abs(this.extrapolate(time) - value) <= maxError) {
                                this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
                                this._lastIndex = time;
                                return true;
                            }
                            var deg: number = this.getDegree();
                            if (deg < this.maxDegree) {
                                deg++;
                                var ss: number = Math.min(deg * 2, this.samples.size());
                                var times: number[] = new Array();
                                var values: number[] = new Array();
                                var current: number = this.samples.size();
                                for (var i: number = 0; i < ss; i++) {
                                    var index: number = Math.round(i * current / ss);
                                    var ds: org.kevoree.modeling.api.polynomial.util.DataSample = this.samples.get(index);
                                    times[i] = (<number>(ds.time - this.timeOrigin)) / this.degradeFactor;
                                    values[i] = ds.value;
                                }
                                times[ss] = (<number>(time - this.timeOrigin)) / this.degradeFactor;
                                values[ss] = value;
                                var pf: org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml = new org.kevoree.modeling.api.polynomial.util.PolynomialFitEjml(deg);
                                pf.fit(times, values);
                                if (this.maxError(pf.getCoef(), time, value) <= maxError) {
                                    this.weights = new Array();
                                    for (var i: number = 0; i < pf.getCoef().length; i++) {
                                        this.weights[i] = pf.getCoef()[i];
                                    }
                                    this.samples.add(new org.kevoree.modeling.api.polynomial.util.DataSample(time, value));
                                    this._lastIndex = time;
                                    this._isDirty = true;
                                    return true;
                                }
                            }
                            return false;
                        }

                        public lastIndex(): number {
                            return this._lastIndex;
                        }

                        public indexBefore(time: number): number {
                            return this._lastIndex;
                        }

                        public timesAfter(time: number): number[] {
                            return null;
                        }

                        public save(): string {
                            var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                            for (var i: number = 0; i < this.weights.length; i++) {
                                if (i != 0) {
                                    builder.append(DefaultPolynomialModel.sep);
                                }
                                builder.append(this.weights[i] + "");
                            }
                            this._isDirty = false;
                            return builder.toString();
                        }

                        public load(payload: string): void {
                            var elems: string[] = payload.split(DefaultPolynomialModel.sep);
                            this.weights = new Array();
                            for (var i: number = 0; i < elems.length; i++) {
                                this.weights[i] = java.lang.Double.parseDouble(elems[i]);
                            }
                            this._isDirty = false;
                        }

                        public isDirty(): boolean {
                            return this._isDirty;
                        }

                    }

                    export interface PolynomialModel {

                        extrapolate(time: number): number;

                        insert(time: number, value: number): boolean;

                        lastIndex(): number;

                        indexBefore(time: number): number;

                        timesAfter(time: number): number[];

                        save(): string;

                        load(payload: string): void;

                        isDirty(): boolean;

                    }

                    export module util {
                        export class AdjLinearSolverQr {

                            public numRows: number;
                            public numCols: number;
                            private decomposer: org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64;
                            public maxRows: number = -1;
                            public maxCols: number = -1;
                            public Q: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            public R: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            private Y: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            private Z: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            public setA(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): boolean {
                                if (A.numRows > this.maxRows || A.numCols > this.maxCols) {
                                    this.setMaxSize(A.numRows, A.numCols);
                                }
                                this.numRows = A.numRows;
                                this.numCols = A.numCols;
                                if (!this.decomposer.decompose(A)) {
                                    return false;
                                }
                                this.Q.reshape(this.numRows, this.numRows, false);
                                this.R.reshape(this.numRows, this.numCols, false);
                                this.decomposer.getQ(this.Q, false);
                                this.decomposer.getR(this.R, false);
                                return true;
                            }

                            private solveU(U: number[], b: number[], n: number): void {
                                for (var i: number = n - 1; i >= 0; i--) {
                                    var sum: number = b[i];
                                    var indexU: number = i * n + i + 1;
                                    for (var j: number = i + 1; j < n; j++) {
                                        sum -= U[indexU++] * b[j];
                                    }
                                    b[i] = sum / U[i * n + i];
                                }
                            }

                            public solve(B: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, X: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                var BnumCols: number = B.numCols;
                                this.Y.reshape(this.numRows, 1, false);
                                this.Z.reshape(this.numRows, 1, false);
                                for (var colB: number = 0; colB < BnumCols; colB++) {
                                    for (var i: number = 0; i < this.numRows; i++) {
                                        this.Y.data[i] = B.unsafe_get(i, colB);
                                    }
                                    org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA(this.Q, this.Y, this.Z);
                                    this.solveU(this.R.data, this.Z.data, this.numCols);
                                    for (var i: number = 0; i < this.numCols; i++) {
                                        X.cset(i, colB, this.Z.data[i]);
                                    }
                                }
                            }

                            constructor() {
                                this.decomposer = new org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64();
                            }

                            public setMaxSize(maxRows: number, maxCols: number): void {
                                maxRows += 5;
                                this.maxRows = maxRows;
                                this.maxCols = maxCols;
                                this.Q = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, maxRows);
                                this.R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, maxCols);
                                this.Y = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, 1);
                                this.Z = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(maxRows, 1);
                            }

                        }

                        export class DataSample {

                            public time: number;
                            public value: number;
                            constructor(time: number, value: number) {
                                this.time = time;
                                this.value = value;
                            }

                        }

                        export class DenseMatrix64F {

                            public numRows: number;
                            public numCols: number;
                            public data: number[];
                            public static MULT_COLUMN_SWITCH: number = 15;
                            public static multTransA_smallMV(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, B: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, C: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                var cIndex: number = 0;
                                for (var i: number = 0; i < A.numCols; i++) {
                                    var total: number = 0.0;
                                    var indexA: number = i;
                                    for (var j: number = 0; j < A.numRows; j++) {
                                        total += A.get(indexA) * B.get(j);
                                        indexA += A.numCols;
                                    }
                                    C.set(cIndex++, total);
                                }
                            }

                            public static multTransA_reorderMV(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, B: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, C: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                if (A.numRows == 0) {
                                    org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.fill(C, 0);
                                    return;
                                }
                                var B_val: number = B.get(0);
                                for (var i: number = 0; i < A.numCols; i++) {
                                    C.set(i, A.get(i) * B_val);
                                }
                                var indexA: number = A.numCols;
                                for (var i: number = 1; i < A.numRows; i++) {
                                    B_val = B.get(i);
                                    for (var j: number = 0; j < A.numCols; j++) {
                                        C.plus(j, A.get(indexA++) * B_val);
                                    }
                                }
                            }

                            public static multTransA_reorderMM(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                if (a.numCols == 0 || a.numRows == 0) {
                                    org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.fill(c, 0);
                                    return;
                                }
                                var valA: number;
                                for (var i: number = 0; i < a.numCols; i++) {
                                    var indexC_start: number = i * c.numCols;
                                    valA = a.get(i);
                                    var indexB: number = 0;
                                    var end: number = indexB + b.numCols;
                                    var indexC: number = indexC_start;
                                    while (indexB < end){
                                        c.set(indexC++, valA * b.get(indexB++));
                                    }
                                    for (var k: number = 1; k < a.numRows; k++) {
                                        valA = a.unsafe_get(k, i);
                                        end = indexB + b.numCols;
                                        indexC = indexC_start;
                                        while (indexB < end){
                                            c.plus(indexC++, valA * b.get(indexB++));
                                        }
                                    }
                                }
                            }

                            public static multTransA_smallMM(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                var cIndex: number = 0;
                                for (var i: number = 0; i < a.numCols; i++) {
                                    for (var j: number = 0; j < b.numCols; j++) {
                                        var indexA: number = i;
                                        var indexB: number = j;
                                        var end: number = indexB + b.numRows * b.numCols;
                                        var total: number = 0;
                                        for (; indexB < end; indexB += b.numCols) {
                                            total += a.get(indexA) * b.get(indexB);
                                            indexA += a.numCols;
                                        }
                                        c.set(cIndex++, total);
                                    }
                                }
                            }

                            public static multTransA(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, b: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, c: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                if (b.numCols == 1) {
                                    if (a.numCols >= org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH) {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_reorderMV(a, b, c);
                                    } else {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_smallMV(a, b, c);
                                    }
                                } else {
                                    if (a.numCols >= org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH || b.numCols >= org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.MULT_COLUMN_SWITCH) {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_reorderMM(a, b, c);
                                    } else {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.multTransA_smallMM(a, b, c);
                                    }
                                }
                            }

                            public static setIdentity(mat: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                var width: number = mat.numRows < mat.numCols ? mat.numRows : mat.numCols;
                                java.util.Arrays.fill(mat.data, 0, mat.getNumElements(), 0);
                                var index: number = 0;
                                for (var i: number = 0; i < width; i++) {
                                    mat.data[index] = 1;
                                    index += mat.numCols + 1;
                                }
                            }

                            public static widentity(width: number): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
                                var ret: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(width, width);
                                for (var i: number = 0; i < width; i++) {
                                    ret.cset(i, i, 1.0);
                                }
                                return ret;
                            }

                            public static identity(numRows: number, numCols: number): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
                                var ret: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(numRows, numCols);
                                var small: number = numRows < numCols ? numRows : numCols;
                                for (var i: number = 0; i < small; i++) {
                                    ret.cset(i, i, 1.0);
                                }
                                return ret;
                            }

                            public static fill(a: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, value: number): void {
                                java.util.Arrays.fill(a.data, 0, a.getNumElements(), value);
                            }

                            public get(index: number): number {
                                return this.data[index];
                            }

                            public set(index: number, val: number): number {
                                return this.data[index] = val;
                            }

                            public plus(index: number, val: number): number {
                                return this.data[index] += val;
                            }

                            constructor(numRows: number, numCols: number) {
                                this.data = new Array();
                                this.numRows = numRows;
                                this.numCols = numCols;
                            }

                            public reshape(numRows: number, numCols: number, saveValues: boolean): void {
                                if (this.data.length < numRows * numCols) {
                                    var d: number[] = new Array();
                                    if (saveValues) {
                                        System.arraycopy(this.data, 0, d, 0, this.getNumElements());
                                    }
                                    this.data = d;
                                }
                                this.numRows = numRows;
                                this.numCols = numCols;
                            }

                            public cset(row: number, col: number, value: number): void {
                                this.data[row * this.numCols + col] = value;
                            }

                            public unsafe_get(row: number, col: number): number {
                                return this.data[row * this.numCols + col];
                            }

                            public getNumElements(): number {
                                return this.numRows * this.numCols;
                            }

                        }

                        export class PolynomialFitEjml {

                            public A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            public coef: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            public y: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F;
                            public solver: org.kevoree.modeling.api.polynomial.util.AdjLinearSolverQr;
                            constructor(degree: number) {
                                this.coef = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(degree + 1, 1);
                                this.A = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(1, degree + 1);
                                this.y = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(1, 1);
                                this.solver = new org.kevoree.modeling.api.polynomial.util.AdjLinearSolverQr();
                            }

                            public getCoef(): number[] {
                                return this.coef.data;
                            }

                            public fit(samplePoints: number[], observations: number[]): void {
                                this.y.reshape(observations.length, 1, false);
                                System.arraycopy(observations, 0, this.y.data, 0, observations.length);
                                this.A.reshape(this.y.numRows, this.coef.numRows, false);
                                for (var i: number = 0; i < observations.length; i++) {
                                    var obs: number = 1;
                                    for (var j: number = 0; j < this.coef.numRows; j++) {
                                        this.A.cset(i, j, obs);
                                        obs *= samplePoints[i];
                                    }
                                }
                                this.solver.setA(this.A);
                                this.solver.solve(this.y, this.coef);
                            }

                        }

                        export class Prioritization {

                            public static SAMEPRIORITY: Prioritization = new Prioritization();
                            public static HIGHDEGREES: Prioritization = new Prioritization();
                            public static LOWDEGREES: Prioritization = new Prioritization();
                            public equals(other: any): boolean {
                                return this == other;
                            }
                            public static _PrioritizationVALUES : Prioritization[] = [
                                Prioritization.SAMEPRIORITY
                                ,Prioritization.HIGHDEGREES
                                ,Prioritization.LOWDEGREES
                            ];
                            public static values():Prioritization[]{
                                return Prioritization._PrioritizationVALUES;
                            }
                        }

                        export class QRDecompositionHouseholderColumn_D64 {

                            public dataQR: number[][];
                            public v: number[];
                            public numCols: number;
                            public numRows: number;
                            public minLength: number;
                            public gammas: number[];
                            public gamma: number;
                            public tau: number;
                            public error: boolean;
                            public setExpectedMaxSize(numRows: number, numCols: number): void {
                                this.numCols = numCols;
                                this.numRows = numRows;
                                this.minLength = Math.min(numCols, numRows);
                                var maxLength: number = Math.max(numCols, numRows);
                                if (this.dataQR == null || this.dataQR.length < numCols || this.dataQR[0].length < numRows) {
                                    this.dataQR = new Array(new Array());
                                    for (var i: number = 0; i < numCols; i++) {
                                        this.dataQR[i] = new Array();
                                    }
                                    this.v = new Array();
                                    this.gammas = new Array();
                                }
                                if (this.v.length < maxLength) {
                                    this.v = new Array();
                                }
                                if (this.gammas.length < this.minLength) {
                                    this.gammas = new Array();
                                }
                            }

                            public getQ(Q: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, compact: boolean): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
                                if (compact) {
                                    if (Q == null) {
                                        Q = org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.identity(this.numRows, this.minLength);
                                    } else {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.setIdentity(Q);
                                    }
                                } else {
                                    if (Q == null) {
                                        Q = org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.widentity(this.numRows);
                                    } else {
                                        org.kevoree.modeling.api.polynomial.util.DenseMatrix64F.setIdentity(Q);
                                    }
                                }
                                for (var j: number = this.minLength - 1; j >= 0; j--) {
                                    var u: number[] = this.dataQR[j];
                                    var vv: number = u[j];
                                    u[j] = 1;
                                    org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.rank1UpdateMultR(Q, u, this.gammas[j], j, j, this.numRows, this.v);
                                    u[j] = vv;
                                }
                                return Q;
                            }

                            public getR(R: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, compact: boolean): org.kevoree.modeling.api.polynomial.util.DenseMatrix64F {
                                if (R == null) {
                                    if (compact) {
                                        R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(this.minLength, this.numCols);
                                    } else {
                                        R = new org.kevoree.modeling.api.polynomial.util.DenseMatrix64F(this.numRows, this.numCols);
                                    }
                                } else {
                                    for (var i: number = 0; i < R.numRows; i++) {
                                        var min: number = Math.min(i, R.numCols);
                                        for (var j: number = 0; j < min; j++) {
                                            R.cset(i, j, 0);
                                        }
                                    }
                                }
                                for (var j: number = 0; j < this.numCols; j++) {
                                    var colR: number[] = this.dataQR[j];
                                    var l: number = Math.min(j, this.numRows - 1);
                                    for (var i: number = 0; i <= l; i++) {
                                        var val: number = colR[i];
                                        R.cset(i, j, val);
                                    }
                                }
                                return R;
                            }

                            public decompose(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): boolean {
                                this.setExpectedMaxSize(A.numRows, A.numCols);
                                this.convertToColumnMajor(A);
                                this.error = false;
                                for (var j: number = 0; j < this.minLength; j++) {
                                    this.householder(j);
                                    this.updateA(j);
                                }
                                return !this.error;
                            }

                            public convertToColumnMajor(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F): void {
                                for (var x: number = 0; x < this.numCols; x++) {
                                    var colQ: number[] = this.dataQR[x];
                                    for (var y: number = 0; y < this.numRows; y++) {
                                        colQ[y] = A.data[y * this.numCols + x];
                                    }
                                }
                            }

                            public householder(j: number): void {
                                var u: number[] = this.dataQR[j];
                                var max: number = org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.findMax(u, j, this.numRows - j);
                                if (max == 0.0) {
                                    this.gamma = 0;
                                    this.error = true;
                                } else {
                                    this.tau = org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.computeTauAndDivide(j, this.numRows, u, max);
                                    var u_0: number = u[j] + this.tau;
                                    org.kevoree.modeling.api.polynomial.util.QRDecompositionHouseholderColumn_D64.divideElements(j + 1, this.numRows, u, u_0);
                                    this.gamma = u_0 / this.tau;
                                    this.tau *= max;
                                    u[j] = -this.tau;
                                }
                                this.gammas[j] = this.gamma;
                            }

                            public updateA(w: number): void {
                                var u: number[] = this.dataQR[w];
                                for (var j: number = w + 1; j < this.numCols; j++) {
                                    var colQ: number[] = this.dataQR[j];
                                    var val: number = colQ[w];
                                    for (var k: number = w + 1; k < this.numRows; k++) {
                                        val += u[k] * colQ[k];
                                    }
                                    val *= this.gamma;
                                    colQ[w] -= val;
                                    for (var i: number = w + 1; i < this.numRows; i++) {
                                        colQ[i] -= u[i] * val;
                                    }
                                }
                            }

                            public static findMax(u: number[], startU: number, length: number): number {
                                var max: number = -1;
                                var index: number = startU;
                                var stopIndex: number = startU + length;
                                for (; index < stopIndex; index++) {
                                    var val: number = u[index];
                                    val = (val < 0.0) ? -val : val;
                                    if (val > max) {
                                        max = val;
                                    }
                                }
                                return max;
                            }

                            public static divideElements(j: number, numRows: number, u: number[], u_0: number): void {
                                for (var i: number = j; i < numRows; i++) {
                                    u[i] /= u_0;
                                }
                            }

                            public static computeTauAndDivide(j: number, numRows: number, u: number[], max: number): number {
                                var tau: number = 0;
                                for (var i: number = j; i < numRows; i++) {
                                    var d: number = u[i] /= max;
                                    tau += d * d;
                                }
                                tau = Math.sqrt(tau);
                                if (u[j] < 0) {
                                    tau = -tau;
                                }
                                return tau;
                            }

                            public static rank1UpdateMultR(A: org.kevoree.modeling.api.polynomial.util.DenseMatrix64F, u: number[], gamma: number, colA0: number, w0: number, w1: number, _temp: number[]): void {
                                for (var i: number = colA0; i < A.numCols; i++) {
                                    _temp[i] = u[w0] * A.data[w0 * A.numCols + i];
                                }
                                for (var k: number = w0 + 1; k < w1; k++) {
                                    var indexA: number = k * A.numCols + colA0;
                                    var valU: number = u[k];
                                    for (var i: number = colA0; i < A.numCols; i++) {
                                        _temp[i] += valU * A.data[indexA++];
                                    }
                                }
                                for (var i: number = colA0; i < A.numCols; i++) {
                                    _temp[i] *= gamma;
                                }
                                for (var i: number = w0; i < w1; i++) {
                                    var valU: number = u[i];
                                    var indexA: number = i * A.numCols + colA0;
                                    for (var j: number = colA0; j < A.numCols; j++) {
                                        A.data[indexA++] -= valU * _temp[j];
                                    }
                                }
                            }

                        }

                    }
                }
                export module select {
                    export class KQuery {

                        public static OPEN_BRACKET: string = '[';
                        public static CLOSE_BRACKET: string = ']';
                        public static QUERY_SEP: string = '/';
                        public relationName: string;
                        public params: java.util.Map<string, org.kevoree.modeling.api.select.KQueryParam>;
                        public subQuery: string;
                        public oldString: string;
                        public previousIsDeep: boolean;
                        public previousIsRefDeep: boolean;
                        constructor(relationName: string, params: java.util.Map<string, org.kevoree.modeling.api.select.KQueryParam>, subQuery: string, oldString: string, previousIsDeep: boolean, previousIsRefDeep: boolean) {
                            this.relationName = relationName;
                            this.params = params;
                            this.subQuery = subQuery;
                            this.oldString = oldString;
                            this.previousIsDeep = previousIsDeep;
                            this.previousIsRefDeep = previousIsRefDeep;
                        }

                        public static extractFirstQuery(query: string): org.kevoree.modeling.api.select.KQuery {
                            if (query == null || query.length == 0) {
                                return null;
                            }
                            if (query.charAt(0) == KQuery.QUERY_SEP) {
                                var subQuery: string = null;
                                if (query.length > 1) {
                                    subQuery = query.substring(1);
                                }
                                var params: java.util.Map<string, org.kevoree.modeling.api.select.KQueryParam> = new java.util.HashMap<string, org.kevoree.modeling.api.select.KQueryParam>();
                                return new org.kevoree.modeling.api.select.KQuery("", params, subQuery, "" + KQuery.QUERY_SEP, false, false);
                            }
                            if (query.startsWith("**/")) {
                                if (query.length > 3) {
                                    var next: org.kevoree.modeling.api.select.KQuery = org.kevoree.modeling.api.select.KQuery.extractFirstQuery(query.substring(3));
                                    if (next != null) {
                                        next.previousIsDeep = true;
                                        next.previousIsRefDeep = false;
                                    }
                                    return next;
                                } else {
                                    return null;
                                }
                            }
                            if (query.startsWith("***/")) {
                                if (query.length > 4) {
                                    var next: org.kevoree.modeling.api.select.KQuery = org.kevoree.modeling.api.select.KQuery.extractFirstQuery(query.substring(4));
                                    if (next != null) {
                                        next.previousIsDeep = true;
                                        next.previousIsRefDeep = true;
                                    }
                                    return next;
                                } else {
                                    return null;
                                }
                            }
                            var i: number = 0;
                            var relationNameEnd: number = 0;
                            var attsEnd: number = 0;
                            var escaped: boolean = false;
                            while (i < query.length && ((query.charAt(i) != KQuery.QUERY_SEP) || escaped)){
                                if (escaped) {
                                    escaped = false;
                                }
                                if (query.charAt(i) == KQuery.OPEN_BRACKET) {
                                    relationNameEnd = i;
                                } else {
                                    if (query.charAt(i) == KQuery.CLOSE_BRACKET) {
                                        attsEnd = i;
                                    } else {
                                        if (query.charAt(i) == '\\') {
                                            escaped = true;
                                        }
                                    }
                                }
                                i = i + 1;
                            }
                            if (i > 0 && relationNameEnd > 0) {
                                var oldString: string = query.substring(0, i);
                                var subQuery: string = null;
                                if (i + 1 < query.length) {
                                    subQuery = query.substring(i + 1);
                                }
                                var relName: string = query.substring(0, relationNameEnd);
                                var params: java.util.Map<string, org.kevoree.modeling.api.select.KQueryParam> = new java.util.HashMap<string, org.kevoree.modeling.api.select.KQueryParam>();
                                relName = relName.replace("\\", "");
                                if (attsEnd != 0) {
                                    var paramString: string = query.substring(relationNameEnd + 1, attsEnd);
                                    var iParam: number = 0;
                                    var lastStart: number = iParam;
                                    escaped = false;
                                    while (iParam < paramString.length){
                                        if (paramString.charAt(iParam) == ',' && !escaped) {
                                            var p: string = paramString.substring(lastStart, iParam).trim();
                                            if (p.equals("") && !p.equals("*")) {
                                                if (p.endsWith("=")) {
                                                    p = p + "*";
                                                }
                                                var pArray: string[] = p.split("=");
                                                var pObject: org.kevoree.modeling.api.select.KQueryParam;
                                                if (pArray.length > 1) {
                                                    var paramKey: string = pArray[0].trim();
                                                    var negative: boolean = paramKey.endsWith("!");
                                                    pObject = new org.kevoree.modeling.api.select.KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                                                    params.put(pObject.name(), pObject);
                                                } else {
                                                    pObject = new org.kevoree.modeling.api.select.KQueryParam(null, p, false);
                                                    params.put("@id", pObject);
                                                }
                                            }
                                            lastStart = iParam + 1;
                                        } else {
                                            if (paramString.charAt(iParam) == '\\') {
                                                escaped = true;
                                            } else {
                                                escaped = false;
                                            }
                                        }
                                        iParam = iParam + 1;
                                    }
                                    var lastParam: string = paramString.substring(lastStart, iParam).trim();
                                    if (!lastParam.equals("") && !lastParam.equals("*")) {
                                        if (lastParam.endsWith("=")) {
                                            lastParam = lastParam + "*";
                                        }
                                        var pArray: string[] = lastParam.split("=");
                                        var pObject: org.kevoree.modeling.api.select.KQueryParam;
                                        if (pArray.length > 1) {
                                            var paramKey: string = pArray[0].trim();
                                            var negative: boolean = paramKey.endsWith("!");
                                            pObject = new org.kevoree.modeling.api.select.KQueryParam(paramKey.replace("!", ""), pArray[1].trim(), negative);
                                            params.put(pObject.name(), pObject);
                                        } else {
                                            pObject = new org.kevoree.modeling.api.select.KQueryParam(null, lastParam, false);
                                            params.put("@id", pObject);
                                        }
                                    }
                                }
                                return new org.kevoree.modeling.api.select.KQuery(relName, params, subQuery, oldString, false, false);
                            }
                            return null;
                        }

                    }

                    export class KQueryParam {

                        private _name: string;
                        private _value: string;
                        private _negative: boolean;
                        constructor(p_name: string, p_value: string, p_negative: boolean) {
                            this._name = p_name;
                            this._value = p_value;
                            this._negative = p_negative;
                        }

                        public name(): string {
                            return this._name;
                        }

                        public value(): string {
                            return this._value;
                        }

                        public isNegative(): boolean {
                            return this._negative;
                        }

                    }

                    export class KSelector {

                        public static select(root: org.kevoree.modeling.api.KObject<any, any>, query: string, callback: (p : org.kevoree.modeling.api.KObject<any, any>[]) => void): void {
                            var extractedQuery: org.kevoree.modeling.api.select.KQuery = org.kevoree.modeling.api.select.KQuery.extractFirstQuery(query);
                            if (extractedQuery == null) {
                                callback(new Array());
                            } else {
                                var relationNameRegex: string = extractedQuery.relationName.replace("*", ".*");
                                var collected: java.util.Set<number> = new java.util.HashSet<number>();
                                var raw: any[] = root.dimension().universe().storage().raw(root, org.kevoree.modeling.api.data.AccessMode.READ);
                                for (var i: number = 0; i < root.metaReferences().length; i++) {
                                    var reference: org.kevoree.modeling.api.meta.MetaReference = root.metaReferences()[i];
                                    if (reference.metaName().matches(relationNameRegex)) {
                                        var refPayLoad: any = raw[reference.index()];
                                        if (refPayLoad != null) {
                                            if (refPayLoad instanceof java.util.Set) {
                                                var castedSet: java.util.Set<number> = <java.util.Set<number>>refPayLoad;
                                                collected.addAll(castedSet);
                                            } else {
                                                var castedLong: number = <number>refPayLoad;
                                                collected.add(castedLong);
                                            }
                                        }
                                    }
                                }
                                root.view().lookupAll(collected.toArray(new Array()),  (resolveds : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                    var nextGeneration: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                                    if (extractedQuery.params.isEmpty()) {
                                        for (var i: number = 0; i < resolveds.length; i++) {
                                            nextGeneration.add(resolveds[i]);
                                        }
                                    } else {
                                        for (var i: number = 0; i < resolveds.length; i++) {
                                            var resolved: org.kevoree.modeling.api.KObject<any, any> = resolveds[i];
                                            var selectedForNext: boolean = true;
                                            //TODO resolve for-each cycle
                                            var paramKey: string;
                                            for (paramKey in extractedQuery.params.keySet()) {
                                                var param: org.kevoree.modeling.api.select.KQueryParam = extractedQuery.params.get(paramKey);
                                                for (var j: number = 0; j < resolved.metaAttributes().length; j++) {
                                                    var metaAttribute: org.kevoree.modeling.api.meta.MetaAttribute = resolved.metaAttributes()[i];
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
                                    var childSelected: java.util.List<org.kevoree.modeling.api.KObject<any, any>> = new java.util.ArrayList<org.kevoree.modeling.api.KObject<any, any>>();
                                    if (extractedQuery.subQuery == null || extractedQuery.subQuery.isEmpty()) {
                                        childSelected.add(root);
                                        callback(nextGeneration.toArray(new Array()));
                                    } else {
                                        org.kevoree.modeling.api.util.Helper.forall(nextGeneration.toArray(new Array()),  (kObject : org.kevoree.modeling.api.KObject<any, any>, next : (p : java.lang.Throwable) => void) => {
                                            org.kevoree.modeling.api.select.KSelector.select(kObject, extractedQuery.subQuery,  (kObjects : org.kevoree.modeling.api.KObject<any, any>[]) => {
                                                childSelected.addAll(childSelected);
                                            });
                                        },  (throwable : java.lang.Throwable) => {
                                            callback(childSelected.toArray(new Array()));
                                        });
                                    }
                                });
                            }
                        }

                    }

                }
                export interface ThrowableCallback<A> {

                    on(a: A, error: java.lang.Throwable): void;

                }

                export module time {
                    export class DefaultTimeTree implements org.kevoree.modeling.api.time.TimeTree {

                        public dirty: boolean = true;
                        public versionTree: org.kevoree.modeling.api.time.rbtree.RBTree = new org.kevoree.modeling.api.time.rbtree.RBTree();
                        public walk(walker: (p : number) => void): void {
                            this.walkAsc(walker);
                        }

                        public walkAsc(walker: (p : number) => void): void {
                            var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.first();
                            while (elem != null){
                                walker(elem.getKey());
                                elem = elem.next();
                            }
                        }

                        public walkDesc(walker: (p : number) => void): void {
                            var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.last();
                            while (elem != null){
                                walker(elem.getKey());
                                elem = elem.previous();
                            }
                        }

                        public walkRangeAsc(walker: (p : number) => void, from: number, to: number): void {
                            var from2: number = from;
                            var to2: number = to;
                            if (from > to) {
                                from2 = to;
                                to2 = from;
                            }
                            var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previousOrEqual(from2);
                            while (elem != null){
                                walker(elem.getKey());
                                elem = elem.next();
                                if (elem != null) {
                                    if (elem.getKey() >= to2) {
                                        return;
                                    }
                                }
                            }
                        }

                        public walkRangeDesc(walker: (p : number) => void, from: number, to: number): void {
                            var from2: number = from;
                            var to2: number = to;
                            if (from > to) {
                                from2 = to;
                                to2 = from;
                            }
                            var elem: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previousOrEqual(to2);
                            while (elem != null){
                                walker(elem.getKey());
                                elem = elem.previous();
                                if (elem != null) {
                                    if (elem.getKey() <= from2) {
                                        walker(elem.getKey());
                                        return;
                                    }
                                }
                            }
                        }

                        public first(): number {
                            var firstNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.first();
                            if (firstNode != null) {
                                return firstNode.getKey();
                            } else {
                                return null;
                            }
                        }

                        public last(): number {
                            var lastNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.last();
                            if (lastNode != null) {
                                return lastNode.getKey();
                            } else {
                                return null;
                            }
                        }

                        public next(from: number): number {
                            var nextNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.next(from);
                            if (nextNode != null) {
                                return nextNode.getKey();
                            } else {
                                return null;
                            }
                        }

                        public previous(from: number): number {
                            var previousNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previous(from);
                            if (previousNode != null) {
                                return previousNode.getKey();
                            } else {
                                return null;
                            }
                        }

                        public resolve(time: number): number {
                            var previousNode: org.kevoree.modeling.api.time.rbtree.TreeNode = this.versionTree.previousOrEqual(time);
                            if (previousNode != null) {
                                return previousNode.getKey();
                            } else {
                                return null;
                            }
                        }

                        public insert(time: number): org.kevoree.modeling.api.time.TimeTree {
                            this.versionTree.insert(time, org.kevoree.modeling.api.time.rbtree.State.EXISTS);
                            this.dirty = true;
                            return this;
                        }

                        public delete(time: number): org.kevoree.modeling.api.time.TimeTree {
                            this.versionTree.insert(time, org.kevoree.modeling.api.time.rbtree.State.DELETED);
                            this.dirty = true;
                            return this;
                        }

                        public isDirty(): boolean {
                            return this.dirty;
                        }

                        public size(): number {
                            return this.versionTree.size();
                        }

                        public setDirty(state: boolean): void {
                            this.dirty = state;
                        }

                        public toString(): string {
                            return this.versionTree.serialize();
                        }

                        public load(payload: string): void {
                            this.versionTree.unserialize(payload);
                            this.dirty = false;
                        }

                    }

                    export module rbtree {
                        export class Color {

                            public static RED: Color = new Color();
                            public static BLACK: Color = new Color();
                            public equals(other: any): boolean {
                                return this == other;
                            }
                            public static _ColorVALUES : Color[] = [
                                Color.RED
                                ,Color.BLACK
                            ];
                            public static values():Color[]{
                                return Color._ColorVALUES;
                            }
                        }

                        export class LongRBTree {

                            public root: org.kevoree.modeling.api.time.rbtree.LongTreeNode = null;
                            private _size: number = 0;
                            public dirty: boolean = false;
                            public size(): number {
                                return this._size;
                            }

                            public serialize(): string {
                                var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                                builder.append(this._size);
                                if (this.root != null) {
                                    this.root.serialize(builder);
                                }
                                return builder.toString();
                            }

                            public unserialize(payload: string): void {
                                if (payload == null || payload.length == 0) {
                                    return;
                                }
                                var i: number = 0;
                                var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                                var ch: string = payload.charAt(i);
                                while (i < payload.length && ch != '|'){
                                    buffer.append(ch);
                                    i = i + 1;
                                    ch = payload.charAt(i);
                                }
                                this._size = java.lang.Integer.parseInt(buffer.toString());
                                var ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext = new org.kevoree.modeling.api.time.rbtree.TreeReaderContext();
                                ctx.index = i;
                                ctx.payload = payload;
                                ctx.buffer = new Array();
                                this.root = org.kevoree.modeling.api.time.rbtree.LongTreeNode.unserialize(ctx);
                                this.dirty = false;
                            }

                            public previousOrEqual(key: number): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (key == p.key) {
                                        return p;
                                    }
                                    if (key > p.key) {
                                        if (p.getRight() != null) {
                                            p = p.getRight();
                                        } else {
                                            return p;
                                        }
                                    } else {
                                        if (p.getLeft() != null) {
                                            p = p.getLeft();
                                        } else {
                                            var parent: org.kevoree.modeling.api.time.rbtree.LongTreeNode = p.getParent();
                                            var ch: org.kevoree.modeling.api.time.rbtree.LongTreeNode = p;
                                            while (parent != null && ch == parent.getLeft()){
                                                ch = parent;
                                                parent = parent.getParent();
                                            }
                                            return parent;
                                        }
                                    }
                                }
                                return null;
                            }

                            public nextOrEqual(key: number): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (key == p.key) {
                                        return p;
                                    }
                                    if (key < p.key) {
                                        if (p.getLeft() != null) {
                                            p = p.getLeft();
                                        } else {
                                            return p;
                                        }
                                    } else {
                                        if (p.getRight() != null) {
                                            p = p.getRight();
                                        } else {
                                            var parent: org.kevoree.modeling.api.time.rbtree.LongTreeNode = p.getParent();
                                            var ch: org.kevoree.modeling.api.time.rbtree.LongTreeNode = p;
                                            while (parent != null && ch == parent.getRight()){
                                                ch = parent;
                                                parent = parent.getParent();
                                            }
                                            return parent;
                                        }
                                    }
                                }
                                return null;
                            }

                            public previous(key: number): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (key < p.key) {
                                        if (p.getLeft() != null) {
                                            p = p.getLeft();
                                        } else {
                                            return p.previous();
                                        }
                                    } else {
                                        if (key > p.key) {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            } else {
                                                return p;
                                            }
                                        } else {
                                            return p.previous();
                                        }
                                    }
                                }
                                return null;
                            }

                            public previousWhileNot(key: number, until: number): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var elm: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.previousOrEqual(key);
                                if (elm.value == until) {
                                    return null;
                                } else {
                                    if (elm.key == key) {
                                        elm = elm.previous();
                                    }
                                }
                                if (elm == null || elm.value == until) {
                                    return null;
                                } else {
                                    return elm;
                                }
                            }

                            public next(key: number): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (key < p.key) {
                                        if (p.getLeft() != null) {
                                            p = p.getLeft();
                                        } else {
                                            return p;
                                        }
                                    } else {
                                        if (key > p.key) {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            } else {
                                                return p.next();
                                            }
                                        } else {
                                            return p.next();
                                        }
                                    }
                                }
                                return null;
                            }

                            public nextWhileNot(key: number, until: number): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var elm: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.nextOrEqual(key);
                                if (elm.value == until) {
                                    return null;
                                } else {
                                    if (elm.key == key) {
                                        elm = elm.next();
                                    }
                                }
                                if (elm == null || elm.value == until) {
                                    return null;
                                } else {
                                    return elm;
                                }
                            }

                            public first(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (p.getLeft() != null) {
                                        p = p.getLeft();
                                    } else {
                                        return p;
                                    }
                                }
                                return null;
                            }

                            public last(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (p.getRight() != null) {
                                        p = p.getRight();
                                    } else {
                                        return p;
                                    }
                                }
                                return null;
                            }

                            public firstWhileNot(key: number, until: number): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var elm: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.previousOrEqual(key);
                                if (elm == null) {
                                    return null;
                                } else {
                                    if (elm.value == until) {
                                        return null;
                                    }
                                }
                                var prev: org.kevoree.modeling.api.time.rbtree.LongTreeNode = null;
                                do {
                                    prev = elm.previous();
                                    if (prev == null || prev.value == until) {
                                        return elm;
                                    } else {
                                        elm = prev;
                                    }
                                } while (elm != null)
                                return prev;
                            }

                            public lastWhileNot(key: number, until: number): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var elm: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.previousOrEqual(key);
                                if (elm == null) {
                                    return null;
                                } else {
                                    if (elm.value == until) {
                                        return null;
                                    }
                                }
                                var next: org.kevoree.modeling.api.time.rbtree.LongTreeNode;
                                do {
                                    next = elm.next();
                                    if (next == null || next.value == until) {
                                        return elm;
                                    } else {
                                        elm = next;
                                    }
                                } while (elm != null)
                                return next;
                            }

                            private lookupNode(key: number): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var n: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
                                if (n == null) {
                                    return null;
                                }
                                while (n != null){
                                    if (key == n.key) {
                                        return n;
                                    } else {
                                        if (key < n.key) {
                                            n = n.getLeft();
                                        } else {
                                            n = n.getRight();
                                        }
                                    }
                                }
                                return n;
                            }

                            public lookup(key: number): number {
                                var n: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.lookupNode(key);
                                if (n == null) {
                                    return null;
                                } else {
                                    return n.value;
                                }
                            }

                            private rotateLeft(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                var r: org.kevoree.modeling.api.time.rbtree.LongTreeNode = n.getRight();
                                this.replaceNode(n, r);
                                n.setRight(r.getLeft());
                                if (r.getLeft() != null) {
                                    r.getLeft().setParent(n);
                                }
                                r.setLeft(n);
                                n.setParent(r);
                            }

                            private rotateRight(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                var l: org.kevoree.modeling.api.time.rbtree.LongTreeNode = n.getLeft();
                                this.replaceNode(n, l);
                                n.setLeft(l.getRight());
                                if (l.getRight() != null) {
                                    l.getRight().setParent(n);
                                }
                                l.setRight(n);
                                n.setParent(l);
                            }

                            private replaceNode(oldn: org.kevoree.modeling.api.time.rbtree.LongTreeNode, newn: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                if (oldn.getParent() == null) {
                                    this.root = newn;
                                } else {
                                    if (oldn == oldn.getParent().getLeft()) {
                                        oldn.getParent().setLeft(newn);
                                    } else {
                                        oldn.getParent().setRight(newn);
                                    }
                                }
                                if (newn != null) {
                                    newn.setParent(oldn.getParent());
                                }
                            }

                            public insert(key: number, value: number): void {
                                this.dirty = true;
                                var insertedNode: org.kevoree.modeling.api.time.rbtree.LongTreeNode = new org.kevoree.modeling.api.time.rbtree.LongTreeNode(key, value, org.kevoree.modeling.api.time.rbtree.Color.RED, null, null);
                                if (this.root == null) {
                                    this._size++;
                                    this.root = insertedNode;
                                } else {
                                    var n: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.root;
                                    while (true){
                                        if (key == n.key) {
                                            n.value = value;
                                            return;
                                        } else {
                                            if (key < n.key) {
                                                if (n.getLeft() == null) {
                                                    n.setLeft(insertedNode);
                                                    this._size++;
                                                    break;
                                                } else {
                                                    n = n.getLeft();
                                                }
                                            } else {
                                                if (n.getRight() == null) {
                                                    n.setRight(insertedNode);
                                                    this._size++;
                                                    break;
                                                } else {
                                                    n = n.getRight();
                                                }
                                            }
                                        }
                                    }
                                    insertedNode.setParent(n);
                                }
                                this.insertCase1(insertedNode);
                            }

                            private insertCase1(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                if (n.getParent() == null) {
                                    n.color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                } else {
                                    this.insertCase2(n);
                                }
                            }

                            private insertCase2(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    return;
                                } else {
                                    this.insertCase3(n);
                                }
                            }

                            private insertCase3(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                if (this.nodeColor(n.uncle()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    n.uncle().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    this.insertCase1(n.grandparent());
                                } else {
                                    this.insertCase4(n);
                                }
                            }

                            private insertCase4(n_n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                var n: org.kevoree.modeling.api.time.rbtree.LongTreeNode = n_n;
                                if (n == n.getParent().getRight() && n.getParent() == n.grandparent().getLeft()) {
                                    this.rotateLeft(n.getParent());
                                    n = n.getLeft();
                                } else {
                                    if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getRight()) {
                                        this.rotateRight(n.getParent());
                                        n = n.getRight();
                                    }
                                }
                                this.insertCase5(n);
                            }

                            private insertCase5(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
                                    this.rotateRight(n.grandparent());
                                } else {
                                    this.rotateLeft(n.grandparent());
                                }
                            }

                            public delete(key: number): void {
                                var n: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this.lookupNode(key);
                                if (n == null) {
                                    return;
                                } else {
                                    this._size--;
                                    if (n.getLeft() != null && n.getRight() != null) {
                                        var pred: org.kevoree.modeling.api.time.rbtree.LongTreeNode = n.getLeft();
                                        while (pred.getRight() != null){
                                            pred = pred.getRight();
                                        }
                                        n.key = pred.key;
                                        n.value = pred.value;
                                        n = pred;
                                    }
                                    var child: org.kevoree.modeling.api.time.rbtree.LongTreeNode;
                                    if (n.getRight() == null) {
                                        child = n.getLeft();
                                    } else {
                                        child = n.getRight();
                                    }
                                    if (this.nodeColor(n) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        n.color = this.nodeColor(child);
                                        this.deleteCase1(n);
                                    }
                                    this.replaceNode(n, child);
                                }
                            }

                            private deleteCase1(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                if (n.getParent() == null) {
                                    return;
                                } else {
                                    this.deleteCase2(n);
                                }
                            }

                            private deleteCase2(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                if (this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    if (n == n.getParent().getLeft()) {
                                        this.rotateLeft(n.getParent());
                                    } else {
                                        this.rotateRight(n.getParent());
                                    }
                                }
                                this.deleteCase3(n);
                            }

                            private deleteCase3(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    this.deleteCase1(n.getParent());
                                } else {
                                    this.deleteCase4(n);
                                }
                            }

                            private deleteCase4(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                } else {
                                    this.deleteCase5(n);
                                }
                            }

                            private deleteCase5(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateRight(n.sibling());
                                } else {
                                    if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                        n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                        this.rotateLeft(n.sibling());
                                    }
                                }
                                this.deleteCase6(n);
                            }

                            private deleteCase6(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                n.sibling().color = this.nodeColor(n.getParent());
                                n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                if (n == n.getParent().getLeft()) {
                                    n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateLeft(n.getParent());
                                } else {
                                    n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateRight(n.getParent());
                                }
                            }

                            private nodeColor(n: org.kevoree.modeling.api.time.rbtree.LongTreeNode): org.kevoree.modeling.api.time.rbtree.Color {
                                if (n == null) {
                                    return org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                } else {
                                    return n.color;
                                }
                            }

                        }

                        export class LongTreeNode {

                            public static BLACK: string = '0';
                            public static RED: string = '2';
                            public key: number;
                            public value: number;
                            public color: org.kevoree.modeling.api.time.rbtree.Color;
                            private left: org.kevoree.modeling.api.time.rbtree.LongTreeNode;
                            private right: org.kevoree.modeling.api.time.rbtree.LongTreeNode;
                            private parent: org.kevoree.modeling.api.time.rbtree.LongTreeNode = null;
                            constructor(key: number, value: number, color: org.kevoree.modeling.api.time.rbtree.Color, left: org.kevoree.modeling.api.time.rbtree.LongTreeNode, right: org.kevoree.modeling.api.time.rbtree.LongTreeNode) {
                                this.key = key;
                                this.value = value;
                                this.color = color;
                                this.left = left;
                                this.right = right;
                                if (left != null) {
                                    left.parent = this;
                                }
                                if (right != null) {
                                    right.parent = this;
                                }
                                this.parent = null;
                            }

                            public grandparent(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                if (this.parent != null) {
                                    return this.parent.parent;
                                } else {
                                    return null;
                                }
                            }

                            public sibling(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                if (this.parent == null) {
                                    return null;
                                } else {
                                    if (this == this.parent.left) {
                                        return this.parent.right;
                                    } else {
                                        return this.parent.left;
                                    }
                                }
                            }

                            public uncle(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                if (this.parent != null) {
                                    return this.parent.sibling();
                                } else {
                                    return null;
                                }
                            }

                            public getLeft(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                return this.left;
                            }

                            public setLeft(left: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                this.left = left;
                            }

                            public getRight(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                return this.right;
                            }

                            public setRight(right: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                this.right = right;
                            }

                            public getParent(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                return this.parent;
                            }

                            public setParent(parent: org.kevoree.modeling.api.time.rbtree.LongTreeNode): void {
                                this.parent = parent;
                            }

                            public serialize(builder: java.lang.StringBuilder): void {
                                builder.append("|");
                                if (this.color == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    builder.append(LongTreeNode.BLACK);
                                } else {
                                    builder.append(LongTreeNode.RED);
                                }
                                builder.append(this.key);
                                builder.append("@");
                                builder.append(this.value);
                                if (this.left == null && this.right == null) {
                                    builder.append("%");
                                } else {
                                    if (this.left != null) {
                                        this.left.serialize(builder);
                                    } else {
                                        builder.append("#");
                                    }
                                    if (this.right != null) {
                                        this.right.serialize(builder);
                                    } else {
                                        builder.append("#");
                                    }
                                }
                            }

                            public next(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this;
                                if (p.right != null) {
                                    p = p.right;
                                    while (p.left != null){
                                        p = p.left;
                                    }
                                    return p;
                                } else {
                                    if (p.parent != null) {
                                        if (p == p.parent.left) {
                                            return p.parent;
                                        } else {
                                            while (p.parent != null && p == p.parent.right){
                                                p = p.parent;
                                            }
                                            return p.parent;
                                        }
                                    } else {
                                        return null;
                                    }
                                }
                            }

                            public previous(): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = this;
                                if (p.left != null) {
                                    p = p.left;
                                    while (p.right != null){
                                        p = p.right;
                                    }
                                    return p;
                                } else {
                                    if (p.parent != null) {
                                        if (p == p.parent.right) {
                                            return p.parent;
                                        } else {
                                            while (p.parent != null && p == p.parent.left){
                                                p = p.parent;
                                            }
                                            return p.parent;
                                        }
                                    } else {
                                        return null;
                                    }
                                }
                            }

                            public static unserialize(ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                return org.kevoree.modeling.api.time.rbtree.LongTreeNode.internal_unserialize(true, ctx);
                            }

                            public static internal_unserialize(rightBranch: boolean, ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext): org.kevoree.modeling.api.time.rbtree.LongTreeNode {
                                if (ctx.index >= ctx.payload.length) {
                                    return null;
                                }
                                var ch: string = ctx.payload.charAt(ctx.index);
                                if (ch == '%') {
                                    if (rightBranch) {
                                        ctx.index = ctx.index + 1;
                                    }
                                    return null;
                                }
                                if (ch == '#') {
                                    ctx.index = ctx.index + 1;
                                    return null;
                                }
                                if (ch != '|') {
                                    throw new java.lang.Exception("Error while loading BTree");
                                }
                                ctx.index = ctx.index + 1;
                                ch = ctx.payload.charAt(ctx.index);
                                var color: org.kevoree.modeling.api.time.rbtree.Color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                if (ch == LongTreeNode.RED) {
                                    color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                }
                                ctx.index = ctx.index + 1;
                                ch = ctx.payload.charAt(ctx.index);
                                var i: number = 0;
                                while (ctx.index + 1 < ctx.payload.length && ch != '|' && ch != '#' && ch != '%' && ch != '@'){
                                    ctx.buffer[i] = ch;
                                    i++;
                                    ctx.index = ctx.index + 1;
                                    ch = ctx.payload.charAt(ctx.index);
                                }
                                if (ch != '|' && ch != '#' && ch != '%' && ch != '@') {
                                    ctx.buffer[i] = ch;
                                    i++;
                                }
                                var key: number = java.lang.Long.parseLong(StringUtils.copyValueOf(ctx.buffer, 0, i));
                                i = 0;
                                ctx.index = ctx.index + 1;
                                ch = ctx.payload.charAt(ctx.index);
                                while (ctx.index + 1 < ctx.payload.length && ch != '|' && ch != '#' && ch != '%' && ch != '@'){
                                    ctx.buffer[i] = ch;
                                    i++;
                                    ctx.index = ctx.index + 1;
                                    ch = ctx.payload.charAt(ctx.index);
                                }
                                if (ch != '|' && ch != '#' && ch != '%' && ch != '@') {
                                    ctx.buffer[i] = ch;
                                    i++;
                                }
                                var value: number = java.lang.Long.parseLong(StringUtils.copyValueOf(ctx.buffer, 0, i));
                                var p: org.kevoree.modeling.api.time.rbtree.LongTreeNode = new org.kevoree.modeling.api.time.rbtree.LongTreeNode(key, value, color, null, null);
                                var left: org.kevoree.modeling.api.time.rbtree.LongTreeNode = org.kevoree.modeling.api.time.rbtree.LongTreeNode.internal_unserialize(false, ctx);
                                if (left != null) {
                                    left.setParent(p);
                                }
                                var right: org.kevoree.modeling.api.time.rbtree.LongTreeNode = org.kevoree.modeling.api.time.rbtree.LongTreeNode.internal_unserialize(true, ctx);
                                if (right != null) {
                                    right.setParent(p);
                                }
                                p.setLeft(left);
                                p.setRight(right);
                                return p;
                            }

                        }

                        export class RBTree {

                            public root: org.kevoree.modeling.api.time.rbtree.TreeNode = null;
                            private _size: number = 0;
                            public size(): number {
                                return this._size;
                            }

                            public serialize(): string {
                                var builder: java.lang.StringBuilder = new java.lang.StringBuilder();
                                builder.append(this._size);
                                if (this.root != null) {
                                    this.root.serialize(builder);
                                }
                                return builder.toString();
                            }

                            public unserialize(payload: string): void {
                                if (payload == null || payload.length == 0) {
                                    return;
                                }
                                var i: number = 0;
                                var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                                var ch: string = payload.charAt(i);
                                while (i < payload.length && ch != '|'){
                                    buffer.append(ch);
                                    i = i + 1;
                                    ch = payload.charAt(i);
                                }
                                this._size = java.lang.Integer.parseInt(buffer.toString());
                                var ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext = new org.kevoree.modeling.api.time.rbtree.TreeReaderContext();
                                ctx.index = i;
                                ctx.payload = payload;
                                this.root = org.kevoree.modeling.api.time.rbtree.TreeNode.unserialize(ctx);
                            }

                            public previousOrEqual(key: number): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (key == p.key) {
                                        return p;
                                    }
                                    if (key > p.key) {
                                        if (p.getRight() != null) {
                                            p = p.getRight();
                                        } else {
                                            return p;
                                        }
                                    } else {
                                        if (p.getLeft() != null) {
                                            p = p.getLeft();
                                        } else {
                                            var parent: org.kevoree.modeling.api.time.rbtree.TreeNode = p.getParent();
                                            var ch: org.kevoree.modeling.api.time.rbtree.TreeNode = p;
                                            while (parent != null && ch == parent.getLeft()){
                                                ch = parent;
                                                parent = parent.getParent();
                                            }
                                            return parent;
                                        }
                                    }
                                }
                                return null;
                            }

                            public nextOrEqual(key: number): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (key == p.key) {
                                        return p;
                                    }
                                    if (key < p.key) {
                                        if (p.getLeft() != null) {
                                            p = p.getLeft();
                                        } else {
                                            return p;
                                        }
                                    } else {
                                        if (p.getRight() != null) {
                                            p = p.getRight();
                                        } else {
                                            var parent: org.kevoree.modeling.api.time.rbtree.TreeNode = p.getParent();
                                            var ch: org.kevoree.modeling.api.time.rbtree.TreeNode = p;
                                            while (parent != null && ch == parent.getRight()){
                                                ch = parent;
                                                parent = parent.getParent();
                                            }
                                            return parent;
                                        }
                                    }
                                }
                                return null;
                            }

                            public previous(key: number): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (key < p.key) {
                                        if (p.getLeft() != null) {
                                            p = p.getLeft();
                                        } else {
                                            return p.previous();
                                        }
                                    } else {
                                        if (key > p.key) {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            } else {
                                                return p;
                                            }
                                        } else {
                                            return p.previous();
                                        }
                                    }
                                }
                                return null;
                            }

                            public previousWhileNot(key: number, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var elm: org.kevoree.modeling.api.time.rbtree.TreeNode = this.previousOrEqual(key);
                                if (elm.value.equals(until)) {
                                    return null;
                                } else {
                                    if (elm.key == key) {
                                        elm = elm.previous();
                                    }
                                }
                                if (elm == null || elm.value.equals(until)) {
                                    return null;
                                } else {
                                    return elm;
                                }
                            }

                            public next(key: number): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (key < p.key) {
                                        if (p.getLeft() != null) {
                                            p = p.getLeft();
                                        } else {
                                            return p;
                                        }
                                    } else {
                                        if (key > p.key) {
                                            if (p.getRight() != null) {
                                                p = p.getRight();
                                            } else {
                                                return p.next();
                                            }
                                        } else {
                                            return p.next();
                                        }
                                    }
                                }
                                return null;
                            }

                            public nextWhileNot(key: number, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var elm: org.kevoree.modeling.api.time.rbtree.TreeNode = this.nextOrEqual(key);
                                if (elm.value.equals(until)) {
                                    return null;
                                } else {
                                    if (elm.key == key) {
                                        elm = elm.next();
                                    }
                                }
                                if (elm == null || elm.value.equals(until)) {
                                    return null;
                                } else {
                                    return elm;
                                }
                            }

                            public first(): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (p.getLeft() != null) {
                                        p = p.getLeft();
                                    } else {
                                        return p;
                                    }
                                }
                                return null;
                            }

                            public last(): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
                                if (p == null) {
                                    return null;
                                }
                                while (p != null){
                                    if (p.getRight() != null) {
                                        p = p.getRight();
                                    } else {
                                        return p;
                                    }
                                }
                                return null;
                            }

                            public firstWhileNot(key: number, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var elm: org.kevoree.modeling.api.time.rbtree.TreeNode = this.previousOrEqual(key);
                                if (elm == null) {
                                    return null;
                                } else {
                                    if (elm.value.equals(until)) {
                                        return null;
                                    }
                                }
                                var prev: org.kevoree.modeling.api.time.rbtree.TreeNode = null;
                                do {
                                    prev = elm.previous();
                                    if (prev == null || prev.value.equals(until)) {
                                        return elm;
                                    } else {
                                        elm = prev;
                                    }
                                } while (elm != null)
                                return prev;
                            }

                            public lastWhileNot(key: number, until: org.kevoree.modeling.api.time.rbtree.State): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var elm: org.kevoree.modeling.api.time.rbtree.TreeNode = this.previousOrEqual(key);
                                if (elm == null) {
                                    return null;
                                } else {
                                    if (elm.value.equals(until)) {
                                        return null;
                                    }
                                }
                                var next: org.kevoree.modeling.api.time.rbtree.TreeNode;
                                do {
                                    next = elm.next();
                                    if (next == null || next.value.equals(until)) {
                                        return elm;
                                    } else {
                                        elm = next;
                                    }
                                } while (elm != null)
                                return next;
                            }

                            private lookupNode(key: number): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var n: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
                                if (n == null) {
                                    return null;
                                }
                                while (n != null){
                                    if (key == n.key) {
                                        return n;
                                    } else {
                                        if (key < n.key) {
                                            n = n.getLeft();
                                        } else {
                                            n = n.getRight();
                                        }
                                    }
                                }
                                return n;
                            }

                            public lookup(key: number): org.kevoree.modeling.api.time.rbtree.State {
                                var n: org.kevoree.modeling.api.time.rbtree.TreeNode = this.lookupNode(key);
                                if (n == null) {
                                    return null;
                                } else {
                                    return n.value;
                                }
                            }

                            private rotateLeft(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                var r: org.kevoree.modeling.api.time.rbtree.TreeNode = n.getRight();
                                this.replaceNode(n, r);
                                n.setRight(r.getLeft());
                                if (r.getLeft() != null) {
                                    r.getLeft().setParent(n);
                                }
                                r.setLeft(n);
                                n.setParent(r);
                            }

                            private rotateRight(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                var l: org.kevoree.modeling.api.time.rbtree.TreeNode = n.getLeft();
                                this.replaceNode(n, l);
                                n.setLeft(l.getRight());
                                if (l.getRight() != null) {
                                    l.getRight().setParent(n);
                                }
                                l.setRight(n);
                                n.setParent(l);
                            }

                            private replaceNode(oldn: org.kevoree.modeling.api.time.rbtree.TreeNode, newn: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                if (oldn.getParent() == null) {
                                    this.root = newn;
                                } else {
                                    if (oldn == oldn.getParent().getLeft()) {
                                        oldn.getParent().setLeft(newn);
                                    } else {
                                        oldn.getParent().setRight(newn);
                                    }
                                }
                                if (newn != null) {
                                    newn.setParent(oldn.getParent());
                                }
                            }

                            public insert(key: number, value: org.kevoree.modeling.api.time.rbtree.State): void {
                                var insertedNode: org.kevoree.modeling.api.time.rbtree.TreeNode = new org.kevoree.modeling.api.time.rbtree.TreeNode(key, value, org.kevoree.modeling.api.time.rbtree.Color.RED, null, null);
                                if (this.root == null) {
                                    this._size++;
                                    this.root = insertedNode;
                                } else {
                                    var n: org.kevoree.modeling.api.time.rbtree.TreeNode = this.root;
                                    while (true){
                                        if (key == n.key) {
                                            n.value = value;
                                            return;
                                        } else {
                                            if (key < n.key) {
                                                if (n.getLeft() == null) {
                                                    n.setLeft(insertedNode);
                                                    this._size++;
                                                    break;
                                                } else {
                                                    n = n.getLeft();
                                                }
                                            } else {
                                                if (n.getRight() == null) {
                                                    n.setRight(insertedNode);
                                                    this._size++;
                                                    break;
                                                } else {
                                                    n = n.getRight();
                                                }
                                            }
                                        }
                                    }
                                    insertedNode.setParent(n);
                                }
                                this.insertCase1(insertedNode);
                            }

                            private insertCase1(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                if (n.getParent() == null) {
                                    n.color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                } else {
                                    this.insertCase2(n);
                                }
                            }

                            private insertCase2(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    return;
                                } else {
                                    this.insertCase3(n);
                                }
                            }

                            private insertCase3(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                if (this.nodeColor(n.uncle()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    n.uncle().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    this.insertCase1(n.grandparent());
                                } else {
                                    this.insertCase4(n);
                                }
                            }

                            private insertCase4(n_n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                var n: org.kevoree.modeling.api.time.rbtree.TreeNode = n_n;
                                if (n == n.getParent().getRight() && n.getParent() == n.grandparent().getLeft()) {
                                    this.rotateLeft(n.getParent());
                                    n = n.getLeft();
                                } else {
                                    if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getRight()) {
                                        this.rotateRight(n.getParent());
                                        n = n.getRight();
                                    }
                                }
                                this.insertCase5(n);
                            }

                            private insertCase5(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                n.grandparent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
                                    this.rotateRight(n.grandparent());
                                } else {
                                    this.rotateLeft(n.grandparent());
                                }
                            }

                            public delete(key: number): void {
                                var n: org.kevoree.modeling.api.time.rbtree.TreeNode = this.lookupNode(key);
                                if (n == null) {
                                    return;
                                } else {
                                    this._size--;
                                    if (n.getLeft() != null && n.getRight() != null) {
                                        var pred: org.kevoree.modeling.api.time.rbtree.TreeNode = n.getLeft();
                                        while (pred.getRight() != null){
                                            pred = pred.getRight();
                                        }
                                        n.key = pred.key;
                                        n.value = pred.value;
                                        n = pred;
                                    }
                                    var child: org.kevoree.modeling.api.time.rbtree.TreeNode;
                                    if (n.getRight() == null) {
                                        child = n.getLeft();
                                    } else {
                                        child = n.getRight();
                                    }
                                    if (this.nodeColor(n) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        n.color = this.nodeColor(child);
                                        this.deleteCase1(n);
                                    }
                                    this.replaceNode(n, child);
                                }
                            }

                            private deleteCase1(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                if (n.getParent() == null) {
                                    return;
                                } else {
                                    this.deleteCase2(n);
                                }
                            }

                            private deleteCase2(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                if (this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.RED) {
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    if (n == n.getParent().getLeft()) {
                                        this.rotateLeft(n.getParent());
                                    } else {
                                        this.rotateRight(n.getParent());
                                    }
                                }
                                this.deleteCase3(n);
                            }

                            private deleteCase3(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    this.deleteCase1(n.getParent());
                                } else {
                                    this.deleteCase4(n);
                                }
                            }

                            private deleteCase4(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                if (this.nodeColor(n.getParent()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                } else {
                                    this.deleteCase5(n);
                                }
                            }

                            private deleteCase5(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                    n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateRight(n.sibling());
                                } else {
                                    if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK && this.nodeColor(n.sibling().getRight()) == org.kevoree.modeling.api.time.rbtree.Color.RED && this.nodeColor(n.sibling().getLeft()) == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        n.sibling().color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                        n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                        this.rotateLeft(n.sibling());
                                    }
                                }
                                this.deleteCase6(n);
                            }

                            private deleteCase6(n: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                n.sibling().color = this.nodeColor(n.getParent());
                                n.getParent().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                if (n == n.getParent().getLeft()) {
                                    n.sibling().getRight().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateLeft(n.getParent());
                                } else {
                                    n.sibling().getLeft().color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    this.rotateRight(n.getParent());
                                }
                            }

                            private nodeColor(n: org.kevoree.modeling.api.time.rbtree.TreeNode): org.kevoree.modeling.api.time.rbtree.Color {
                                if (n == null) {
                                    return org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                } else {
                                    return n.color;
                                }
                            }

                        }

                        export class State {

                            public static EXISTS: State = new State();
                            public static DELETED: State = new State();
                            public equals(other: any): boolean {
                                return this == other;
                            }
                            public static _StateVALUES : State[] = [
                                State.EXISTS
                                ,State.DELETED
                            ];
                            public static values():State[]{
                                return State._StateVALUES;
                            }
                        }

                        export class TreeNode {

                            public static BLACK_DELETE: string = '0';
                            public static BLACK_EXISTS: string = '1';
                            public static RED_DELETE: string = '2';
                            public static RED_EXISTS: string = '3';
                            public key: number;
                            public value: org.kevoree.modeling.api.time.rbtree.State;
                            public color: org.kevoree.modeling.api.time.rbtree.Color;
                            private left: org.kevoree.modeling.api.time.rbtree.TreeNode;
                            private right: org.kevoree.modeling.api.time.rbtree.TreeNode;
                            private parent: org.kevoree.modeling.api.time.rbtree.TreeNode = null;
                            public getKey(): number {
                                return this.key;
                            }

                            constructor(key: number, value: org.kevoree.modeling.api.time.rbtree.State, color: org.kevoree.modeling.api.time.rbtree.Color, left: org.kevoree.modeling.api.time.rbtree.TreeNode, right: org.kevoree.modeling.api.time.rbtree.TreeNode) {
                                this.key = key;
                                this.value = value;
                                this.color = color;
                                this.left = left;
                                this.right = right;
                                if (left != null) {
                                    left.parent = this;
                                }
                                if (right != null) {
                                    right.parent = this;
                                }
                                this.parent = null;
                            }

                            public grandparent(): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                if (this.parent != null) {
                                    return this.parent.parent;
                                } else {
                                    return null;
                                }
                            }

                            public sibling(): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                if (this.parent == null) {
                                    return null;
                                } else {
                                    if (this == this.parent.left) {
                                        return this.parent.right;
                                    } else {
                                        return this.parent.left;
                                    }
                                }
                            }

                            public uncle(): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                if (this.parent != null) {
                                    return this.parent.sibling();
                                } else {
                                    return null;
                                }
                            }

                            public getLeft(): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                return this.left;
                            }

                            public setLeft(left: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                this.left = left;
                            }

                            public getRight(): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                return this.right;
                            }

                            public setRight(right: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                this.right = right;
                            }

                            public getParent(): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                return this.parent;
                            }

                            public setParent(parent: org.kevoree.modeling.api.time.rbtree.TreeNode): void {
                                this.parent = parent;
                            }

                            public serialize(builder: java.lang.StringBuilder): void {
                                builder.append("|");
                                if (this.value == org.kevoree.modeling.api.time.rbtree.State.DELETED) {
                                    if (this.color == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        builder.append(TreeNode.BLACK_DELETE);
                                    } else {
                                        builder.append(TreeNode.RED_DELETE);
                                    }
                                } else {
                                    if (this.color == org.kevoree.modeling.api.time.rbtree.Color.BLACK) {
                                        builder.append(TreeNode.BLACK_EXISTS);
                                    } else {
                                        builder.append(TreeNode.RED_EXISTS);
                                    }
                                }
                                builder.append(this.key);
                                if (this.left == null && this.right == null) {
                                    builder.append("%");
                                } else {
                                    if (this.left != null) {
                                        this.left.serialize(builder);
                                    } else {
                                        builder.append("#");
                                    }
                                    if (this.right != null) {
                                        this.right.serialize(builder);
                                    } else {
                                        builder.append("#");
                                    }
                                }
                            }

                            public next(): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this;
                                if (p.right != null) {
                                    p = p.right;
                                    while (p.left != null){
                                        p = p.left;
                                    }
                                    return p;
                                } else {
                                    if (p.parent != null) {
                                        if (p == p.parent.left) {
                                            return p.parent;
                                        } else {
                                            while (p.parent != null && p == p.parent.right){
                                                p = p.parent;
                                            }
                                            return p.parent;
                                        }
                                    } else {
                                        return null;
                                    }
                                }
                            }

                            public previous(): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                var p: org.kevoree.modeling.api.time.rbtree.TreeNode = this;
                                if (p.left != null) {
                                    p = p.left;
                                    while (p.right != null){
                                        p = p.right;
                                    }
                                    return p;
                                } else {
                                    if (p.parent != null) {
                                        if (p == p.parent.right) {
                                            return p.parent;
                                        } else {
                                            while (p.parent != null && p == p.parent.left){
                                                p = p.parent;
                                            }
                                            return p.parent;
                                        }
                                    } else {
                                        return null;
                                    }
                                }
                            }

                            public static unserialize(ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                return org.kevoree.modeling.api.time.rbtree.TreeNode.internal_unserialize(true, ctx);
                            }

                            public static internal_unserialize(rightBranch: boolean, ctx: org.kevoree.modeling.api.time.rbtree.TreeReaderContext): org.kevoree.modeling.api.time.rbtree.TreeNode {
                                if (ctx.index >= ctx.payload.length) {
                                    return null;
                                }
                                var tokenBuild: java.lang.StringBuilder = new java.lang.StringBuilder();
                                var ch: string = ctx.payload.charAt(ctx.index);
                                if (ch == '%') {
                                    if (rightBranch) {
                                        ctx.index = ctx.index + 1;
                                    }
                                    return null;
                                }
                                if (ch == '#') {
                                    ctx.index = ctx.index + 1;
                                    return null;
                                }
                                if (ch != '|') {
                                    throw new java.lang.Exception("Error while loading BTree");
                                }
                                ctx.index = ctx.index + 1;
                                ch = ctx.payload.charAt(ctx.index);
                                var color: org.kevoree.modeling.api.time.rbtree.Color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                var state: org.kevoree.modeling.api.time.rbtree.State = org.kevoree.modeling.api.time.rbtree.State.EXISTS;
                                switch (ch) {
                                    case org.kevoree.modeling.api.time.rbtree.TreeNode.BLACK_DELETE: 
                                    color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    state = org.kevoree.modeling.api.time.rbtree.State.DELETED;
                                    break;
                                    case org.kevoree.modeling.api.time.rbtree.TreeNode.BLACK_EXISTS: 
                                    color = org.kevoree.modeling.api.time.rbtree.Color.BLACK;
                                    state = org.kevoree.modeling.api.time.rbtree.State.EXISTS;
                                    break;
                                    case org.kevoree.modeling.api.time.rbtree.TreeNode.RED_DELETE: 
                                    color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    state = org.kevoree.modeling.api.time.rbtree.State.DELETED;
                                    break;
                                    case org.kevoree.modeling.api.time.rbtree.TreeNode.RED_EXISTS: 
                                    color = org.kevoree.modeling.api.time.rbtree.Color.RED;
                                    state = org.kevoree.modeling.api.time.rbtree.State.EXISTS;
                                    break;
                                }
                                ctx.index = ctx.index + 1;
                                ch = ctx.payload.charAt(ctx.index);
                                while (ctx.index + 1 < ctx.payload.length && ch != '|' && ch != '#' && ch != '%'){
                                    tokenBuild.append(ch);
                                    ctx.index = ctx.index + 1;
                                    ch = ctx.payload.charAt(ctx.index);
                                }
                                if (ch != '|' && ch != '#' && ch != '%') {
                                    tokenBuild.append(ch);
                                }
                                var p: org.kevoree.modeling.api.time.rbtree.TreeNode = new org.kevoree.modeling.api.time.rbtree.TreeNode(java.lang.Long.parseLong(tokenBuild.toString()), state, color, null, null);
                                var left: org.kevoree.modeling.api.time.rbtree.TreeNode = org.kevoree.modeling.api.time.rbtree.TreeNode.internal_unserialize(false, ctx);
                                if (left != null) {
                                    left.setParent(p);
                                }
                                var right: org.kevoree.modeling.api.time.rbtree.TreeNode = org.kevoree.modeling.api.time.rbtree.TreeNode.internal_unserialize(true, ctx);
                                if (right != null) {
                                    right.setParent(p);
                                }
                                p.setLeft(left);
                                p.setRight(right);
                                return p;
                            }

                        }

                        export class TreeReaderContext {

                            public payload: string;
                            public index: number;
                            public buffer: string[];
                        }

                    }
                    export interface TimeTree {

                        walk(walker: (p : number) => void): void;

                        walkAsc(walker: (p : number) => void): void;

                        walkDesc(walker: (p : number) => void): void;

                        walkRangeAsc(walker: (p : number) => void, from: number, to: number): void;

                        walkRangeDesc(walker: (p : number) => void, from: number, to: number): void;

                        first(): number;

                        last(): number;

                        next(from: number): number;

                        previous(from: number): number;

                        resolve(time: number): number;

                        insert(time: number): org.kevoree.modeling.api.time.TimeTree;

                        delete(time: number): org.kevoree.modeling.api.time.TimeTree;

                        isDirty(): boolean;

                        size(): number;

                    }

                    export interface TimeWalker {

                        walk(timePoint: number): void;

                    }

                }
                export module trace {
                    export class ModelAddTrace implements org.kevoree.modeling.api.trace.ModelTrace {

                        private reference: org.kevoree.modeling.api.meta.MetaReference;
                        private traceType: org.kevoree.modeling.api.KActionType = org.kevoree.modeling.api.KActionType.ADD;
                        private srcKID: number;
                        private previousKID: number;
                        private metaClass: org.kevoree.modeling.api.meta.MetaClass;
                        public getPreviousKID(): number {
                            return this.previousKID;
                        }

                        public getMetaClass(): org.kevoree.modeling.api.meta.MetaClass {
                            return this.metaClass;
                        }

                        constructor(srcKID: number, reference: org.kevoree.modeling.api.meta.MetaReference, previousKID: number, metaClass: org.kevoree.modeling.api.meta.MetaClass) {
                            this.srcKID = srcKID;
                            this.reference = reference;
                            this.previousKID = previousKID;
                            this.metaClass = metaClass;
                        }

                        public toString(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.openJSON);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.KActionType.ADD.toString());
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.src);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.srcKID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            if (this.reference != null) {
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(this.reference.metaName());
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            }
                            if (this.previousKID != null) {
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.previouspath);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.previousKID + "");
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            }
                            if (this.metaClass != null) {
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.typename);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.metaClass.metaName());
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            }
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
                            return buffer.toString();
                        }

                        public getMeta(): org.kevoree.modeling.api.meta.Meta {
                            return this.reference;
                        }

                        public getTraceType(): org.kevoree.modeling.api.KActionType {
                            return this.traceType;
                        }

                        public getSrcKID(): number {
                            return this.srcKID;
                        }

                    }

                    export class ModelRemoveTrace implements org.kevoree.modeling.api.trace.ModelTrace {

                        private traceType: org.kevoree.modeling.api.KActionType = org.kevoree.modeling.api.KActionType.REMOVE;
                        private srcKID: number;
                        private objKID: number;
                        private reference: org.kevoree.modeling.api.meta.MetaReference;
                        constructor(srcKID: number, reference: org.kevoree.modeling.api.meta.MetaReference, objKID: number) {
                            this.srcKID = srcKID;
                            this.reference = reference;
                            this.objKID = objKID;
                        }

                        public getObjKID(): number {
                            return this.objKID;
                        }

                        public getMeta(): org.kevoree.modeling.api.meta.Meta {
                            return this.reference;
                        }

                        public getTraceType(): org.kevoree.modeling.api.KActionType {
                            return this.traceType;
                        }

                        public getSrcKID(): number {
                            return this.srcKID;
                        }

                        public toString(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.openJSON);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.KActionType.REMOVE);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.src);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.srcKID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(this.reference.metaName());
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.objpath);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.objKID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
                            return buffer.toString();
                        }

                    }

                    export class ModelSetTrace implements org.kevoree.modeling.api.trace.ModelTrace {

                        private traceType: org.kevoree.modeling.api.KActionType = org.kevoree.modeling.api.KActionType.SET;
                        private srcKID: number;
                        private attribute: org.kevoree.modeling.api.meta.MetaAttribute;
                        private content: any;
                        constructor(srcKID: number, attribute: org.kevoree.modeling.api.meta.MetaAttribute, content: any) {
                            this.srcKID = srcKID;
                            this.attribute = attribute;
                            this.content = content;
                        }

                        public getTraceType(): org.kevoree.modeling.api.KActionType {
                            return this.traceType;
                        }

                        public getSrcKID(): number {
                            return this.srcKID;
                        }

                        public getMeta(): org.kevoree.modeling.api.meta.Meta {
                            return this.attribute;
                        }

                        public getContent(): any {
                            return this.content;
                        }

                        public toString(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.openJSON);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.KActionType.SET);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.src);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.srcKID + "");
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.meta);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            buffer.append(this.attribute.metaName());
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            if (this.content != null) {
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.coma);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.content);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.dp);
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                                org.kevoree.modeling.api.json.JsonString.encodeBuffer(buffer, this.content.toString());
                                buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.bb);
                            }
                            buffer.append(org.kevoree.modeling.api.trace.ModelTraceConstants.closeJSON);
                            return buffer.toString();
                        }

                    }

                    export interface ModelTrace {

                        getMeta(): org.kevoree.modeling.api.meta.Meta;

                        getTraceType(): org.kevoree.modeling.api.KActionType;

                        getSrcKID(): number;

                    }

                    export class ModelTraceApplicator {

                        private targetModel: org.kevoree.modeling.api.KObject<any, any>;
                        private pendingObj: org.kevoree.modeling.api.KObject<any, any> = null;
                        private pendingParent: org.kevoree.modeling.api.KObject<any, any> = null;
                        private pendingParentRef: org.kevoree.modeling.api.meta.MetaReference = null;
                        private pendingObjKID: number = null;
                        constructor(targetModel: org.kevoree.modeling.api.KObject<any, any>) {
                            this.targetModel = targetModel;
                        }

                        private tryClosePending(srcKID: number): void {
                            if (this.pendingObj != null && !(this.pendingObjKID.equals(srcKID))) {
                                this.pendingParent.mutate(org.kevoree.modeling.api.KActionType.ADD, this.pendingParentRef, this.pendingObj, true);
                                this.pendingObj = null;
                                this.pendingObjKID = null;
                                this.pendingParentRef = null;
                                this.pendingParent = null;
                            }
                        }

                        public createOrAdd(previousPath: number, target: org.kevoree.modeling.api.KObject<any, any>, reference: org.kevoree.modeling.api.meta.MetaReference, metaClass: org.kevoree.modeling.api.meta.MetaClass, callback: (p : java.lang.Throwable) => void): void {
                            if (previousPath != null) {
                                this.targetModel.view().lookup(previousPath,  (targetElem : org.kevoree.modeling.api.KObject<any, any>) => {
                                    if (targetElem != null) {
                                        target.mutate(org.kevoree.modeling.api.KActionType.ADD, reference, targetElem, true);
                                        callback(null);
                                    } else {
                                        if (metaClass == null) {
                                            callback(new java.lang.Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
                                        } else {
                                            this.pendingObj = this.targetModel.view().createFQN(metaClass.metaName());
                                            this.pendingObjKID = previousPath;
                                            this.pendingParentRef = reference;
                                            this.pendingParent = target;
                                            callback(null);
                                        }
                                    }
                                });
                            } else {
                                if (metaClass == null) {
                                    callback(new java.lang.Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
                                } else {
                                    this.pendingObj = this.targetModel.view().createFQN(metaClass.metaName());
                                    this.pendingObjKID = previousPath;
                                    this.pendingParentRef = reference;
                                    this.pendingParent = target;
                                    callback(null);
                                }
                            }
                        }

                        public applyTraceSequence(traceSeq: org.kevoree.modeling.api.trace.TraceSequence, callback: (p : java.lang.Throwable) => void): void {
                            org.kevoree.modeling.api.util.Helper.forall(traceSeq.traces(),  (modelTrace : org.kevoree.modeling.api.trace.ModelTrace, next : (p : java.lang.Throwable) => void) => {
                                this.applyTrace(modelTrace, next);
                            },  (throwable : java.lang.Throwable) => {
                                if (throwable != null) {
                                    callback(throwable);
                                } else {
                                    this.tryClosePending(null);
                                    callback(null);
                                }
                            });
                        }

                        public applyTrace(trace: org.kevoree.modeling.api.trace.ModelTrace, callback: (p : java.lang.Throwable) => void): void {
                            if (trace instanceof org.kevoree.modeling.api.trace.ModelAddTrace) {
                                var addTrace: org.kevoree.modeling.api.trace.ModelAddTrace = <org.kevoree.modeling.api.trace.ModelAddTrace>trace;
                                this.tryClosePending(null);
                                this.targetModel.view().lookup(trace.getSrcKID(),  (resolvedTarget : org.kevoree.modeling.api.KObject<any, any>) => {
                                    if (resolvedTarget == null) {
                                        callback(new java.lang.Exception("Add Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
                                    } else {
                                        this.createOrAdd(addTrace.getPreviousKID(), resolvedTarget, <org.kevoree.modeling.api.meta.MetaReference>trace.getMeta(), addTrace.getMetaClass(), callback);
                                    }
                                });
                            } else {
                                if (trace instanceof org.kevoree.modeling.api.trace.ModelRemoveTrace) {
                                    var removeTrace: org.kevoree.modeling.api.trace.ModelRemoveTrace = <org.kevoree.modeling.api.trace.ModelRemoveTrace>trace;
                                    this.tryClosePending(trace.getSrcKID());
                                    this.targetModel.view().lookup(trace.getSrcKID(),  (targetElem : org.kevoree.modeling.api.KObject<any, any>) => {
                                        if (targetElem != null) {
                                            this.targetModel.view().lookup(removeTrace.getObjKID(),  (remoteObj : org.kevoree.modeling.api.KObject<any, any>) => {
                                                targetElem.mutate(org.kevoree.modeling.api.KActionType.REMOVE, <org.kevoree.modeling.api.meta.MetaReference>trace.getMeta(), remoteObj, true);
                                                callback(null);
                                            });
                                        } else {
                                            callback(null);
                                        }
                                    });
                                } else {
                                    if (trace instanceof org.kevoree.modeling.api.trace.ModelSetTrace) {
                                        var setTrace: org.kevoree.modeling.api.trace.ModelSetTrace = <org.kevoree.modeling.api.trace.ModelSetTrace>trace;
                                        this.tryClosePending(trace.getSrcKID());
                                        if (!trace.getSrcKID().equals(this.pendingObjKID)) {
                                            this.targetModel.view().lookup(trace.getSrcKID(),  (tempObject : org.kevoree.modeling.api.KObject<any, any>) => {
                                                if (tempObject == null) {
                                                    callback(new java.lang.Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
                                                } else {
                                                    tempObject.set(<org.kevoree.modeling.api.meta.MetaAttribute>setTrace.getMeta(), setTrace.getContent());
                                                    callback(null);
                                                }
                                            });
                                        } else {
                                            if (this.pendingObj == null) {
                                                callback(new java.lang.Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
                                            } else {
                                                this.pendingObj.set(<org.kevoree.modeling.api.meta.MetaAttribute>setTrace.getMeta(), setTrace.getContent());
                                                callback(null);
                                            }
                                        }
                                    } else {
                                        callback(new java.lang.Exception("Unknow trace " + trace));
                                    }
                                }
                            }
                        }

                    }

                    export class ModelTraceConstants {

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

                        public equals(other: any): boolean {
                            return this == other;
                        }
                        public static _ModelTraceConstantsVALUES : ModelTraceConstants[] = [
                            ModelTraceConstants.traceType
                            ,ModelTraceConstants.src
                            ,ModelTraceConstants.meta
                            ,ModelTraceConstants.previouspath
                            ,ModelTraceConstants.typename
                            ,ModelTraceConstants.objpath
                            ,ModelTraceConstants.content
                            ,ModelTraceConstants.openJSON
                            ,ModelTraceConstants.closeJSON
                            ,ModelTraceConstants.bb
                            ,ModelTraceConstants.coma
                            ,ModelTraceConstants.dp
                        ];
                        public static values():ModelTraceConstants[]{
                            return ModelTraceConstants._ModelTraceConstantsVALUES;
                        }
                    }

                    export class TraceSequence {

                        private _traces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace> = new java.util.ArrayList<org.kevoree.modeling.api.trace.ModelTrace>();
                        public traces(): org.kevoree.modeling.api.trace.ModelTrace[] {
                            return this._traces.toArray(new Array());
                        }

                        public populate(addtraces: java.util.List<org.kevoree.modeling.api.trace.ModelTrace>): org.kevoree.modeling.api.trace.TraceSequence {
                            this._traces.addAll(addtraces);
                            return this;
                        }

                        public append(seq: org.kevoree.modeling.api.trace.TraceSequence): org.kevoree.modeling.api.trace.TraceSequence {
                            this._traces.addAll(seq._traces);
                            return this;
                        }

                        public parse(addtracesTxt: string): org.kevoree.modeling.api.trace.TraceSequence {
                            var lexer: org.kevoree.modeling.api.json.Lexer = new org.kevoree.modeling.api.json.Lexer(addtracesTxt);
                            var currentToken: org.kevoree.modeling.api.json.JsonToken = lexer.nextToken();
                            if (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.LEFT_BRACKET) {
                                throw new java.lang.Exception("Bad Format : expect [");
                            }
                            currentToken = lexer.nextToken();
                            var keys: java.util.Map<string, string> = new java.util.HashMap<string, string>();
                            var previousName: string = null;
                            while (currentToken.tokenType() != org.kevoree.modeling.api.json.Type.EOF && currentToken.tokenType() != org.kevoree.modeling.api.json.Type.RIGHT_BRACKET){
                                if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.LEFT_BRACE) {
                                    keys.clear();
                                }
                                if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.VALUE) {
                                    if (previousName != null) {
                                        keys.put(previousName, currentToken.value().toString());
                                        previousName = null;
                                    } else {
                                        previousName = currentToken.value().toString();
                                    }
                                }
                                if (currentToken.tokenType() == org.kevoree.modeling.api.json.Type.RIGHT_BRACE) {
                                    var traceTypeRead: string = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.traceType.toString());
                                    if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.SET.toString())) {
                                        var srcFound: string = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.src.toString());
                                        srcFound = org.kevoree.modeling.api.json.JsonString.unescape(srcFound);
                                        this._traces.add(new org.kevoree.modeling.api.trace.ModelSetTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaAttribute(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.meta.toString())), org.kevoree.modeling.api.json.JsonString.unescape(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.content.toString()))));
                                    }
                                    if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.ADD.toString())) {
                                        var srcFound: string = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.src.toString());
                                        srcFound = org.kevoree.modeling.api.json.JsonString.unescape(srcFound);
                                        this._traces.add(new org.kevoree.modeling.api.trace.ModelAddTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaReference(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.meta.toString())), java.lang.Long.parseLong(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.previouspath.toString())), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaClass(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.typename.toString()))));
                                    }
                                    if (traceTypeRead.equals(org.kevoree.modeling.api.KActionType.REMOVE.toString())) {
                                        var srcFound: string = keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.src.toString());
                                        srcFound = org.kevoree.modeling.api.json.JsonString.unescape(srcFound);
                                        this._traces.add(new org.kevoree.modeling.api.trace.ModelRemoveTrace(java.lang.Long.parseLong(srcFound), new org.kevoree.modeling.api.trace.unresolved.UnresolvedMetaReference(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.meta.toString())), java.lang.Long.parseLong(keys.get(org.kevoree.modeling.api.trace.ModelTraceConstants.objpath.toString()))));
                                    }
                                }
                                currentToken = lexer.nextToken();
                            }
                            return this;
                        }

                        public toString(): string {
                            var buffer: java.lang.StringBuilder = new java.lang.StringBuilder();
                            buffer.append("[");
                            var isFirst: boolean = true;
                            for (var i: number = 0; i < this._traces.size(); i++) {
                                var trace: org.kevoree.modeling.api.trace.ModelTrace = this._traces.get(i);
                                if (!isFirst) {
                                    buffer.append(",\n");
                                }
                                buffer.append(trace);
                                isFirst = false;
                            }
                            buffer.append("]");
                            return buffer.toString();
                        }

                        public applyOn(target: org.kevoree.modeling.api.KObject<any, any>, callback: (p : java.lang.Throwable) => void): boolean {
                            var traceApplicator: org.kevoree.modeling.api.trace.ModelTraceApplicator = new org.kevoree.modeling.api.trace.ModelTraceApplicator(target);
                            traceApplicator.applyTraceSequence(this, callback);
                            return true;
                        }

                        public reverse(): org.kevoree.modeling.api.trace.TraceSequence {
                            java.util.Collections.reverse(this._traces);
                            return this;
                        }

                    }

                    export module unresolved {
                        export class UnresolvedMetaAttribute implements org.kevoree.modeling.api.meta.MetaAttribute {

                            private _metaName: string;
                            constructor(p_metaName: string) {
                                this._metaName = p_metaName;
                            }

                            public key(): boolean {
                                return false;
                            }

                            public origin(): org.kevoree.modeling.api.meta.MetaClass {
                                return null;
                            }

                            public metaType(): org.kevoree.modeling.api.meta.MetaType {
                                return null;
                            }

                            public strategy(): org.kevoree.modeling.api.extrapolation.Extrapolation {
                                return null;
                            }

                            public precision(): number {
                                return 0;
                            }

                            public setExtrapolation(extrapolation: org.kevoree.modeling.api.extrapolation.Extrapolation): void {
                            }

                            public metaName(): string {
                                return this._metaName;
                            }

                            public index(): number {
                                return -1;
                            }

                        }

                        export class UnresolvedMetaClass implements org.kevoree.modeling.api.meta.MetaClass {

                            private _metaName: string;
                            constructor(p_metaName: string) {
                                this._metaName = p_metaName;
                            }

                            public metaName(): string {
                                return this._metaName;
                            }

                            public index(): number {
                                return -1;
                            }

                            public metaAttributes(): org.kevoree.modeling.api.meta.MetaAttribute[] {
                                return new Array();
                            }

                            public metaReferences(): org.kevoree.modeling.api.meta.MetaReference[] {
                                return new Array();
                            }

                            public metaOperations(): org.kevoree.modeling.api.meta.MetaOperation[] {
                                return new Array();
                            }

                            public metaAttribute(name: string): org.kevoree.modeling.api.meta.MetaAttribute {
                                return null;
                            }

                            public metaReference(name: string): org.kevoree.modeling.api.meta.MetaReference {
                                return null;
                            }

                            public metaOperation(name: string): org.kevoree.modeling.api.meta.MetaOperation {
                                return null;
                            }

                        }

                        export class UnresolvedMetaReference implements org.kevoree.modeling.api.meta.MetaReference {

                            private _metaName: string;
                            constructor(p_metaName: string) {
                                this._metaName = p_metaName;
                            }

                            public contained(): boolean {
                                return false;
                            }

                            public single(): boolean {
                                return false;
                            }

                            public metaType(): org.kevoree.modeling.api.meta.MetaClass {
                                return null;
                            }

                            public opposite(): org.kevoree.modeling.api.meta.MetaReference {
                                return null;
                            }

                            public origin(): org.kevoree.modeling.api.meta.MetaClass {
                                return null;
                            }

                            public metaName(): string {
                                return this._metaName;
                            }

                            public index(): number {
                                return -1;
                            }

                        }

                    }
                }
                export class TraceRequest {

                    public static ATTRIBUTES_ONLY: TraceRequest = new TraceRequest();
                    public static REFERENCES_ONLY: TraceRequest = new TraceRequest();
                    public static ATTRIBUTES_REFERENCES: TraceRequest = new TraceRequest();
                    public equals(other: any): boolean {
                        return this == other;
                    }
                    public static _TraceRequestVALUES : TraceRequest[] = [
                        TraceRequest.ATTRIBUTES_ONLY
                        ,TraceRequest.REFERENCES_ONLY
                        ,TraceRequest.ATTRIBUTES_REFERENCES
                    ];
                    public static values():TraceRequest[]{
                        return TraceRequest._TraceRequestVALUES;
                    }
                }

                export module util {
                    export interface CallBackChain<A> {

                        on(a: A, next: (p : java.lang.Throwable) => void): void;

                    }

                    export class DefaultOperationManager implements org.kevoree.modeling.api.util.KOperationManager {

                        private operationCallbacks: java.util.Map<number, java.util.Map<number, (p : org.kevoree.modeling.api.KObject<any, any>, p1 : any[], p2 : (p : any) => void) => void>> = new java.util.HashMap<number, java.util.Map<number, (p : org.kevoree.modeling.api.KObject<any, any>, p1 : any[], p2 : (p : any) => void) => void>>();
                        private _store: org.kevoree.modeling.api.data.KStore;
                        constructor(store: org.kevoree.modeling.api.data.KStore) {
                            this._store = store;
                        }

                        public registerOperation(operation: org.kevoree.modeling.api.meta.MetaOperation, callback: (p : org.kevoree.modeling.api.KObject<any, any>, p1 : any[], p2 : (p : any) => void) => void): void {
                            var clazzOperations: java.util.Map<number, (p : org.kevoree.modeling.api.KObject<any, any>, p1 : any[], p2 : (p : any) => void) => void> = this.operationCallbacks.get(operation.origin().index());
                            if (clazzOperations == null) {
                                clazzOperations = new java.util.HashMap<number, (p : org.kevoree.modeling.api.KObject<any, any>, p1 : any[], p2 : (p : any) => void) => void>();
                                this.operationCallbacks.put(operation.origin().index(), clazzOperations);
                            }
                            clazzOperations.put(operation.index(), callback);
                        }

                        public call(source: org.kevoree.modeling.api.KObject<any, any>, operation: org.kevoree.modeling.api.meta.MetaOperation, param: any[], callback: (p : any) => void): void {
                            var clazzOperations: java.util.Map<number, (p : org.kevoree.modeling.api.KObject<any, any>, p1 : any[], p2 : (p : any) => void) => void> = this.operationCallbacks.get(source.metaClass().index());
                            if (clazzOperations != null) {
                                var operationCore: (p : org.kevoree.modeling.api.KObject<any, any>, p1 : any[], p2 : (p : any) => void) => void = clazzOperations.get(operation.index());
                                if (callback != null) {
                                    operationCore(source, param, callback);
                                } else {
                                }
                            } else {
                            }
                        }

                    }

                    export class Helper {

                        public static pathSep: string = '/';
                        private static pathIDOpen: string = '[';
                        private static pathIDClose: string = ']';
                        private static rootPath: string = "/";
                        public static forall<A> (inputs: A[], each: (p : A, p1 : (p : java.lang.Throwable) => void) => void, end: (p : java.lang.Throwable) => void): void {
                            if (inputs == null) {
                                return;
                            }
                            org.kevoree.modeling.api.util.Helper.process(inputs, 0, each, end);
                        }

                        private static process<A> (arr: A[], index: number, each: (p : A, p1 : (p : java.lang.Throwable) => void) => void, end: (p : java.lang.Throwable) => void): void {
                            if (index >= arr.length) {
                                if (end != null) {
                                    end(null);
                                }
                            } else {
                                var obj: A = arr[index];
                                each(obj,  (err : java.lang.Throwable) => {
                                    if (err != null) {
                                        if (end != null) {
                                            end(err);
                                        }
                                    } else {
                                        org.kevoree.modeling.api.util.Helper.process(arr, index + 1, each, end);
                                    }
                                });
                            }
                        }

                        public static parentPath(currentPath: string): string {
                            if (currentPath == null || currentPath.length == 0) {
                                return null;
                            }
                            if (currentPath.length == 1) {
                                return null;
                            }
                            var lastIndex: number = currentPath.lastIndexOf(Helper.pathSep);
                            if (lastIndex != -1) {
                                if (lastIndex == 0) {
                                    return Helper.rootPath;
                                } else {
                                    return currentPath.substring(0, lastIndex);
                                }
                            } else {
                                return null;
                            }
                        }

                        public static attachedToRoot(path: string): boolean {
                            return path.length > 0 && path.charAt(0) == Helper.pathSep;
                        }

                        public static isRoot(path: string): boolean {
                            return path.length == 1 && path.charAt(0) == org.kevoree.modeling.api.util.Helper.pathSep;
                        }

                        public static path(parent: string, reference: org.kevoree.modeling.api.meta.MetaReference, target: org.kevoree.modeling.api.KObject<any, any>): string {
                            if (org.kevoree.modeling.api.util.Helper.isRoot(parent)) {
                                return Helper.pathSep + reference.metaName() + Helper.pathIDOpen + target.domainKey() + Helper.pathIDClose;
                            } else {
                                return parent + Helper.pathSep + reference.metaName() + Helper.pathIDOpen + target.domainKey() + Helper.pathIDClose;
                            }
                        }

                    }

                    export interface KOperationManager {

                        registerOperation(operation: org.kevoree.modeling.api.meta.MetaOperation, callback: (p : org.kevoree.modeling.api.KObject<any, any>, p1 : any[], p2 : (p : any) => void) => void): void;

                        call(source: org.kevoree.modeling.api.KObject<any, any>, operation: org.kevoree.modeling.api.meta.MetaOperation, param: any[], callback: (p : any) => void): void;

                    }

                }
                export class VisitResult {

                    public static CONTINUE: VisitResult = new VisitResult();
                    public static SKIP: VisitResult = new VisitResult();
                    public static STOP: VisitResult = new VisitResult();
                    public equals(other: any): boolean {
                        return this == other;
                    }
                    public static _VisitResultVALUES : VisitResult[] = [
                        VisitResult.CONTINUE
                        ,VisitResult.SKIP
                        ,VisitResult.STOP
                    ];
                    public static values():VisitResult[]{
                        return VisitResult._VisitResultVALUES;
                    }
                }

                export module xmi {
                    export class SerializationContext {

                        public ignoreGeneratedID: boolean = false;
                        public model: org.kevoree.modeling.api.KObject<any, any>;
                        public finishCallback: (p : string, p1 : java.lang.Throwable) => void;
                        public printer: java.lang.StringBuilder;
                        public attributesVisitor: (p : org.kevoree.modeling.api.meta.MetaAttribute, p1 : any) => void;
                        public addressTable: java.util.HashMap<number, string> = new java.util.HashMap<number, string>();
                        public elementsCount: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
                        public packageList: java.util.ArrayList<string> = new java.util.ArrayList<string>();
                    }

                    export class XmiFormat implements org.kevoree.modeling.api.ModelFormat {

                        private _view: org.kevoree.modeling.api.KView;
                        constructor(p_view: org.kevoree.modeling.api.KView) {
                            this._view = p_view;
                        }

                        public save(model: org.kevoree.modeling.api.KObject<any, any>, callback: (p : string, p1 : java.lang.Throwable) => void): void {
                            org.kevoree.modeling.api.xmi.XMIModelSerializer.save(model, callback);
                        }

                        public load(payload: string, callback: (p : java.lang.Throwable) => void): void {
                            org.kevoree.modeling.api.xmi.XMIModelLoader.load(this._view, payload, callback);
                        }

                    }

                    export class XMILoadingContext {

                        public xmiReader: org.kevoree.modeling.api.xmi.XmlParser;
                        public loadedRoots: org.kevoree.modeling.api.KObject<any, any> = null;
                        public resolvers: java.util.ArrayList<org.kevoree.modeling.api.xmi.XMIResolveCommand> = new java.util.ArrayList<org.kevoree.modeling.api.xmi.XMIResolveCommand>();
                        public map: java.util.HashMap<string, org.kevoree.modeling.api.KObject<any, any>> = new java.util.HashMap<string, org.kevoree.modeling.api.KObject<any, any>>();
                        public elementsCount: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
                        public stats: java.util.HashMap<string, number> = new java.util.HashMap<string, number>();
                        public oppositesAlreadySet: java.util.HashMap<string, boolean> = new java.util.HashMap<string, boolean>();
                        public successCallback: (p : java.lang.Throwable) => void;
                        public isOppositeAlreadySet(localRef: string, oppositeRef: string): boolean {
                            return (this.oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (this.oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null));
                        }

                        public storeOppositeRelation(localRef: string, oppositeRef: string): void {
                            this.oppositesAlreadySet.put(localRef + "_" + oppositeRef, true);
                        }

                    }

                    export class XMIModelLoader {

                        private _factory: org.kevoree.modeling.api.KView;
                        public static LOADER_XMI_LOCAL_NAME: string = "type";
                        public static LOADER_XMI_XSI: string = "xsi";
                        public static LOADER_XMI_NS_URI: string = "nsURI";
                        constructor(p_factory: org.kevoree.modeling.api.KView) {
                            this._factory = p_factory;
                        }

                        public static unescapeXml(src: string): string {
                            var builder: java.lang.StringBuilder = null;
                            var i: number = 0;
                            while (i < src.length){
                                var c: string = src.charAt(i);
                                if (c == '&') {
                                    if (builder == null) {
                                        builder = new java.lang.StringBuilder();
                                        builder.append(src.substring(0, i));
                                    }
                                    if (src.charAt(i + 1) == 'a') {
                                        if (src.charAt(i + 2) == 'm') {
                                            builder.append("&");
                                            i = i + 5;
                                        } else {
                                            if (src.charAt(i + 2) == 'p') {
                                                builder.append("'");
                                                i = i + 6;
                                            }
                                        }
                                    } else {
                                        if (src.charAt(i + 1) == 'q') {
                                            builder.append("\"");
                                            i = i + 6;
                                        } else {
                                            if (src.charAt(i + 1) == 'l') {
                                                builder.append("<");
                                                i = i + 4;
                                            } else {
                                                if (src.charAt(i + 1) == 'g') {
                                                    builder.append(">");
                                                    i = i + 4;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (builder != null) {
                                        builder.append(c);
                                    }
                                    i++;
                                }
                            }
                            if (builder != null) {
                                return builder.toString();
                            } else {
                                return src;
                            }
                        }

                        public static load(p_view: org.kevoree.modeling.api.KView, str: string, callback: (p : java.lang.Throwable) => void): void {
                            var parser: org.kevoree.modeling.api.xmi.XmlParser = new org.kevoree.modeling.api.xmi.XmlParser(str);
                            if (!parser.hasNext()) {
                                callback(null);
                            } else {
                                var context: org.kevoree.modeling.api.xmi.XMILoadingContext = new org.kevoree.modeling.api.xmi.XMILoadingContext();
                                context.successCallback = callback;
                                context.xmiReader = parser;
                                org.kevoree.modeling.api.xmi.XMIModelLoader.deserialize(p_view, context);
                            }
                        }

                        private static deserialize(p_view: org.kevoree.modeling.api.KView, context: org.kevoree.modeling.api.xmi.XMILoadingContext): void {
                            try {
                                var nsURI: string;
                                var reader: org.kevoree.modeling.api.xmi.XmlParser = context.xmiReader;
                                while (reader.hasNext()){
                                    var nextTag: org.kevoree.modeling.api.xmi.XmlToken = reader.next();
                                    if (nextTag.equals(org.kevoree.modeling.api.xmi.XmlToken.START_TAG)) {
                                        var localName: string = reader.getLocalName();
                                        if (localName != null) {
                                            var ns: java.util.HashMap<string, string> = new java.util.HashMap<string, string>();
                                            for (var i: number = 0; i < reader.getAttributeCount() - 1; i++) {
                                                var attrLocalName: string = reader.getAttributeLocalName(i);
                                                var attrLocalValue: string = reader.getAttributeValue(i);
                                                if (attrLocalName.equals(XMIModelLoader.LOADER_XMI_NS_URI)) {
                                                    nsURI = attrLocalValue;
                                                }
                                                ns.put(attrLocalName, attrLocalValue);
                                            }
                                            var xsiType: string = reader.getTagPrefix();
                                            var realTypeName: string = ns.get(xsiType);
                                            if (realTypeName == null) {
                                                realTypeName = xsiType;
                                            }
                                            context.loadedRoots = org.kevoree.modeling.api.xmi.XMIModelLoader.loadObject(p_view, context, "/", xsiType + "." + localName);
                                        }
                                    }
                                }
                                for (var i: number = 0; i < context.resolvers.size(); i++) {
                                    context.resolvers.get(i).run();
                                }
                                p_view.setRoot(context.loadedRoots, null);
                                context.successCallback(null);
                            } catch ($ex$) {
                                if ($ex$ instanceof java.lang.Exception) {
                                    var e: java.lang.Exception = <java.lang.Exception>$ex$;
                                    context.successCallback(e);
                                }
                             }
                        }

                        private static callFactory(p_view: org.kevoree.modeling.api.KView, ctx: org.kevoree.modeling.api.xmi.XMILoadingContext, objectType: string): org.kevoree.modeling.api.KObject<any, any> {
                            var modelElem: org.kevoree.modeling.api.KObject<any, any> = null;
                            if (objectType != null) {
                                modelElem = p_view.createFQN(objectType);
                                if (modelElem == null) {
                                    var xsiType: string = null;
                                    for (var i: number = 0; i < (ctx.xmiReader.getAttributeCount() - 1); i++) {
                                        var localName: string = ctx.xmiReader.getAttributeLocalName(i);
                                        var xsi: string = ctx.xmiReader.getAttributePrefix(i);
                                        if (localName.equals(XMIModelLoader.LOADER_XMI_LOCAL_NAME) && xsi.equals(XMIModelLoader.LOADER_XMI_XSI)) {
                                            xsiType = ctx.xmiReader.getAttributeValue(i);
                                            break;
                                        }
                                    }
                                    if (xsiType != null) {
                                        var realTypeName: string = xsiType.substring(0, xsiType.lastIndexOf(":"));
                                        var realName: string = xsiType.substring(xsiType.lastIndexOf(":") + 1, xsiType.length);
                                        modelElem = p_view.createFQN(realTypeName + "." + realName);
                                    }
                                }
                            } else {
                                modelElem = p_view.createFQN(ctx.xmiReader.getLocalName());
                            }
                            return modelElem;
                        }

                        private static loadObject(p_view: org.kevoree.modeling.api.KView, ctx: org.kevoree.modeling.api.xmi.XMILoadingContext, xmiAddress: string, objectType: string): org.kevoree.modeling.api.KObject<any, any> {
                            var elementTagName: string = ctx.xmiReader.getLocalName();
                            var modelElem: org.kevoree.modeling.api.KObject<any, any> = org.kevoree.modeling.api.xmi.XMIModelLoader.callFactory(p_view, ctx, objectType);
                            if (modelElem == null) {
                                throw new java.lang.Exception("Could not create an object for local name " + elementTagName);
                            }
                            ctx.map.put(xmiAddress, modelElem);
                            for (var i: number = 0; i < ctx.xmiReader.getAttributeCount(); i++) {
                                var prefix: string = ctx.xmiReader.getAttributePrefix(i);
                                if (prefix == null || prefix.equals("")) {
                                    var attrName: string = ctx.xmiReader.getAttributeLocalName(i).trim();
                                    var valueAtt: string = ctx.xmiReader.getAttributeValue(i).trim();
                                    if (valueAtt != null) {
                                        var kAttribute: org.kevoree.modeling.api.meta.MetaAttribute = modelElem.metaAttribute(attrName);
                                        if (kAttribute != null) {
                                            modelElem.set(kAttribute, org.kevoree.modeling.api.xmi.XMIModelLoader.unescapeXml(valueAtt));
                                        } else {
                                            var kreference: org.kevoree.modeling.api.meta.MetaReference = modelElem.metaReference(attrName);
                                            if (kreference != null) {
                                                var referenceArray: string[] = valueAtt.split(" ");
                                                for (var j: number = 0; j < referenceArray.length; j++) {
                                                    var xmiRef: string = referenceArray[j];
                                                    var adjustedRef: string = (xmiRef.startsWith("#") ? xmiRef.substring(1) : xmiRef);
                                                    adjustedRef = adjustedRef.replace(".0", "");
                                                    var ref: org.kevoree.modeling.api.KObject<any, any> = ctx.map.get(adjustedRef);
                                                    if (ref != null) {
                                                        modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, kreference, ref, true);
                                                    } else {
                                                        ctx.resolvers.add(new org.kevoree.modeling.api.xmi.XMIResolveCommand(ctx, modelElem, org.kevoree.modeling.api.KActionType.ADD, attrName, adjustedRef));
                                                    }
                                                }
                                            } else {
                                            }
                                        }
                                    }
                                }
                            }
                            var done: boolean = false;
                            while (!done){
                                if (ctx.xmiReader.hasNext()) {
                                    var tok: org.kevoree.modeling.api.xmi.XmlToken = ctx.xmiReader.next();
                                    if (tok.equals(org.kevoree.modeling.api.xmi.XmlToken.START_TAG)) {
                                        var subElemName: string = ctx.xmiReader.getLocalName();
                                        var key: string = xmiAddress + "/@" + subElemName;
                                        var i: number = ctx.elementsCount.get(key);
                                        if (i == null) {
                                            i = 0;
                                            ctx.elementsCount.put(key, i);
                                        }
                                        var subElementId: string = xmiAddress + "/@" + subElemName + (i != 0 ? "." + i : "");
                                        var containedElement: org.kevoree.modeling.api.KObject<any, any> = org.kevoree.modeling.api.xmi.XMIModelLoader.loadObject(p_view, ctx, subElementId, subElemName);
                                        modelElem.mutate(org.kevoree.modeling.api.KActionType.ADD, modelElem.metaReference(subElemName), containedElement, true);
                                        ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1);
                                    } else {
                                        if (tok.equals(org.kevoree.modeling.api.xmi.XmlToken.END_TAG)) {
                                            if (ctx.xmiReader.getLocalName().equals(elementTagName)) {
                                                done = true;
                                            }
                                        }
                                    }
                                } else {
                                    done = true;
                                }
                            }
                            return modelElem;
                        }

                    }

                    export class XMIModelSerializer {

                        public static save(model: org.kevoree.modeling.api.KObject<any, any>, callback: (p : string, p1 : java.lang.Throwable) => void): void {
                            var context: org.kevoree.modeling.api.xmi.SerializationContext = new org.kevoree.modeling.api.xmi.SerializationContext();
                            context.model = model;
                            context.finishCallback = callback;
                            context.attributesVisitor =  (metaAttribute : org.kevoree.modeling.api.meta.MetaAttribute, value : any) => {
                                if (value != null) {
                                    if (context.ignoreGeneratedID && metaAttribute.metaName().equals("generated_KMF_ID")) {
                                        return;
                                    }
                                    context.printer.append(" " + metaAttribute.metaName() + "=\"");
                                    org.kevoree.modeling.api.xmi.XMIModelSerializer.escapeXml(context.printer, value.toString());
                                    context.printer.append("\"");
                                }
                            };
                            context.printer = new java.lang.StringBuilder();
                            context.addressTable.put(model.uuid(), "/");
                            model.treeVisit( (elem : org.kevoree.modeling.api.KObject<any, any>) => {
                                var parentXmiAddress: string = context.addressTable.get(elem.parentUuid());
                                var key: string = parentXmiAddress + "/@" + elem.referenceInParent().metaName();
                                var i: number = context.elementsCount.get(key);
                                if (i == null) {
                                    i = 0;
                                    context.elementsCount.put(key, i);
                                }
                                context.addressTable.put(elem.uuid(), parentXmiAddress + "/@" + elem.referenceInParent().metaName() + "." + i);
                                context.elementsCount.put(parentXmiAddress + "/@" + elem.referenceInParent().metaName(), i + 1);
                                var pack: string = elem.metaClass().metaName().substring(0, elem.metaClass().metaName().lastIndexOf('.'));
                                if (!context.packageList.contains(pack)) {
                                    context.packageList.add(pack);
                                }
                                return org.kevoree.modeling.api.VisitResult.CONTINUE;
                            },  (throwable : java.lang.Throwable) => {
                                if (throwable != null) {
                                    context.finishCallback(null, throwable);
                                } else {
                                    context.printer.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
                                    context.printer.append("<" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_"));
                                    context.printer.append(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"");
                                    context.printer.append(" xmi:version=\"2.0\"");
                                    context.printer.append(" xmlns:xmi=\"http://www.omg.org/XMI\"");
                                    var index: number = 0;
                                    while (index < context.packageList.size()){
                                        context.printer.append(" xmlns:" + context.packageList.get(index).replace(".", "_") + "=\"http://" + context.packageList.get(index) + "\"");
                                        index++;
                                    }
                                    context.model.visitAttributes(context.attributesVisitor);
                                    org.kevoree.modeling.api.util.Helper.forall(context.model.metaReferences(),  (metaReference : org.kevoree.modeling.api.meta.MetaReference, next : (p : java.lang.Throwable) => void) => {
                                        org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferencesCallbackChain(metaReference, next, context, context.model);
                                    },  (err : java.lang.Throwable) => {
                                        if (err == null) {
                                            context.printer.append(">\n");
                                            org.kevoree.modeling.api.util.Helper.forall(context.model.metaReferences(),  (metaReference : org.kevoree.modeling.api.meta.MetaReference, next : (p : java.lang.Throwable) => void) => {
                                                org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferencesCallbackChain(metaReference, next, context, context.model);
                                            },  (containedRefsEnd : java.lang.Throwable) => {
                                                if (containedRefsEnd == null) {
                                                    context.printer.append("</" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(context.model.metaClass().metaName()).replace(".", "_") + ">\n");
                                                    context.finishCallback(context.printer.toString(), null);
                                                } else {
                                                    context.finishCallback(null, containedRefsEnd);
                                                }
                                            });
                                        } else {
                                            context.finishCallback(null, err);
                                        }
                                    });
                                }
                            });
                        }

                        public static escapeXml(ostream: java.lang.StringBuilder, chain: string): void {
                            if (chain == null) {
                                return;
                            }
                            var i: number = 0;
                            var max: number = chain.length;
                            while (i < max){
                                var c: string = chain.charAt(i);
                                if (c == '"') {
                                    ostream.append("&quot;");
                                } else {
                                    if (c == '&') {
                                        ostream.append("&amp;");
                                    } else {
                                        if (c == '\'') {
                                            ostream.append("&apos;");
                                        } else {
                                            if (c == '<') {
                                                ostream.append("&lt;");
                                            } else {
                                                if (c == '>') {
                                                    ostream.append("&gt;");
                                                } else {
                                                    ostream.append(c);
                                                }
                                            }
                                        }
                                    }
                                }
                                i = i + 1;
                            }
                        }

                        public static formatMetaClassName(metaClassName: string): string {
                            var lastPoint: number = metaClassName.lastIndexOf('.');
                            var pack: string = metaClassName.substring(0, lastPoint);
                            var cls: string = metaClassName.substring(lastPoint + 1);
                            return pack + ":" + cls;
                        }

                        private static nonContainedReferencesCallbackChain(ref: org.kevoree.modeling.api.meta.MetaReference, next: (p : java.lang.Throwable) => void, p_context: org.kevoree.modeling.api.xmi.SerializationContext, p_currentElement: org.kevoree.modeling.api.KObject<any, any>): void {
                            if (!ref.contained()) {
                                var value: string[] = new Array();
                                value[0] = "";
                                p_currentElement.each(ref,  (o : any) => {
                                    var adjustedAddress: string = p_context.addressTable.get((<org.kevoree.modeling.api.KObject<any, any>>o).uuid());
                                    value[0] = (value[0].equals("") ? adjustedAddress : value[0] + " " + adjustedAddress);
                                },  (end : java.lang.Throwable) => {
                                    if (end == null) {
                                        if (value[0] != null) {
                                            p_context.printer.append(" " + ref.metaName() + "=\"" + value[0] + "\"");
                                        }
                                    }
                                    next(end);
                                });
                            } else {
                                next(null);
                            }
                        }

                        private static containedReferencesCallbackChain(ref: org.kevoree.modeling.api.meta.MetaReference, nextReference: (p : java.lang.Throwable) => void, context: org.kevoree.modeling.api.xmi.SerializationContext, currentElement: org.kevoree.modeling.api.KObject<any, any>): void {
                            if (ref.contained()) {
                                currentElement.each(ref,  (o : any) => {
                                    var elem: org.kevoree.modeling.api.KObject<any, any> = <org.kevoree.modeling.api.KObject<any, any>>o;
                                    context.printer.append("<");
                                    context.printer.append(ref.metaName());
                                    context.printer.append(" xsi:type=\"" + org.kevoree.modeling.api.xmi.XMIModelSerializer.formatMetaClassName(elem.metaClass().metaName()) + "\"");
                                    elem.visitAttributes(context.attributesVisitor);
                                    org.kevoree.modeling.api.util.Helper.forall(elem.metaReferences(),  (metaReference : org.kevoree.modeling.api.meta.MetaReference, next : (p : java.lang.Throwable) => void) => {
                                        org.kevoree.modeling.api.xmi.XMIModelSerializer.nonContainedReferencesCallbackChain(metaReference, next, context, elem);
                                    },  (err : java.lang.Throwable) => {
                                        if (err == null) {
                                            context.printer.append(">\n");
                                            org.kevoree.modeling.api.util.Helper.forall(elem.metaReferences(),  (metaReference : org.kevoree.modeling.api.meta.MetaReference, next : (p : java.lang.Throwable) => void) => {
                                                org.kevoree.modeling.api.xmi.XMIModelSerializer.containedReferencesCallbackChain(metaReference, next, context, elem);
                                            },  (containedRefsEnd : java.lang.Throwable) => {
                                                if (containedRefsEnd == null) {
                                                    context.printer.append("</");
                                                    context.printer.append(ref.metaName());
                                                    context.printer.append('>');
                                                    context.printer.append("\n");
                                                }
                                            });
                                        } else {
                                            context.finishCallback(null, err);
                                        }
                                    });
                                },  (throwable : java.lang.Throwable) => {
                                    nextReference(null);
                                });
                            } else {
                                nextReference(null);
                            }
                        }

                    }

                    export class XMIResolveCommand {

                        private context: org.kevoree.modeling.api.xmi.XMILoadingContext;
                        private target: org.kevoree.modeling.api.KObject<any, any>;
                        private mutatorType: org.kevoree.modeling.api.KActionType;
                        private refName: string;
                        private ref: string;
                        constructor(context: org.kevoree.modeling.api.xmi.XMILoadingContext, target: org.kevoree.modeling.api.KObject<any, any>, mutatorType: org.kevoree.modeling.api.KActionType, refName: string, ref: string) {
                            this.context = context;
                            this.target = target;
                            this.mutatorType = mutatorType;
                            this.refName = refName;
                            this.ref = ref;
                        }

                        public run(): void {
                            var referencedElement: org.kevoree.modeling.api.KObject<any, any> = this.context.map.get(this.ref);
                            if (referencedElement != null) {
                                this.target.mutate(this.mutatorType, this.target.metaReference(this.refName), referencedElement, true);
                                return;
                            }
                            referencedElement = this.context.map.get("/");
                            if (referencedElement != null) {
                                this.target.mutate(this.mutatorType, this.target.metaReference(this.refName), referencedElement, true);
                                return;
                            }
                            throw new java.lang.Exception("KMF Load error : reference " + this.ref + " not found in map when trying to  " + this.mutatorType + " " + this.refName + "  on " + this.target.metaClass().metaName() + "(uuid:" + this.target.uuid() + ")");
                        }

                    }

                    export class XmlParser {

                        private payload: string;
                        private current: number = 0;
                        private currentChar: string;
                        private tagName: string;
                        private tagPrefix: string;
                        private attributePrefix: string;
                        private readSingleton: boolean = false;
                        private attributesNames: java.util.ArrayList<string> = new java.util.ArrayList<string>();
                        private attributesPrefixes: java.util.ArrayList<string> = new java.util.ArrayList<string>();
                        private attributesValues: java.util.ArrayList<string> = new java.util.ArrayList<string>();
                        private attributeName: java.lang.StringBuilder = new java.lang.StringBuilder();
                        private attributeValue: java.lang.StringBuilder = new java.lang.StringBuilder();
                        constructor(str: string) {
                            this.payload = str;
                            this.currentChar = this.readChar();
                        }

                        public getTagPrefix(): string {
                            return this.tagPrefix;
                        }

                        public hasNext(): boolean {
                            this.read_lessThan();
                            return this.current < this.payload.length;
                        }

                        public getLocalName(): string {
                            return this.tagName;
                        }

                        public getAttributeCount(): number {
                            return this.attributesNames.size();
                        }

                        public getAttributeLocalName(i: number): string {
                            return this.attributesNames.get(i);
                        }

                        public getAttributePrefix(i: number): string {
                            return this.attributesPrefixes.get(i);
                        }

                        public getAttributeValue(i: number): string {
                            return this.attributesValues.get(i);
                        }

                        private readChar(): string {
                            if (this.current < this.payload.length) {
                                var re: string = this.payload.charAt(this.current);
                                this.current++;
                                return re;
                            }
                            return '\0';
                        }

                        public next(): org.kevoree.modeling.api.xmi.XmlToken {
                            if (this.readSingleton) {
                                this.readSingleton = false;
                                return org.kevoree.modeling.api.xmi.XmlToken.END_TAG;
                            }
                            if (!this.hasNext()) {
                                return org.kevoree.modeling.api.xmi.XmlToken.END_DOCUMENT;
                            }
                            this.attributesNames.clear();
                            this.attributesPrefixes.clear();
                            this.attributesValues.clear();
                            this.read_lessThan();
                            this.currentChar = this.readChar();
                            if (this.currentChar == '?') {
                                this.currentChar = this.readChar();
                                this.read_xmlHeader();
                                return org.kevoree.modeling.api.xmi.XmlToken.XML_HEADER;
                            } else {
                                if (this.currentChar == '!') {
                                    do {
                                        this.currentChar = this.readChar();
                                    } while (this.currentChar != '>')
                                    return org.kevoree.modeling.api.xmi.XmlToken.COMMENT;
                                } else {
                                    if (this.currentChar == '/') {
                                        this.currentChar = this.readChar();
                                        this.read_closingTag();
                                        return org.kevoree.modeling.api.xmi.XmlToken.END_TAG;
                                    } else {
                                        this.read_openTag();
                                        if (this.currentChar == '/') {
                                            this.read_upperThan();
                                            this.readSingleton = true;
                                        }
                                        return org.kevoree.modeling.api.xmi.XmlToken.START_TAG;
                                    }
                                }
                            }
                        }

                        private read_lessThan(): void {
                            while (this.currentChar != '<' && this.currentChar != '\0'){
                                this.currentChar = this.readChar();
                            }
                        }

                        private read_upperThan(): void {
                            while (this.currentChar != '>'){
                                this.currentChar = this.readChar();
                            }
                        }

                        private read_xmlHeader(): void {
                            this.read_tagName();
                            this.read_attributes();
                            this.read_upperThan();
                        }

                        private read_closingTag(): void {
                            this.read_tagName();
                            this.read_upperThan();
                        }

                        private read_openTag(): void {
                            this.read_tagName();
                            if (this.currentChar != '>' && this.currentChar != '/') {
                                this.read_attributes();
                            }
                        }

                        private read_tagName(): void {
                            this.tagName = "" + this.currentChar;
                            this.tagPrefix = null;
                            this.currentChar = this.readChar();
                            while (this.currentChar != ' ' && this.currentChar != '>' && this.currentChar != '/'){
                                if (this.currentChar == ':') {
                                    this.tagPrefix = this.tagName;
                                    this.tagName = "";
                                } else {
                                    this.tagName += this.currentChar;
                                }
                                this.currentChar = this.readChar();
                            }
                        }

                        private read_attributes(): void {
                            var end_of_tag: boolean = false;
                            while (this.currentChar == ' '){
                                this.currentChar = this.readChar();
                            }
                            while (!end_of_tag){
                                while (this.currentChar != '='){
                                    if (this.currentChar == ':') {
                                        this.attributePrefix = this.attributeName.toString();
                                        this.attributeName = new java.lang.StringBuilder();
                                    } else {
                                        this.attributeName.append(this.currentChar);
                                    }
                                    this.currentChar = this.readChar();
                                }
                                do {
                                    this.currentChar = this.readChar();
                                } while (this.currentChar != '"')
                                this.currentChar = this.readChar();
                                while (this.currentChar != '"'){
                                    this.attributeValue.append(this.currentChar);
                                    this.currentChar = this.readChar();
                                }
                                this.attributesNames.add(this.attributeName.toString());
                                this.attributesPrefixes.add(this.attributePrefix);
                                this.attributesValues.add(this.attributeValue.toString());
                                this.attributeName = new java.lang.StringBuilder();
                                this.attributePrefix = null;
                                this.attributeValue = new java.lang.StringBuilder();
                                do {
                                    this.currentChar = this.readChar();
                                    if (this.currentChar == '?' || this.currentChar == '/' || this.currentChar == '-' || this.currentChar == '>') {
                                        end_of_tag = true;
                                    }
                                } while (!end_of_tag && this.currentChar == ' ')
                            }
                        }

                    }

                    export class XmlToken {

                        public static XML_HEADER: XmlToken = new XmlToken();
                        public static END_DOCUMENT: XmlToken = new XmlToken();
                        public static START_TAG: XmlToken = new XmlToken();
                        public static END_TAG: XmlToken = new XmlToken();
                        public static COMMENT: XmlToken = new XmlToken();
                        public static SINGLETON_TAG: XmlToken = new XmlToken();
                        public equals(other: any): boolean {
                            return this == other;
                        }
                        public static _XmlTokenVALUES : XmlToken[] = [
                            XmlToken.XML_HEADER
                            ,XmlToken.END_DOCUMENT
                            ,XmlToken.START_TAG
                            ,XmlToken.END_TAG
                            ,XmlToken.COMMENT
                            ,XmlToken.SINGLETON_TAG
                        ];
                        public static values():XmlToken[]{
                            return XmlToken._XmlTokenVALUES;
                        }
                    }

                }
            }
        }
    }
}
