///<reference path="rbtree/TreeNode.ts"/>
///<reference path="rbtree/RBTree.ts"/>
///<reference path="rbtree/State.ts"/>

class DefaultTimeTree implements TimeTree {

  public dirty: boolean = true;
  public versionTree: RBTree = new RBTree();

  public walk(walker: TimeWalker): void {
    this.walkAsc(walker);
  }

  public walkAsc(walker: TimeWalker): void {
    var elem: TreeNode = this.versionTree.first();
    while (elem != null){
      walker.walk(elem.getKey());
      elem = elem.next();
    }
  }

  public walkDesc(walker: TimeWalker): void {
    var elem: TreeNode = this.versionTree.last();
    while (elem != null){
      walker.walk(elem.getKey());
      elem = elem.previous();
    }
  }

  public walkRangeAsc(walker: TimeWalker, from: number, to: number): void {
    var from2: number = from;
    var to2: number = to;
    if (from > to) {
      from2 = to;
      to2 = from;
    }
    var elem: TreeNode = this.versionTree.previousOrEqual(from2);
    while (elem != null){
      walker.walk(elem.getKey());
      elem = elem.next();
      if (elem != null) {
        if (elem.getKey() >= to2) {
          return;
        }
      }
    }
  }

  public walkRangeDesc(walker: TimeWalker, from: number, to: number): void {
    var from2: number = from;
    var to2: number = to;
    if (from > to) {
      from2 = to;
      to2 = from;
    }
    var elem: TreeNode = this.versionTree.previousOrEqual(to2);
    while (elem != null){
      walker.walk(elem.getKey());
      elem = elem.previous();
      if (elem != null) {
        if (elem.getKey() <= from2) {
          walker.walk(elem.getKey());
          return;
        }
      }
    }
  }

  public first(): number {
    var firstNode: TreeNode = this.versionTree.first();
    if (firstNode != null) {
      return firstNode.getKey();
    } else {
      return null;
    }
  }

  public last(): number {
    var lastNode: TreeNode = this.versionTree.last();
    if (lastNode != null) {
      return lastNode.getKey();
    } else {
      return null;
    }
  }

  public next(from: number): number {
    var nextNode: TreeNode = this.versionTree.next(from);
    if (nextNode != null) {
      return nextNode.getKey();
    } else {
      return null;
    }
  }

  public previous(from: number): number {
    var previousNode: TreeNode = this.versionTree.previous(from);
    if (previousNode != null) {
      return previousNode.getKey();
    } else {
      return null;
    }
  }

  public resolve(time: number): number {
    var previousNode: TreeNode = this.versionTree.previousOrEqual(time);
    if (previousNode != null) {
      return previousNode.getKey();
    } else {
      return null;
    }
  }

  public insert(time: number): TimeTree {
    this.versionTree.insert(time, State.EXISTS);
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

