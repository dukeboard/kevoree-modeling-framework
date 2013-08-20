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
// Copyright 2011 Google Inc. All Rights Reserved.

package com.google.caliper.runner;

import com.google.caliper.model.Measurement;
import com.google.common.collect.ImmutableList;

import java.util.Collection;
import java.util.List;

/**
 * A simple data object that packages a {@link com.google.caliper.runner.Scenario} with the output of a single trial.
 */
class TrialResult {
  private final Scenario scenario;
  private final ImmutableList<Measurement> measurements;
  private final ImmutableList<String> messages;
  private final ImmutableList<String> vmCommandLine;

  TrialResult(Scenario scenario, Collection<Measurement> measurements, List<String> messages,
      List<String> vmCommandLine) {

    this.scenario = scenario;
    this.measurements = ImmutableList.copyOf(measurements);
    this.messages = ImmutableList.copyOf(messages);
    this.vmCommandLine = ImmutableList.copyOf(vmCommandLine);
  }

  public Scenario getScenario() {
    return scenario;
  }

  public ImmutableList<Measurement> getMeasurements() {
    return measurements;
  }

  public ImmutableList<String> getMessages() {
    return messages;
  }

  public ImmutableList<String> getVmCommandLine() {
    return vmCommandLine;
  }
}
