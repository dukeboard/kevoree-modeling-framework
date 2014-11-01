///<reference path="../KObject.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>

class DiscreteExtrapolationStrategy implements ExtrapolationStrategy {

  public timedDependencies(current: KObject<any,any>): number[] {
    var times: number[] = new Array();
    times[0] = current.timeTree().resolve(current.now());
    return times;
  }

  public extrapolate(current: KObject<any,any>, attribute: MetaAttribute, dependencies: KObject[]): any {
    var payload: any[] = current.view().dimension().universe().storage().raw(current, AccessMode.READ);
    if (payload != null) {
      return payload[attribute.index()];
    } else {
      return null;
    }
  }

  public mutate(current: KObject<any,any>, attribute: MetaAttribute, payload: any, dependencies: KObject[]): void {
    var internalPayload: any[] = current.view().dimension().universe().storage().raw(current, AccessMode.WRITE);
    if (internalPayload != null) {
      internalPayload[attribute.index()] = payload;
    }
  }

}

