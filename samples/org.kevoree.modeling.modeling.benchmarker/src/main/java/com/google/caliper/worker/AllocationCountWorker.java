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

package com.google.caliper.worker;

import com.google.caliper.model.Measurement;

/**
 * {@link AllocationWorker} subclass that builds its {@link com.google.caliper.model.Measurement} based on the
 * number of allocations observed.
 */
public class AllocationCountWorker extends AllocationWorker {
  @Override Measurement extractMeasurement(AllocationStats stats, int reps) {
    Measurement measurement = new Measurement();
    measurement.value = stats.allocationCount;
    measurement.weight = reps;
    measurement.unit = "instances";
    measurement.description = "objects allocated";
    return measurement;
  }
}
