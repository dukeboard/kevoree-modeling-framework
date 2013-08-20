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
import java.util.HashMap;
import java.util.Map;

/**
 * A description of an environment in which benchmarks are run.
 *
 * WARNING: a JSON representation of this class is stored on the app engine server. If any changes
 * are made to this class, a deserialization adapter must be written for this class to ensure
 * backwards compatibility.
 *
 * <p>Gwt-safe
 */
@SuppressWarnings("serial")
@GwtCompatible
public final class Environment
    implements Serializable /* for GWT Serialization */ {
  private /*final*/ Map<String, String> propertyMap;

  public Environment(Map<String, String> propertyMap) {
    this.propertyMap = new HashMap<String, String>(propertyMap);
  }

  public Map<String, String> getProperties() {
    return propertyMap;
  }

  @Override public boolean equals(Object o) {
    return o instanceof Environment
        && ((Environment) o).propertyMap.equals(propertyMap);
  }

  @Override public int hashCode() {
    return propertyMap.hashCode();
  }

  @Override public String toString() {
    return propertyMap.toString();
  }

  @SuppressWarnings("unused")
  private Environment() {} // for GWT Serialization
}
