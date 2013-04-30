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

import java.util.SortedMap;
import java.util.TreeMap;

/**
 * The details of what kind of measurement was taken and how; three examples of instruments are
 * "the memory-allocation instrument with default settings", "the microbenchmark instrument with
 * default settings," and "the microbenchmark instrument with warmup time 2 seconds and timing
 * interval 0.5 seconds".
 */
public class Instrument {
  public String localName;
  public String className;

  public TreeMap<String, String> properties = new TreeMap<String, String>();

  public static Instrument fromString(String json) {
    return ModelJson.fromJson(json, Instrument.class);
  }

  @Override public String toString() {
    return ModelJson.toJson(this);
  }
}
