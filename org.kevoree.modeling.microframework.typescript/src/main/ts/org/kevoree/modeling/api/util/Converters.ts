///<reference path="../../../../../java/util/JUList.ts"/>

class Converters {

  public static convFlatAtt(value: any): string {
    if (value == null) {
      return null;
    }
    if (value instanceof JUList) {
      var isF: boolean = true;
      var buffer: StringBuilder = new StringBuilder();
      //TODO resolve for-each cycle
      var v: any;
      for (v in <JUList>value) {
        if (!isF) {
          buffer.append("$");
        }
        buffer.append(v.toString());
        isF = false;
      }
      return buffer.toString();
    } else {
      return value.toString();
    }
  }

  public static convAttFlat(value: string): string[] {
    return value.split("$");
  }

  public static toChar(b: number): string {
    return <string>b;
  }

  public static fromChar(c: string): number {
    return <number>c;
  }

}

