
class ReaderContext {

  private payload: string = null;
  private offset: number = 0;

  constructor(offset: number, payload: string) {
    this.offset = offset;
    this.payload = payload;
  }

  public unserialize(rightBranch: boolean): Node {
    if (this.offset >= this.payload.length()) {
      return null;
    }
    var tokenBuild: StringBuilder = new StringBuilder();
    var ch: string = this.payload.charAt(this.offset);
    if (ch == '%') {
      if (rightBranch) {
        this.offset = this.offset + 1;
      }
      return null;
    }
    if (ch == '#') {
      this.offset = this.offset + 1;
      return null;
    }
    if (ch != '|') {
      throw new Exception("Error while loading BTree");
    }
    this.offset = this.offset + 1;
    ch = this.payload.charAt(this.offset);
    var color: Color = Color.BLACK;
    var state: State = State.EXISTS;
    switch (ch) {
      case Node.BLACK_DELETE: 
      color = Color.BLACK;
      state = State.DELETED;
      break;
      case Node.BLACK_EXISTS: 
      color = Color.BLACK;
      state = State.EXISTS;
      break;
      case Node.RED_DELETE: 
      color = Color.RED;
      state = State.DELETED;
      break;
      case Node.RED_EXISTS: 
      color = Color.RED;
      state = State.EXISTS;
      break;
    }
    this.offset = this.offset + 1;
    ch = this.payload.charAt(this.offset);
    while (this.offset + 1 < this.payload.length() && ch != '|' && ch != '#' && ch != '%'){
      tokenBuild.append(ch);
      this.offset = this.offset + 1;
      ch = this.payload.charAt(this.offset);
    }
    if (ch != '|' && ch != '#' && ch != '%') {
      tokenBuild.append(ch);
    }
    var p: Node = new Node(Long.parseLong(tokenBuild.toString()), state, color, null, null);
    var left: Node = this.unserialize(false);
    if (left != null) {
      left.parent = p;
    }
    var right: Node = this.unserialize(true);
    if (right != null) {
      right.parent = p;
    }
    p.left = left;
    p.right = right;
    return p;
  }

}

