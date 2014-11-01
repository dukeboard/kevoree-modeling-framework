///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../meta/MetaReference.ts"/>

class Helper {

  public static pathSep: string = '/';
  private static pathIDOpen: string = '[';
  private static pathIDClose: string = ']';
  private static rootPath: string = "/";

  public static forall<A> (inputs: A[], each: CallBackChain<A>, end: Callback<Throwable>): void {
    if (inputs == null) {
      return;
    }
    Helper.process(inputs, 0, each, end);
  }

  private static process<A> (arr: A[], index: number, each: CallBackChain<A>, end: Callback<Throwable>): void {
    if (index >= arr.length) {
      if (end != null) {
        end.on(null);
      }
    } else {
      var obj: A = arr[index];
      each.on(obj, 
        public on(err: Throwable): void {
          if (err != null) {
            if (end != null) {
              end.on(err);
            }
          } else {
            Helper.process(arr, index + 1, each, end);
          }
        }

);
    }
  }

  public static parentPath(currentPath: string): string {
    if (currentPath == null || currentPath.length() == 0) {
      return null;
    }
    if (currentPath.length() == 1) {
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
    return path.length() > 0 && path.charAt(0) == Helper.pathSep;
  }

  public static isRoot(path: string): boolean {
    return path.length() == 1 && path.charAt(0) == Helper.pathSep;
  }

  public static path(parent: string, reference: MetaReference, target: KObject<any,any>): string {
    if (Helper.isRoot(parent)) {
      return Helper.pathSep + reference.metaName() + Helper.pathIDOpen + target.domainKey() + Helper.pathIDClose;
    } else {
      return parent + Helper.pathSep + reference.metaName() + Helper.pathIDOpen + target.domainKey() + Helper.pathIDClose;
    }
  }

}

