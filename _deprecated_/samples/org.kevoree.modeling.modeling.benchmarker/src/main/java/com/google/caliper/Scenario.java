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

import com.google.common.annotations.GwtCompatible;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

/**
 * A configured benchmark.
 *
 * WARNING: a JSON representation of this class is stored on the app engine server. If any changes
 * are made to this class, a deserialization adapter must be written for this class to ensure
 * backwards compatibility.
 *
 * <p>Gwt-safe.
 */
@SuppressWarnings("serial")
@GwtCompatible
public final class Scenario
    implements Serializable /* for GWT */  {

  static final String VM_KEY = "vm";
  static final String TRIAL_KEY = "trial";

  private /*final*/ Map<String, String> variables;

  public Scenario(Map<String, String> variables) {
    this.variables = new LinkedHashMap<String, String>(variables);
  }

  public Map<String, String> getVariables() {
    return variables;
  }

  /**
   * Returns the named set of variables.
   */
  public Map<String, String> getVariables(Set<String> names) {
    Map<String, String> result = new LinkedHashMap<String, String>(variables);
    result.keySet().retainAll(names);
    if (!result.keySet().equals(names)) {
      throw new IllegalArgumentException("Not all of " + names + " are in " + result.keySet());
    }
    return result;
  }

  @Override public boolean equals(Object o) {
    return o instanceof Scenario
        && ((Scenario) o).getVariables().equals(variables);
  }

  @Override public int hashCode() {
    return variables.hashCode();
  }

  @Override public String toString() {
    return "Scenario" + variables;
  }

  @SuppressWarnings("unused")
  private Scenario() {} // for GWT
}
