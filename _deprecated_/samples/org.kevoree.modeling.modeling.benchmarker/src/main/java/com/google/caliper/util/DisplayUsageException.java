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
package com.google.caliper.util;

import java.io.PrintWriter;

/**
 * Exception used to abort command-line processing because the user has asked for help (using either
 * --help or -h).
 */
@SuppressWarnings("serial") // who would serialize a command-line parsing error?
public final class DisplayUsageException extends InvalidCommandException {
  public DisplayUsageException() {
    super("(User asked for --help. This message should not appear anywhere.)");
  }

  @Override public void display(PrintWriter writer) {
    displayUsage(writer);
  }

  @Override public int exitCode() {
    return 0;
  }
}
