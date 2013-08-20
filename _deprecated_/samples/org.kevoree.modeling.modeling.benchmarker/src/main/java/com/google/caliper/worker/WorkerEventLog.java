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
package com.google.caliper.worker;

public final class WorkerEventLog {

  // temporary dumb messages.

  public void notifyWarmupPhaseStarting() {
    System.out.println("Warmup starting.");
  }

  public void notifyMeasurementPhaseStarting() {
    System.out.println("Measurement phase starting.");
  }

  public void notifyMeasurementStarting() {
    System.out.println("About to measure.");
  }

  public void notifyMeasurementEnding(double value) {
    System.out.println("I got a result: " + value);
  }

}
