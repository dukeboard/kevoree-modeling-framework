/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * Fouquet Francois
 * Nain Gregory
 */
package com.google.caliper;

import com.google.common.collect.ImmutableList;

import java.io.File;
import java.util.List;

class Vm {
  public List<String> getVmSpecificOptions(MeasurementType type, Arguments arguments) {
    return ImmutableList.of();
  }

  /**
   * Returns a process builder to run this VM.
   *
   * @param vmArgs the path to the VM followed by VM arguments.
   * @param applicationArgs arguments to the target process
   */
  public ProcessBuilder newProcessBuilder(File workingDirectory, String classPath,
      ImmutableList<String> vmArgs, String className, ImmutableList<String> applicationArgs) {
    ProcessBuilder result = new ProcessBuilder();
    result.directory(workingDirectory);
    List<String> command = result.command();

    //  System.out.println("VM::ClassPath::" + classPath);

    command.addAll(vmArgs);
    addClassPath(command, classPath);
    command.add(className);
    command.addAll(applicationArgs);
    //System.out.println("Internal JVM call command: " + command.toString());
    return result;
  }

  private void addClassPath(List<String> command, String classPath) {
    command.add("-cp");


    command.add(classPath);
  }

}
