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

/**
 * Thrown when an invalid configuration has been specified by the user.
 *
 * @author gak@google.com (Gregory Kick)
 */
public final class InvalidConfigurationException extends Exception {
  InvalidConfigurationException() {
    super();
  }

  InvalidConfigurationException(String message, Throwable cause) {
    super(message, cause);
  }

  InvalidConfigurationException(String message) {
    super(message);
  }

  InvalidConfigurationException(Throwable cause) {
    super(cause);
  }
}
