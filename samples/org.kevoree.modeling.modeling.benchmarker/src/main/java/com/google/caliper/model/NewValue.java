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

import static com.google.common.base.Preconditions.checkNotNull;

import com.google.common.base.Objects;

import javax.annotation.concurrent.Immutable;

/**
 * A magnitude with units.
 *
 * @author gak@google.com (Gregory Kick)
 */
@Immutable
public class NewValue {
  public static NewValue create(double value, String unit) {
    return new NewValue(value, checkNotNull(unit));
  }

  private final double magnitude;
  // TODO(gak): do something smarter than string for units
  private final String unit;

  private NewValue(double value, String unit) {
    this.magnitude = value;
    this.unit = unit;
  }

  public String unit() {
    return unit;
  }

  public double magnitude() {
    return magnitude;
  }

  @Override public boolean equals(Object obj) {
    if (obj == this) {
      return true;
    } else if (obj instanceof NewValue) {
      NewValue that = (NewValue) obj;
      return this.magnitude == that.magnitude
          && this.unit.equals(that.unit);
    } else {
      return false;
    }
  }

  @Override public int hashCode() {
    return Objects.hashCode(magnitude, unit);
  }

  @Override public String toString() {
    return new StringBuilder().append(magnitude).append(unit).toString();
  }
}
