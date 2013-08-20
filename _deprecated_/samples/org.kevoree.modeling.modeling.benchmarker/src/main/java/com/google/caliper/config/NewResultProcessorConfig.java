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
// Copyright 2012 Google Inc. All Rights Reserved.

package com.google.caliper.config;

import static com.google.common.base.Preconditions.checkNotNull;

import com.google.common.base.Objects;
import com.google.common.collect.ImmutableMap;

import java.util.Map;

/**
 * This is the configuration passed to the {@link com.google.caliper.runner.ResultProcessor} by the
 * user.
 *
 * @author gak@google.com (Gregory Kick)
 */
public class NewResultProcessorConfig {
  private final String className;
  private final ImmutableMap<String, String> options;

  private NewResultProcessorConfig(Builder builder) {
    this.className = builder.className;
    this.options = builder.optionsBuilder.build();
  }

  public String className() {
    return className;
  }

  public ImmutableMap<String, String> options() {
    return options;
  }


  @Override public boolean equals(Object obj) {
    if (obj == this) {
      return true;
    } else if (obj instanceof NewResultProcessorConfig) {
      NewResultProcessorConfig that = (NewResultProcessorConfig) obj;
      return this.className.equals(that.className)
          && this.options.equals(that.options);
    } else {
      return false;
    }
  }

  @Override public int hashCode() {
    return Objects.hashCode(className, options);
  }

  @Override public String toString() {
    return Objects.toStringHelper(this)
        .add("className", className)
        .add("options", options)
        .toString();
  }

  static final class Builder {
    private String className;
    private ImmutableMap.Builder<String, String> optionsBuilder = ImmutableMap.builder();

    public Builder className(String className) {
      this.className = checkNotNull(className);
      return this;
    }

    public Builder addOption(String option, String value) {
      this.optionsBuilder.put(option, value);
      return this;
    }

    public Builder addAllOptions(Map<String, String> options) {
      this.optionsBuilder.putAll(options);
      return this;
    }

    public NewResultProcessorConfig build() {
      return new NewResultProcessorConfig(this);
    }
  }
}
