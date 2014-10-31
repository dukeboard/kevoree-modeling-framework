
interface PolynomialExtrapolation {

  save(): string;

  load(payload: string): void;

  extrapolate(time: number): number;

  insert(time: number, value: number): boolean;

  lastIndex(): number;

}

