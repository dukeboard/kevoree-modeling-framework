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
import static com.google.common.base.Preconditions.checkState;

import com.google.common.base.Objects;

import org.joda.time.Instant;

import java.util.UUID;

import javax.annotation.concurrent.Immutable;

/**
 * A single invocation of caliper.
 *
 * @author gak@google.com (Gregory Kick)
 */
@Immutable
public final class NewRun {
  private final UUID id;
  private final String label;
  private final Instant startTime;

  private NewRun(Builder builder) {
    this.id = builder.id;
    this.label = builder.label;
    this.startTime = builder.startTime;
  }

  public UUID id() {
    return id;
  }

  public String label() {
    return label;
  }

  public Instant startTime() {
    return startTime;
  }

  @Override public boolean equals(Object obj) {
    if (obj == this) {
      return true;
    } else if (obj instanceof NewRun) {
      NewRun that = (NewRun) obj;
      return this.id.equals(that.id)
          && this.label.equals(that.label)
          && this.startTime.equals(that.startTime);
    } else {
      return false;
    }
  }

  @Override public int hashCode() {
    return Objects.hashCode(id, label, startTime);
  }

  @Override public String toString() {
    return Objects.toStringHelper(this)
        .add("id", id)
        .add("label", label)
        .add("startTime", startTime)
        .toString();
  }

  public static final class Builder {
    private UUID id;
    private String label = "";
    private Instant startTime;

    public Builder(UUID id) {
      this.id = checkNotNull(id);
    }

    public Builder label(String label) {
      this.label = checkNotNull(label);
      return this;
    }

    public Builder startTime(Instant startTime) {
      this.startTime = checkNotNull(startTime);
      return this;
    }

    public NewRun build() {
      checkState(id != null);
      checkState(startTime != null);
      return new NewRun(this);
    }
  }
}
