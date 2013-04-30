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

import java.util.LinkedHashMap;
import java.util.SortedMap;
import java.util.TreeMap;

/**
 * The collected information that caliper detects about the hardware and operating system it is
 * running under.
 */
public class Environment {
  public String localName;

  public TreeMap<String, String> properties = new TreeMap<String, String>();

  public static Environment fromString(String json) {
    return ModelJson.fromJson(json, Environment.class);
  }

  @Override public String toString() {
    return ModelJson.toJson(this);
  }
}
