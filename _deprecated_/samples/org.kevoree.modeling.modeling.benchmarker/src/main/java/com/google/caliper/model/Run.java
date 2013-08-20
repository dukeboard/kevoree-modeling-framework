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
package com.google.caliper.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Note: classes in this package are deliberately quick-and-dirty and minimal, and may be upgraded
 * to be a little more robust in the future.
 */
public class Run {
  public String label = "default";
  public long timestamp;
  public List<Environment> environments = new ArrayList<Environment>();
  public List<VM> vms = new ArrayList<VM>();
  public List<Instrument> instruments = new ArrayList<Instrument>();
  public List<Scenario> scenarios = new ArrayList<Scenario>();
  public List<Result> results = new ArrayList<Result>();

  public static Run fromString(String json) {
    return ModelJson.fromJson(json, Run.class);
  }

  @Override public String toString() {
    return ModelJson.toJson(this);
  }
}
