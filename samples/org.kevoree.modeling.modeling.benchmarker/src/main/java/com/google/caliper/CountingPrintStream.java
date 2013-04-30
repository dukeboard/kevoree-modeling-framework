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

import java.io.PrintStream;

/**
 * Counts how many characters were written.
 */
final class CountingPrintStream extends PrintStream {

  private final PrintStream delegate;
  private int count;

  CountingPrintStream(PrintStream delegate) {
    super(delegate);
    this.delegate = delegate;
  }

  public int getCount() {
    return count;
  }

  @Override public void flush() {
    delegate.flush();
  }

  @Override public void close() {
    delegate.close();
  }

  @Override public boolean checkError() {
    return delegate.checkError();
  }

  @Override protected void setError() {
    throw new UnsupportedOperationException();
  }

  @Override protected void clearError() {
    throw new UnsupportedOperationException();
  }

  @Override public void write(int b) {
    count++;
    delegate.write(b);
  }

  @Override public void write(byte[] buffer, int offset, int length) {
    count += length;
    delegate.write(buffer, offset, length);
  }

  @Override public void print(char[] chars) {
    count += chars.length;
    delegate.print(chars);
  }

  @Override public void print(String s) {
    count += s.length();
    delegate.print(s);
  }
}
