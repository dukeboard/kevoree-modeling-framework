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

/**
 * Represents an invocation of a benchmark, including the run itself, as well as the environment
 * in which the run occurred.
 */
public final class Result {
  private /*final*/ Run run;
  private /*final*/ Environment environment;

  public Result(Run run, Environment environment) {
    this.run = run;
    this.environment = environment;
  }

  public Run getRun() {
    return run;
  }

  public Environment getEnvironment() {
    return environment;
  }

  @Override public boolean equals(Object o) {
    return o instanceof Result
        && ((Result) o).run.equals(run)
        && ((Result) o).environment.equals(environment);
  }

  @Override public int hashCode() {
    return run.hashCode() * 37 + environment.hashCode();
  }

  @Override public String toString() {
    return run + "@" + environment;
  }

  @SuppressWarnings("unused")
  private Result() {} // for gson
}
