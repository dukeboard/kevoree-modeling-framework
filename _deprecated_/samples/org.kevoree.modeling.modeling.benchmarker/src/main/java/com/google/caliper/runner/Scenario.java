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
package com.google.caliper.runner;

import com.google.common.base.Objects;
import com.google.common.collect.ImmutableSortedMap;

import java.util.Map;

/**
 * A single "premise" for making benchmark measurements: which class and method to invoke, which VM
 * to use, which choices for user parameters and vmArguments to fill in. A caliper run will compute
 * all possible scenarios using {@link com.google.caliper.runner.FullCartesianScenarioSelection}, and will run one or more
 * trials of each.
 */
public final class Scenario {
  private final BenchmarkMethod benchmarkMethod;
  private final VirtualMachine vm;
  private final ImmutableSortedMap<String, String> userParameters;

  public Scenario(
      BenchmarkMethod benchmarkMethod,
      Map<String, String> userParameters,
      VirtualMachine vm) {
    this.benchmarkMethod = benchmarkMethod;
    this.userParameters = ImmutableSortedMap.copyOf(userParameters);
    this.vm = vm;
  }

  public BenchmarkMethod benchmarkMethod() {
    return benchmarkMethod;
  }

  public ImmutableSortedMap<String, String> userParameters() {
    return userParameters;
  }

  public VirtualMachine vm() {
    return vm;
  }

  @Override public boolean equals(Object object) {
    if (object instanceof Scenario) {
      Scenario that = (Scenario) object;
      return this.benchmarkMethod.equals(that.benchmarkMethod)
          && this.vm.equals(that.vm)
          && this.userParameters.equals(that.userParameters);
    }
    return false;
  }

  @Override public int hashCode() {
    return Objects.hashCode(benchmarkMethod, vm, userParameters);
  }

  @Override public String toString() {
    return Objects.toStringHelper(this)
        .add("benchmarkMethod", benchmarkMethod)
        .add("vm", vm)
        .add("userParameters", userParameters)
        .toString();
  }
}
