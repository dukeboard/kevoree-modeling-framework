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

/**
 * A single numeric datum reported by an instrument for a particular scenario.
 */
public class Measurement {
  // For example, if 42 reps completed in 999000000 ns, then these values might be
  // (999000000.0, 42, "ns", "runtime")
  public double value;
  public double weight;
  public String unit;
  public String description;

  public static Measurement fromString(String json) {
    return ModelJson.fromJson(json, Measurement.class);
  }

  @Override public String toString() {
    return ModelJson.toJson(this);
  }
}
