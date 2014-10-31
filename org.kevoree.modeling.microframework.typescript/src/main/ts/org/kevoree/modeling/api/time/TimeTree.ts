
interface TimeTree {

  walk(walker: TimeWalker): void;

  walkAsc(walker: TimeWalker): void;

  walkDesc(walker: TimeWalker): void;

  walkRangeAsc(walker: TimeWalker, from: number, to: number): void;

  walkRangeDesc(walker: TimeWalker, from: number, to: number): void;

  first(): number;

  last(): number;

  next(from: number): number;

  previous(from: number): number;

  resolve(time: number): number;

  insert(time: number): TimeTree;

  isDirty(): boolean;

  size(): number;

}

