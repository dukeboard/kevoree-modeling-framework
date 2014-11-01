///<reference path="../KObject.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../polynomial/DefaultPolynomialExtrapolation.ts"/>
///<reference path="../polynomial/PolynomialExtrapolation.ts"/>
///<reference path="../polynomial/util/Prioritization.ts"/>

class PolynomialExtrapolationStrategy implements ExtrapolationStrategy {

  public timedDependencies(current: KObject<any,any>): number[] {
    var times: number[] = new Array();
    times[0] = current.timeTree().resolve(current.now());
    return times;
  }

  public extrapolate(current: KObject<any,any>, attribute: MetaAttribute, dependencies: KObject<any,any>[]): any {
    var pol: PolynomialExtrapolation = <PolynomialExtrapolation>current.view().dimension().universe().storage().raw(current, AccessMode.READ)[attribute.index()];
    if (pol != null) {
      return pol.extrapolate(current.now());
    } else {
      return null;
    }
  }

  public mutate(current: KObject<any,any>, attribute: MetaAttribute, payload: any, dependencies: KObject<any,any>[]): void {
    var previous: any = current.view().dimension().universe().storage().raw(current, AccessMode.READ)[attribute.index()];
    if (previous == null) {
      var pol: PolynomialExtrapolation = new DefaultPolynomialExtrapolation(current.now(), attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
      pol.insert(current.now(), Double.parseDouble(payload.toString()));
      current.view().dimension().universe().storage().raw(current, AccessMode.WRITE)[attribute.index()] = pol;
    } else {
      var previousPol: PolynomialExtrapolation = <PolynomialExtrapolation>previous;
      if (!previousPol.insert(current.now(), Double.parseDouble(payload.toString()))) {
        var pol: PolynomialExtrapolation = new DefaultPolynomialExtrapolation(previousPol.lastIndex(), attribute.precision(), 20, 1, Prioritization.LOWDEGREES);
        pol.insert(previousPol.lastIndex(), previousPol.extrapolate(previousPol.lastIndex()));
        pol.insert(current.now(), Double.parseDouble(payload.toString()));
        current.view().dimension().universe().storage().raw(current, AccessMode.WRITE)[attribute.index()] = pol;
      }
    }
  }

}

