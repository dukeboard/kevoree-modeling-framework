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
package com.google.caliper.model;

import java.util.TreeMap;

/**
 * A specific combination of benchmark variables (including environment, VM, class name,
 * method name, user parameters and VM arguments).
 */
public class Scenario {
  public String localName;

  public String environmentLocalName;
  public String vmLocalName;

  public String benchmarkClassName;
  public String benchmarkMethodName;

  // concrete types == gson happy
  public TreeMap<String, String> userParameters;
  public TreeMap<String, String> vmArguments;

  public static Scenario fromString(String json) {
    return ModelJson.fromJson(json, Scenario.class);
  }

  @Override public String toString() {
    return ModelJson.toJson(this);
  }
}
