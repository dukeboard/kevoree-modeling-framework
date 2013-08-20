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

// This might actually be easier as a proxy so we don't have to keep updating it.
public class SilentConsoleWriter implements ConsoleWriter {
  @Override public void flush() {}
  @Override public void print(String s) {}
  @Override public void describe(ScenarioSelection selection) {}
  @Override public void beforeDryRun(int count) {}
  @Override public void beforeRun(int trials, int scenarioCount, ShortDuration estimate) { }
  @Override public void afterRun(ShortDuration elapsed) { }
  @Override public void skippedScenarios(int nSkipped) { }
}
