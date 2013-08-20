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
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

/**
 * Represents a measurement of a single run of a benchmark.
 */
@SuppressWarnings("serial")
@GwtCompatible
public final class Measurement
  implements Serializable /* for GWT */ {

  public static final Comparator<Measurement> SORT_BY_NANOS = new Comparator<Measurement>() {
    @Override public int compare(Measurement a, Measurement b) {
      double aNanos = a.getRaw();
      double bNanos = b.getRaw();
      return Double.compare(aNanos, bNanos);
    }
  };

  public static final Comparator<Measurement> SORT_BY_UNITS = new Comparator<Measurement>() {
    @Override public int compare(Measurement a, Measurement b) {
      double aNanos = a.getProcessed();
      double bNanos = b.getProcessed();
      return Double.compare(aNanos, bNanos);
    }
  };

  private /*final*/ double raw;
  private /*final*/ double processed;
  private /*final*/ Map<String, Integer> unitNames;

  public Measurement(Map<String, Integer> unitNames, double raw, double processed) {
    this.unitNames = new HashMap<String, Integer>(unitNames);
    this.raw = raw;
    this.processed = processed;
  }

  public Map<String, Integer> getUnitNames() {
    return new HashMap<String, Integer>(unitNames);
  }

  public double getRaw() {
    return raw;
  }

  public double getProcessed() {
    return processed;
  }

  @Override public boolean equals(Object o) {
    return o instanceof Measurement
        && ((Measurement) o).raw == raw
        && ((Measurement) o).processed == processed
        && ((Measurement) o).unitNames.equals(unitNames);
  }

  @Override public int hashCode() {
    return (int) raw // Double.doubleToLongBits doesn't exist on GWT
        + (int) processed * 37
        + unitNames.hashCode() * 1373;
  }

  @Override public String toString() {
    return (raw != processed
        ? raw + "/" + processed
        : Double.toString(raw));
  }

  @SuppressWarnings("unused")
  private Measurement() {} /* for GWT */
}
