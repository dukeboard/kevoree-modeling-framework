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
package com.google.caliper.runner;

import java.io.PrintWriter;

/**
 * Signifies that the user's benchmark code threw an exception.
 */
@SuppressWarnings("serial")
public class UserCodeException extends InvalidBenchmarkException {
  public UserCodeException(String message, Throwable cause) {
    super(message);
    initCause(cause);
  }

  public UserCodeException(Throwable cause) {
    this("An exception was thrown from the benchmark code", cause);
  }

  @Override public void display(PrintWriter writer) {
    printStackTrace(writer);
  }
}
