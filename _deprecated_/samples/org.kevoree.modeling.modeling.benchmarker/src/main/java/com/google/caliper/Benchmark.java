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

import java.util.Map;
import java.util.Set;

/**
 * A collection of benchmarks that share a set of configuration parameters.
 */
public interface Benchmark {

  Set<String> parameterNames();

  Set<String> parameterValues(String parameterName);

  ConfiguredBenchmark createBenchmark(Map<String, String> parameterValues);

  /**
   * A mapping of units to their values. Their values must be integers, but all values are relative,
   * so if one unit is 1.5 times the size of another, then these units can be expressed as
   * {"unit1"=10,"unit2"=15}. The smallest unit given by the function will be used to display
   * immediate results when running at the command line.
   *
   * e.g. 0% Scenario{...} 16.08<SMALLEST-UNIT>; σ=1.72<SMALLEST-UNIT> @ 3 trials
   */
  Map<String, Integer> getTimeUnitNames();

  Map<String, Integer> getInstanceUnitNames();

  Map<String, Integer> getMemoryUnitNames();

  /**
   * Converts nanoseconds to the smallest unit defined in {@link #getTimeUnitNames()}.
   */
  double nanosToUnits(double nanos);

  double instancesToUnits(long instances);

  double bytesToUnits(long bytes);
}