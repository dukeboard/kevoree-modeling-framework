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

import com.google.caliper.util.ShortDuration;

import java.io.PrintWriter;

public class DefaultConsoleWriter implements ConsoleWriter {
  private final PrintWriter writer;

  public DefaultConsoleWriter(PrintWriter writer) {
    this.writer = writer;
  }

  @Override public void flush() {
    writer.flush();
  }

  @Override public void print(String s) {
    writer.print(s);
  }

  @Override public void describe(ScenarioSelection selection) {
    writer.println("Scenario selection: ");
    writer.println("  Benchmark methods: " + selection.benchmarkMethods());
    writer.println("  User parameters:   " + selection.userParameters());
    writer.println("  Virtual machines:  " + selection.vms());
    writer.println("  Selection type:    " + selection.selectionType());
    writer.println();
  }

  @Override public void beforeDryRun(int scenarioCount) {
    writer.format("This selection yields %s scenarios.%n", scenarioCount);
  }

  @Override public void beforeRun(int trials, int scenarioCount, ShortDuration estimate) {
    writer.format("Measuring %s trials each of %s scenarios. ", trials, scenarioCount);
    if (estimate.equals(ShortDuration.zero())) {
      writer.println("(Cannot estimate runtime.)");
    } else {
      writer.format("Estimated runtime: %s.%n", estimate);
    }
  }

  @Override public void afterRun(ShortDuration elapsed) {
    writer.format("Execution complete: %s.%n", elapsed);
  }

  @Override public void skippedScenarios(int nSkipped) {
    writer.format("%d scenarios were skipped.%n", nSkipped);
  }
}
